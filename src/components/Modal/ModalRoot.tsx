"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { ModalShell } from "./ModalShell";

export default function ModalRoot() {
  const { modals, close } = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = modals.length > 0 ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modals.length, mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <ModalShell
          key={modal.id}
          modal={modal}
          onClose={() => close(modal.id)}
        />
      ))}
    </>,
    document.body
  );
}