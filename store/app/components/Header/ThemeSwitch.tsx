"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { BiSolidSun } from "react-icons/bi";
import { BsFillMoonFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      color="primary"
      size="md"
      onValueChange={() => {
        setTimeout(() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }, 165);
      }}
      startContent={<BiSolidSun />}
      endContent={<BsFillMoonFill />}
    />
    // I used the setTimeout function to delay the theme change animation which ensures a smooth switch animation
  );
};

export default ThemeSwitch;
