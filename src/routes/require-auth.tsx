import { useAuth } from "@/context/auth-context";
import { getWithExpiry } from "@/utils/local-storage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = token || getWithExpiry("leah-token");
    if (!storedToken) {
      navigate(`/onboarding`, { replace: true });
    }
  }, [token, navigate]);
  return children;
};

export default RequireAuth;
