import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface NavigationContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tituloHeader: string;
  setTituloHeader: Dispatch<SetStateAction<string>>;
}

const NavigationContext = createContext<NavigationContextProps>(
  {} as NavigationContextProps
);

export const useNavigationContext = () => useContext(NavigationContext);

interface NavigationContextProvider {
  children: JSX.Element[];
}

const NavigationContextProvider = ({ children }: NavigationContextProvider) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tituloHeader, setTituloHeader] = useState<string>("Header");
  return (
    <NavigationContext.Provider
      value={{ open, setOpen, tituloHeader, setTituloHeader }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContextProvider };
