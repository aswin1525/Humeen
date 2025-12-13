"use client";

import { createContext, useContext, ReactNode } from "react";

const MissionThemeContext = createContext<string>("from-purple-500 to-pink-500");

export const MissionThemeProvider = ({ themeColor, children }: { themeColor: string; children: ReactNode }) => {
    return (
        <MissionThemeContext.Provider value={themeColor}>
            {children}
        </MissionThemeContext.Provider>
    );
};

export const useMissionTheme = () => useContext(MissionThemeContext);
