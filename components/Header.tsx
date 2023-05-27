import React from "react";
import { useNavigationContext } from "@/context/NavigationContext";

const Header = () => {
  const { open, setOpen } = useNavigationContext();
  return <header className="debug flex justify-center">HEADER</header>;
};

export default Header;
