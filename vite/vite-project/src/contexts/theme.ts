import { createContext } from "react";

export type THEME_TYPE = "dark" | "ligth";

export const ThemeContext = createContext<THEME_TYPE | null>(null);
