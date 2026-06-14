import { useModal } from "@/components/Modal/ModalContext";
import { BranchSelector } from "./BranchSelector";
import { ChevronDown } from "lucide-react";
import { useVendor } from "@/context/VendorContext";


export function BranchButton() {
  const { open } = useModal();
  const { vendor } = useVendor();

  return (
    <button
      onClick={() =>
        open({
          type: "drawer",
          content: <BranchSelector />,
        })
      }
      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg border border-white/30"
    >
      <span>{vendor?.name ?? "تغییر شعبه"}</span>
      <ChevronDown size={14} />
    </button>
  );
}