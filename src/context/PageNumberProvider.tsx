import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageNumberContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageNumberContext = createContext<PageNumberContextType | null>(null);

export const PageNumberProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);

  return (
    <PageNumberContext.Provider value={{ page, setPage }}>
      {children}
    </PageNumberContext.Provider>
  );
};

export const usePageNumber = () => {
  const context = useContext(PageNumberContext);
  if (!context) {
    throw new Error("usePageNumber must be used within a PageNumberProvider");
  }
  return context;
};
