"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AppContext.Provider value={[state, setState]}>
    <SessionProvider>{children}</SessionProvider>
    // </AppContext.Provider>
  );
};

export default AppProvider;
