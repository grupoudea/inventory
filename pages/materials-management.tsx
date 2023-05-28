import React, { useEffect } from "react";
import { Column } from "@/utils/utils";
import { useNavigationContext } from "@/context/NavigationContext";
import TableMaterials from "@/components/TableMaterials";
import { FormDialogCreateMaterial } from "@/components/dialog/FormDialogCreateMaterial";
import { useInventoryContext } from "@/context/InventoryContext";

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

  let dataSource: any[] = [];
  let cantidadDisponible = 0;

  let datos = [
    {
      id: 1,
      name: "material1",
      available: 25,
      creation_date: new Date(),
      user_id: 1,
    },
    {
      id: 2,
      name: "material1",
      available: 25,
      creation_date: new Date(),
      user_id: 1,
    },
    {
      id: 3,
      name: "material1",
      available: 25,
      creation_date: new Date(),
      user_id: 1,
    },
    {
      id: 4,
      name: "material1",
      available: 25,
      creation_date: new Date(),
      user_id: 1,
    },
    {
      id: 5,
      name: "material1",
      available: 25,
      creation_date: new Date(),
      user_id: 1,
    },
  ];

  dataSource = datos.map((dato) => ({
    ...dato,
    creation_date: dato.creation_date.toLocaleDateString(),
  }));

  const columns: Column[] = [];
  columns.push({ name: "id", header: "Identificador" });
  columns.push({ name: "creation_date", header: "Fecha del creación" });
  columns.push({ name: "name", header: "Nombre" });
  columns.push({ name: "available", header: "Cantidad disponible" });

  return (
    <>
      <TableMaterials
        dataSource={dataSource}
        columns={columns}
      ></TableMaterials>
      <div className="flex justify-end pr-0 mt-5 text-lg mb-24">
        Cantidad disponible: {cantidadDisponible}
      </div>
    </>
  );
};

const ButtonAddMaterial = () => {
  const { setOpenDialogMaterials } = useInventoryContext();
  return (
    <div className="flex my-5 justify-end">
      <button type="button" onClick={() => setOpenDialogMaterials(true)}>
        Agregar material
      </button>
    </div>
  );
};

export default MaterialsManagement;
