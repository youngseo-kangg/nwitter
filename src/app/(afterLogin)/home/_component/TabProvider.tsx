"use client";

import { createContext, ReactNode, useState } from "react";

// type
import { homeTabType } from "../_config";

export const TabContext = createContext({
  tab: "foryou" as homeTabType,
  setTab: (value: homeTabType) => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<homeTabType>("foryou");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
