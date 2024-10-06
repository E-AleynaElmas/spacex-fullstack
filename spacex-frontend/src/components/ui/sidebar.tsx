"use client";

import { useAuthStore } from "@/store/auth-store";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarIcon } from "../../assets/icons/calendar-icon";
import { HomeIcon } from "../../assets/icons/home-icon";
import { LiveIcon } from "../../assets/icons/live-icon";
import { SettingsIcon } from "../../assets/icons/settings-icon";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const sidebarItems = [
  { icon: HomeIcon, text: "Home", href: "/" },
  { icon: SettingsIcon, text: "Settings", href: "/settings" },
  { icon: CalendarIcon, text: "Calendar", href: "/calendar" },
  { icon: LiveIcon, text: "Live", href: "/live" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout); // Logout fonksiyonu

  console.log(user);

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#264061]/50 to-[#264061]/50 backdrop-blur-sm shadow-lg z-50`}
      animate={{
        width: isExpanded ? 200 : 96,
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ overflow: "hidden" }}
    >
      <div className="flex justify-center flex-col space-y-4 items-center mt-20">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-white font-medium">{user?.firstName}</p>
      </div>
      <nav
        className={`flex flex-col justify-center ${
          isExpanded ? "items-start" : "items-center"
        } h-full`}
      >
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              className={`${isExpanded ? "w-full" : ""}`}
              key={item.href}
              href={item.href}
            >
              <motion.div
                className={`flex items-center px-4 py-3 ${
                  isActive
                    ? "bg-primary/30 text-white"
                    : "text-gray-400 hover:bg-primary/10"
                }`}
                whileHover={{ scale: 1.05 }}
                style={{ width: isExpanded ? "100%" : "auto" }}
              >
                <item.icon
                  className={`w-6 h-6 mx-auto lg:mx-0 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                {isExpanded && (
                  <motion.span
                    className={`ml-4 font-medium ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.text}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-all"
          onClick={async () => {
            await logout();
            router.push("/auth/login");
          }}
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}
