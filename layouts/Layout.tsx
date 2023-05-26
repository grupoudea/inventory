import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { NavigationContextProvider } from "@/context/NavigationContext";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <main className="debug flex h-screen w-screen">
      <NavigationContextProvider>
        <Sidebar />
        <div className="flex flex-col h-full w-full">
          <Header />
          <section className="debug flex h-full w-full">{children}</section>
        </div>
      </NavigationContextProvider>
    </main>
  </>
);

export default Layout;
