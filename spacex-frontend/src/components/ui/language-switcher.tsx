import { motion } from "framer-motion";
import React, { useCallback } from "react";
import enFlag from "@/assets/images/en-flag.png";
import trFlag from "@/assets/images/tr-flag.png";
import Image from "next/image";
import useLanguageStore from "@/store/language-store";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = useCallback(() => {
    const newLanguage = language === "tr" ? "en" : "tr";
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="flex items-center space-x-4"
    >
      <button onClick={handleLanguageChange} className="focus:outline-none">
        <Image
          src={language === "tr" ? trFlag : enFlag}
          alt={language === "tr" ? "Türkçe" : "English"}
          className="w-6 h-6 object-cover rounded-full "
        />
      </button>
    </motion.div>
  );
};

export default LanguageSwitcher;
