import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { NavigationContextProvider } from "@/context/NavigationContext";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <main className="flex h-screen w-screen">
      <NavigationContextProvider>
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <Header />
          <section className="container mx-auto flex h-full w-full">
            {children}
          </section>
        </div>
      </NavigationContextProvider>
    </main>
  </>
);

export default Layout;
