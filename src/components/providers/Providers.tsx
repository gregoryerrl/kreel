"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, ThemeProviderProps } from "./ThemeProvider"; // Assuming the path to your ThemeProvider

interface ProvidersProps {
  children: React.ReactNode;
  themeOptions?: ThemeProviderProps; // Optional props for ThemeProvider like defaultTheme, storageKey
}

const Providers = ({ children, themeOptions }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ThemeProvider {...themeOptions}>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
