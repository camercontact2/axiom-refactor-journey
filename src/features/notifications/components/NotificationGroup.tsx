import { Notification } from "@/lib/notifications";
import { NotificationItem } from "./NotificationItem";

export function NotificationGroup({
  title,
  notifications,
  onDismiss,
}: {
  title: string;
  notifications: Notification[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium px-1">
        {title}
      </p>
      <div className="space-y-2">
        {notifications.map((notif, idx) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
            onDismiss={onDismiss}
            delay={idx * 30}
          />
        ))}
      </div>
    </div>
  );
}
