"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/context/NotificationContext";
import NotificationItem from "./NotificationItem";

export default function NotificationViewport() {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 left-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((n, index) => (
          <motion.div
            key={n.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            style={{
              zIndex: 9999 - index,
            }}
          >
            <NotificationItem notification={n} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}