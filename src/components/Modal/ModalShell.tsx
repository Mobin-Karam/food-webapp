import { motion } from "framer-motion";
import { ModalConfig } from "./modal";

export function ModalShell({
  modal,
  onClose,
}: {
  modal: ModalConfig;
  onClose: () => void;
}) {
  const isDrawer = modal.type === "drawer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{
          opacity: 0,
          y: isDrawer ? 80 : 0,
          scale: isDrawer ? 1 : 0.95,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className={`
          relative z-10 bg-white w-full

          /* shared constraints (IMPORTANT) */
          max-w-lg w-[92vw]

          /* desktop behavior */
          md:rounded-2xl md:max-h-[85vh]

          /* drawer behavior on mobile */
          ${isDrawer ? "fixed bottom-0 left-0 right-0" : ""}
          ${isDrawer ? "rounded-t-2xl" : ""}

          /* mobile drawer full height */
          ${isDrawer ? "h-[90vh] md:h-auto" : ""}

          overflow-hidden flex flex-col
        `}
      >
        {modal.content}
      </motion.div>
    </div>
  );
}
