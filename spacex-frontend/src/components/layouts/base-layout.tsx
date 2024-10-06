"use client";
import Logo from "@/assets/images/logo.png";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Topbar from "../ui/topbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen relative bg-base-bg">
      <Image
        src={Logo}
        alt="Logo"
        className={`absolute top-0 m-4 w-[214px] h-[26px] ${
          isMobile ? "left-0 mt-16" : "right-0 mt-0"
        }`} // Mobilde logo solda, masaüstünde sağda olacak
      />
      {isMobile ? <Topbar /> : <Sidebar />}
      <main
        className={`p-10 pt-20 w-full overflow-hidden transition-all duration-300 ${
          isMobile ? "ml-0 mt-16 " : "ml-24 mt-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
