import React from "react";
import { useUserData } from "@/hooks/useUserData";

interface PrivateComponentProps {
  role: string;
  children: React.ReactNode;
}

const PrivateComponent = ({ role, children }: PrivateComponentProps) => {
  const { role: userRole } = useUserData();

  if (!userRole) return <></>;

  if (userRole !== role) return <></>;

  return <>{children}</>;
};

export default PrivateComponent;
