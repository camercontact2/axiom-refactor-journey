"""Verification rapide : vitesse de navigation + mise en page responsive.

Lancer (serveur de dev demarre sur http://localhost:8080) :
    python3 scripts/qa/check_nav_responsive.py

Le script :
  1. ouvre chaque page dans 3 tailles d'ecran (mobile / tablette / desktop) ;
  2. verifie qu'il n'y a pas de scroll horizontal (debordement = mise en page cassee) ;
  3. mesure le temps de navigation interne entre les pages (doit rester rapide) ;
  4. remonte les erreurs JavaScript de la console.
"""

import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

BASE = "http://localhost:8080"
ROUTES = [
    "/", "/flash", "/radar", "/scan", "/trust",
    "/talents", "/creation", "/messages", "/notifications", "/profile",
]
VIEWPORTS = {"mobile": (375, 812), "tablette": (768, 1024), "desktop": (1280, 900)}
MAX_NAV_MS = 1200  # navigation interne consideree comme lente au-dela

SCREENSHOTS = Path("/tmp/browser/qa")


async def dismiss_onboarding(page) -> None:
    """L'onboarding s'affiche au premier lancement et bloque les clics : on le marque comme vu."""
    await page.goto(BASE + "/", wait_until="domcontentloaded")
    await page.evaluate("() => localStorage.setItem('vitala.onboarding.done.v1', '1')")


async def main() -> int:
    SCREENSHOTS.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)

        # 1 & 2 — responsive
        for name, (w, h) in VIEWPORTS.items():
            context = await browser.new_context(viewport={"width": w, "height": h})
            page = await context.new_page()
            await dismiss_onboarding(page)
            errors: list[str] = []
            page.on("pageerror", lambda e: errors.append(str(e)))

            for route in ROUTES:
                await page.goto(BASE + route, wait_until="networkidle")
                overflow = await page.evaluate(
                    "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
                )
                if overflow > 2:
                    failures.append(f"[{name}] {route} deborde de {overflow}px horizontalement")
                if errors:
                    failures.append(f"[{name}] {route} erreurs JS: {errors[:2]}")
                    errors.clear()
            await page.screenshot(path=str(SCREENSHOTS / f"{name}.png"))
            await context.close()

        # 3 — vitesse de navigation interne (clic sur les liens du dock)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        await dismiss_onboarding(page)
        await page.goto(BASE + "/", wait_until="networkidle")
        for route in ROUTES[1:]:
            link = page.locator(f'a[href="{route}"]').first
            if await link.count() == 0:
                continue
            await link.hover()
            start = asyncio.get_event_loop().time()
            await link.click()
            await page.wait_for_url(f"**{route}")
            elapsed = (asyncio.get_event_loop().time() - start) * 1000
            status = "OK" if elapsed <= MAX_NAV_MS else "LENT"
            print(f"nav -> {route}: {elapsed:.0f} ms [{status}]")
            if elapsed > MAX_NAV_MS:
                failures.append(f"navigation lente vers {route} ({elapsed:.0f} ms)")
            await page.goto(BASE + "/", wait_until="networkidle")

        await browser.close()

    if failures:
        print("\nECHECS :")
        for f in failures:
            print(" -", f)
        return 1
    print("\nTout est bon : aucune page ne deborde, navigation rapide, zero erreur JS.")
    return 0


sys.exit(asyncio.run(main()))
