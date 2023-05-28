import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InventoryContextProps {
  openDialogMovements: boolean;
  setOpenDialogMovements: Dispatch<SetStateAction<boolean>>;
  openDialogMaterials: boolean;
  setOpenDialogMaterials: Dispatch<SetStateAction<boolean>>;
  openDialogUsers: boolean;
  setOpenDialogUsers: Dispatch<SetStateAction<boolean>>;
}

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
  
  const [openDialogMovements, setOpenDialogMovements] = useState<boolean>(false);
  const [openDialogMaterials, setOpenDialogMaterials] = useState<boolean>(false);
  const [openDialogUsers, setOpenDialogUsers] = useState<boolean>(false);

  return (
    <InventoryContext.Provider
      value={{
        openDialogMovements,
        setOpenDialogMovements,
        openDialogMaterials,
        setOpenDialogMaterials,
        openDialogUsers,
        setOpenDialogUsers,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContextProvider };
