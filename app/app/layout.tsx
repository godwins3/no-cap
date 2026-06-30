import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "nocap App",
  description: "Your digital telecom dashboard",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "nocap",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#09090B",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full bg-[#09090B] text-white overflow-hidden">
      {children}
    </div>
  );
}
