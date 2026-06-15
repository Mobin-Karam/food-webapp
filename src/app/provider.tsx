"use client";

import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import { ModalProvider } from "@/components/Modal/ModalContext";
import ModalRoot from "@/components/Modal/ModalRoot";
import NotificationViewport from "@/components/Notification/NotificationViewport";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { VendorProvider } from "@/context/VendorContext";
import { CartProvider } from "@/features/cart/CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <VendorProvider>
        <CartProvider>
          <NotificationProvider>
            <ModalProvider>
              <Header />

              {children}
              <LoginModal />
              <ModalRoot />
              <NotificationViewport />
            </ModalProvider>
          </NotificationProvider>
        </CartProvider>
      </VendorProvider>
    </AuthProvider>
  );
}
