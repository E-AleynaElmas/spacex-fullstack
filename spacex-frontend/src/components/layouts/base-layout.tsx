import Logo from "@/assets/images/logo.png";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen relative bg-base-bg">
      <Image
        src={Logo}
        alt="Logo"
        className="absolute top-0 right-0 m-4 w-[214px] h-[26px]"
      />
      <Sidebar />
      <main className="ml-24 p-10 pt-20  w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
