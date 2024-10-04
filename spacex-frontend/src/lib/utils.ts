import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Birden fazla sınıf adını birleştirir ve Tailwind CSS sınıflarını birleştirir.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ISO formatındaki bir tarihi Türkçe yerel ayarlarına göre formatlar.
 *
 * @param date - ISO formatında tarih stringi.
 * @returns Formatlanmış tarih ve saat içeren bir nesne.
 */
export function formatDateToDefault(date: string): {
  formattedDate: string;
  formattedTime: string;
} {
  const parsedDate = new Date(date);

  // UTC tarihini alıp dönüştürme
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short", // Kısaltılmış ay formatı
    year: "numeric",
    timeZone: "UTC" // Zaman dilimini UTC olarak ayarlıyoruz
  });

  // UTC saatini alıp dönüştürme
  const formattedTime = parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24 saat formatı
    timeZone: "UTC" // Zaman dilimini UTC olarak ayarlıyoruz
  });

  return { formattedDate, formattedTime };
}
