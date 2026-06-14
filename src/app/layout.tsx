import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vendors } from "@/data/vendors";
import { NotificationProvider } from "@/context/NotificationContext";
import NotificationContainer from "@/components/NotificationContainer";
import NotificationViewport from "@/components/Notification/NotificationViewport";
export const metadata: Metadata = {
  title: "TFC - سفارش آنلاین غذا",
  description: "سفارش آنلاین مرغ سوخاری TFC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <Header />

              {children}
              <LoginModal />
              <NotificationViewport />
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
