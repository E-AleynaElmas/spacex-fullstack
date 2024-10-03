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
export function formatDateToTurkish(date: string): {
  formattedDate: string;
  formattedTime: string;
} {
  const parsedDate = new Date(date);

  const formattedDate = parsedDate.toLocaleDateString("tr-TR", {
    dateStyle: "medium",
  });

  const formattedTime = parsedDate.toLocaleTimeString("tr-TR", {
    timeStyle: "short",
  });

  return { formattedDate, formattedTime };
}
