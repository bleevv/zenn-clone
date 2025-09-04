"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const SignInView = () => {
  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="grid h-svh w-full place-content-center">
      <Button onClick={handleSignIn}>ログイン</Button>
    </div>
  );
};
