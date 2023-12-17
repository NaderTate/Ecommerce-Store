"use client";

import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

type Props = { children: React.ReactNode };

const ClientProviders = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default ClientProviders;
