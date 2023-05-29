import React from "react";
import Image from "next/image";
import { useNavigationContext } from "@/context/NavigationContext";

const Header = () => {
  const { tituloHeader } = useNavigationContext();

  return (
    <header className="flex justify-left items-center justify-between px-5 py-2 border-b-2">
      <div className="text-30 font-bold ml-2 tracking-tight">
        {tituloHeader}
      </div>
      <div className="">
        <Image src={"/avatar-simple.png"} alt={""} width={40} height={40} />
      </div>
    </header>
  );
};

export default Header;
