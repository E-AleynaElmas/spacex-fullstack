import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarIcon } from "../../assets/icons/calendar-icon";
import { HomeIcon } from "../../assets/icons/home-icon";
import { LiveIcon } from "../../assets/icons/live-icon";
import { SettingsIcon } from "../../assets/icons/settings-icon";
import { MenuIcon } from "lucide-react";

const menuItems = [
  { icon: HomeIcon, text: "Home", href: "/" },
  { icon: SettingsIcon, text: "Settings", href: "/settings" },
  { icon: CalendarIcon, text: "Calendar", href: "/calendar" },
  { icon: LiveIcon, text: "Live", href: "/live" },
];

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? "bg-gradient-to-b from-[#264061]/50 to-[#264061]/50" : ""
        } shadow-lg`}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-40 backdrop-blur-sm flex flex-col items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.div
                  className="text-white text-xl flex items-center space-x-3 p-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span>{item.text}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
}
