"use client";

import { CalendarIcon } from "../../assets/icons/calendar-icon";
import { HomeIcon } from "../../assets/icons/home-icon";
import { LiveIcon } from "../../assets/icons/live-icon";
import { SettingsIcon } from "../../assets/icons/settings-icon";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  { icon: HomeIcon, text: "Home", href: "/" },
  { icon: SettingsIcon, text: "Settings", href: "/settings" },
  { icon: CalendarIcon, text: "Calendar", href: "/calendar" },
  { icon: LiveIcon, text: "Live", href: "/live" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

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
    </motion.div>
  );
}
