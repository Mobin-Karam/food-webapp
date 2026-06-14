"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

import type { Notification } from "@/types/notification";
import { appEventBus } from "@/app/lib/appEventBus";

type Ctx = {
  notifications: Notification[];
  show: (message: string, type?: Notification["type"]) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const NotificationContext = createContext<Ctx | null>(null);

const MAX_VISIBLE = 4;

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const queueRef = useRef<Notification[]>([]);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const processQueue = useCallback(() => {
    setNotifications((prev) => {
      if (prev.length >= MAX_VISIBLE) return prev;

      const next = queueRef.current.shift();
      if (!next) return prev;

      return [...prev, next];
    });
  }, []);

  const show = useCallback(
    (message: string, type: Notification["type"] = "info") => {
      const notif: Notification = {
        id: crypto.randomUUID(),
        message,
        type,
        duration: 3000,
      };

      queueRef.current.push(notif);
      setTimeout(processQueue, 0);
    },
    [processQueue],
  );

  const clear = useCallback(() => {
    setNotifications([]);
    queueRef.current = [];
  }, []);

  // 🔥 CONNECT EVENT BUS
  useEffect(() => {
    const unsub = appEventBus.subscribe((message: string, type: string) => {
      show(message, type as Notification["type"]);
    });

    return unsub;
  }, [show]);

  return (
    <NotificationContext.Provider
      value={{ notifications, show, remove, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside provider");
  return ctx;
}
