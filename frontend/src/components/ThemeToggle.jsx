import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light");
    if (theme === "light") root.classList.add("theme-light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button className="secondary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle light/dark theme">
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}


