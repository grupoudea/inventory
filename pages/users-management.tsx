import {
  InventoryContextProvider,
  useInventoryContext,
} from "@/context/InventoryContext";
import Layout from "@/layouts/Layout";
import { useNavigationContext } from "@/context/NavigationContext";
import { useEffect, useState } from "react";
import { Column } from "@/utils/utils";
import TableUsers from "@/components/TableUsers";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/client/user_client";
import PrivateRoute from "@/components/PrivateRoute";
import { FormDialogCreateUser } from "@/components/dialog/FormDialogCreateUser";

const UsersManagementPage = () => (
  <PrivateRoute>
    <Layout>
      <InventoryContextProvider>
        <UsersManagement />
      </InventoryContextProvider>
    </Layout>
  </PrivateRoute>
);

const UsersManagement = () => {
  const { setTituloHeader } = useNavigationContext();
  const [userToEditSelected, setUserToEditSelected] = useState(null);

  const handleUserToEditSelected = (item: any) => {
    setUserToEditSelected(item);
  };

  const handleResetSeleccion = () => {
    setUserToEditSelected(null);
  };

  useEffect(() => {
    setTituloHeader("Gestión de usuarios");
  }, []);

  return (
    <div className="debug-blue flex flex-col w-full h-full px-5">
      <ButtonAddUser handleResetSeleccion={handleResetSeleccion} />
      <UsersTable handleUserToEditSelected={handleUserToEditSelected} />
      <FormDialogCreateUser
        userSelected={userToEditSelected}
      ></FormDialogCreateUser>
    </div>
  );
};

const UsersTable = ({ handleUserToEditSelected }: any) => {
  // TODO Servico para consultar los usuarios con rol.
  // TODO organizar el objeto response de la forma de [users]

  const { data } = useQuery<{ users: any[] }>(GET_USERS, {
    fetchPolicy: "cache-first",
  });

  let users: any[] = data?.users || [];

  const columns: Column[] = [];
  columns.push({ name: "id", header: "Identificador" });
  columns.push({ name: "creation_date", header: "Fecha de creación" });
  columns.push({ name: "email", header: "Correo" });
  columns.push({ name: "rol_name", header: "Rol" });
  columns.push({ name: "accion", header: "Acciones" });

  let config = {
    dataSource: users,
    columns: columns,
  };

  return (
    <>
      <TableUsers
        config={config}
        handleUserToEditSelected={handleUserToEditSelected}
      />
      <div className="flex justify-end pr-0 mt-5 text-lg mb-24"></div>
    </>
  );
};

const ButtonAddUser = ({ handleResetSeleccion }: any) => {
  const { setOpenDialogUsers } = useInventoryContext();

  return (
    <div className="flex my-5 justify-end">
      <button
        type="button"
        onClick={() => {
          setOpenDialogUsers(true);
          handleResetSeleccion();
        }}
      >
        Agregar Usuario
      </button>
    </div>
  );
};

export default UsersManagementPage;
