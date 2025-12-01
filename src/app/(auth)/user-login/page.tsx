"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const UserLoginPage = () => {
  const handleGoogleLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Button variant="outline" onClick={handleGoogleLogin} className="bg-blue-600 text-white">
        Login with Facebook
      </Button>
    </div>
  );
};

export default UserLoginPage;
