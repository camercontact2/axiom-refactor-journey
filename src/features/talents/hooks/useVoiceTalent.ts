import { useEffect, useRef, useState } from 'react';
import { MAX_RECORDING_SECONDS } from '../model';

export function useVoiceTalent(onRecorded: (file: File) => void) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const [requesting, setRequesting] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mounted = useRef(true);
  const callback = useRef(onRecorded);
  callback.current = onRecorded;
  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
  };
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; if (recorder.current?.state === 'recording') recorder.current.stop(); clear(); };
  }, []);
  const stop = () => { if (recorder.current?.state === 'recording') recorder.current.stop(); };
  const start = async () => {
    setError(''); setRequesting(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('L’enregistrement n’est pas disponible ici. Vous pouvez ajouter un fichier audio.');
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      const mimeType = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
      const next = new MediaRecorder(media, mimeType ? { mimeType } : undefined);
      recorder.current = next;
      const chunks: Blob[] = [];
      next.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      next.onerror = () => { clear(); if (mounted.current) { setRecording(false); setError('Enregistrement interrompu. Réessayez.'); } };
      next.onstop = () => {
        clear();
        if (!mounted.current) return;
        setRecording(false);
        const type = next.mimeType || 'audio/webm';
        const blob = new Blob(chunks, { type });
        if (blob.size) callback.current(new File([blob], `mon-talent.${type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm'}`, { type }));
      };
      next.start(); setRecording(true); setSeconds(0);
      let elapsed = 0;
      timer.current = setInterval(() => { elapsed += 1; setSeconds(elapsed); if (elapsed >= MAX_RECORDING_SECONDS) stop(); }, 1000);
    } catch (e) {
      clear(); setError(e instanceof DOMException && e.name === 'NotAllowedError' ? 'Microphone refusé. Autorisez-le ou ajoutez un fichier audio.' : e instanceof Error ? e.message : 'Impossible d’ouvrir le microphone.');
    } finally { if (mounted.current) setRequesting(false); }
  };
  return { recording, requesting, seconds, error, start, stop };
}