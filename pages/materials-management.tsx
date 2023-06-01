import React, { useEffect } from "react";
import { Column } from "@/utils/utils";
import { useNavigationContext } from "@/context/NavigationContext";
import { FormDialogCreateMaterial } from "@/components/dialog/FormDialogCreateMaterial";
import {
  InventoryContextProvider,
  useInventoryContext,
} from "@/context/InventoryContext";
import Layout from "@/layouts/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import { useQuery } from "@apollo/client";
import { GET_MATERIALS } from "@/graphql/client/material_client";
import Head from "next/head";
import PrivateComponent from "@/components/PrivateComponent";
import TableReactDataGrid from "@/components/TableReactDataGrid";

const MaterialsManagementPage = () => (
  <PrivateRoute>
    <Head>
      <title>Materials</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <InventoryContextProvider>
        <MaterialsManagement />
      </InventoryContextProvider>
    </Layout>
  </PrivateRoute>
);

const MaterialsManagement = () => {
  const { setTituloHeader } = useNavigationContext();

  useEffect(() => {
    setTituloHeader("Gestión de materiales");
  }, []);

  return (
    <div className="flex w-full flex-col h-full px-5">
      <div className="flex justify-end">
        <ButtonAddMaterial></ButtonAddMaterial>
      </div>
      <MaterialsTable></MaterialsTable>

      <FormDialogCreateMaterial />
    </div>
  );
};

const MaterialsTable = () => {
  // TODO Servico para consultar los materiales.
  // TODO Tambien el calculo de la cantidad disponible.
  // TODO organizar el objeto response de la forma de [datos]

  const { data } = useQuery<{ materials: any[] }>(GET_MATERIALS, {
    fetchPolicy: "cache-first",
  });

  let materials: any[] = data?.materials || [];

  const columns: Column[] = [];
  columns.push({ name: "id", header: "Identificador" });
  columns.push({ name: "creation_date", header: "Fecha de creación" });
  columns.push({ name: "name", header: "Nombre" });
  columns.push({ name: "available", header: "Cantidad disponible" });

  return (
    <>
      <TableReactDataGrid dataSource={materials} columns={columns} />
    </>
  );
};

const ButtonAddMaterial = () => {
  const { setOpenDialogMaterials } = useInventoryContext();
  return (
    <div className="flex my-5 justify-end">
      <PrivateComponent role="ADMIN">
        <button type="button" onClick={() => setOpenDialogMaterials(true)}>
          Agregar material
        </button>
      </PrivateComponent>
    </div>
  );
};

export default MaterialsManagementPage;
