import {
  InventoryContextProvider,
  useInventoryContext,
} from "@/context/InventoryContext";
import Layout from "@/layouts/Layout";
import { useNavigationContext } from "@/context/NavigationContext";
import { useEffect } from "react";
import { Column } from "@/utils/utils";
import TableUsers from "@/components/TableUsers";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/client/user";
import { Profile, User } from "@prisma/client";
import TableReactDataGrid from "@/components/TableReactDataGrid";

const UsersManagementPage = () => (
  <>
    <Layout>
      <InventoryContextProvider>
        <UsersManagement />
      </InventoryContextProvider>
    </Layout>
  </>
);

const UsersManagement = () => {
  const { setTituloHeader } = useNavigationContext();

  useEffect(() => {
    setTituloHeader("Gestión de usuarios");
  }, []);

  return (
    <div className="debug-blue flex flex-col w-full h-full px-5">
      <ButtonAddUser />
      <UsersTable />
      <div>modal</div>
    </div>
  );
};

const UsersTable = () => {
  // TODO Servico para consultar los materiales.
  // TODO Tambien el calculo de la cantidad disponible.
  // TODO organizar el objeto response de la forma de [datos]

  const {data,loading,error} = useQuery<{users:any[]}>(
    GET_USERS, {
      fetchPolicy: 'cache-first',
    }
  );

  let users : any[] = data?.users || [];
  // console.log(users);
  
  const columns: Column[] = [];
  columns.push({ name: "id", header: "Identificador" });
  columns.push({ name: "creation_date", header: "Fecha de creación" });
  columns.push({ name: "email", header: "Correo" });
  columns.push({ name: "rol", header: "Rol" });

  return (
    <>
      <TableUsers dataSource={users} columns={columns} />
      <div className="flex justify-end pr-0 mt-5 text-lg mb-24">
      </div>
    </>
  );
};

const ButtonAddUser = () => {
  const { setOpenDialogMaterials } = useInventoryContext();
  return (
    <div className="flex my-5 justify-end">
      <button type="button" onClick={() => setOpenDialogMaterials(true)}>
        Agregar Usuario
      </button>
    </div>
  );
};

export default UsersManagementPage;
