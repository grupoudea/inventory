import { createContext, useContext } from "react";

interface InventoryContextProps {}

const InventoryContext = createContext<InventoryContextProps>(
  {} as InventoryContextProps
);

export const useInventoryContext = () => useContext(InventoryContext);

interface InventoryContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const InventoryContextProvider = ({
  children,
}: InventoryContextProviderProps) => {
  return (
    <InventoryContext.Provider value={{}}>{children}</InventoryContext.Provider>
  );
};

export { InventoryContextProvider };
