"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <BsFillSunFill className="h-5 w-5 text-yellow-300" />
      ) : (
        <BsFillMoonStarsFill className="h-5 w-5 text-slate-800" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
