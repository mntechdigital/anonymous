"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const UserLoginPage = () => {
  const handleGoogleLogin = () => {
    signIn("facebook", { callbackUrl: "/test" });
  };
  return (
    <div>
      <Button variant="outline" onClick={handleGoogleLogin}>
        Login with Facebook
      </Button>
    </div>
  );
};

export default UserLoginPage;
