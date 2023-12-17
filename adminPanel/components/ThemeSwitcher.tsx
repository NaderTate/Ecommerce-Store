"use client";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiSolidSun } from "react-icons/bi";
import { BsFillMoonFill } from "react-icons/bs";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Switch
      size="md"
      onValueChange={() => {
        setTimeout(() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }, 165);
      }}
      startContent={<BiSolidSun />}
      endContent={<BsFillMoonFill />}
    />
  );
};

export default ThemeSwitcher;
