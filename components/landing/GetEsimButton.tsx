"use client";

import { useRouter } from "next/navigation";
import { useInstallPrompt } from "@/lib/hooks/use-install-prompt";
import { Button } from "@/components/ui/button";

interface GetEsimButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export default function GetEsimButton({ size = "sm", className, children }: GetEsimButtonProps) {
  const router = useRouter();
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt();

  async function handleClick() {
    if (isInstalled) {
      // Already installed — navigate to app route
      router.push("/app");
      return;
    }

    if (canInstall) {
      // Trigger the browser install prompt
      const accepted = await promptInstall();
      if (accepted) {
        // After install, navigate to app
        router.push("/app");
      } else {
        // User dismissed install — still navigate to web app
        router.push("/app");
      }
    } else {
      // Install not available (desktop or already installed) — just navigate
      router.push("/app");
    }
  }

  return (
    <Button variant="primary" size={size} className={className} onClick={handleClick}>
      {children || "Get eSIM"}
    </Button>
  );
}
