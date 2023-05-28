import React from "react";
import { useNavigationContext } from "@/context/NavigationContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/CircularImage.module.css";

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { open, setOpen } = useNavigationContext();

  return (
    <aside
      className={`sidebar-desktop sidebar-mobile 
    ${open ? "flex" : "hidden"} flex-col bg-indigo-800 md:flex gap-10`}
    >
      <div className="flex flex-col items-center justify-between gap-9">
        <CircularImage />
        <div>pepito perez</div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <nav>
          <ul className="flex flex-col gap-3">
            <SidebarLink href="/inventory-management" title={"Inventario"} />
            <SidebarLink href="/materials-management" title={"Materiales"} />
            <SidebarLink href="/users-management" title={"Usuarios"} />
          </ul>
        </nav>
        <button
          type="button"
          className="border-1"
          onClick={() => {}} //TODO Agregar servicio para cerrar sesión
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

const CircularImage = ({ src }: any) => (
  <div className={`bg-white ${styles.circularImage}`}>
    <Image
      src={src || "/avatar-simple.png"}
      alt={"Circular"}
      width={200}
      height={200}
    />
  </div>
);

interface SidebarLinkProps {
  href: string;
  title: string;
}

const SidebarLink = ({ href, title }: SidebarLinkProps) => {
  const router = useRouter();
  console.log(`path: , ${router.pathname} href: ${href}`);

  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <li className={isActive ? "active" : ""}>{title}</li>
    </Link>
  );
};

export default Sidebar;
