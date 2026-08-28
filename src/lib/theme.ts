export const THEME_STORAGE_KEY = "octapus-theme";

/**
 * Returns the theme ("light" | "dark") based on Gulf Standard Time (GST, UTC+4).
 * 6:00 AM to 5:59 PM GST (06:00 - 17:59): "light"
 * 6:00 PM to 5:59 AM GST (18:00 - 05:59): "dark"
 */
export function getGstTheme(): "light" | "dark" {
  const utcHours = new Date().getUTCHours();
  const gstHours = (utcHours + 4) % 24;
  return gstHours >= 6 && gstHours < 18 ? "light" : "dark";
}
