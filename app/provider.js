"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export const Provider = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
