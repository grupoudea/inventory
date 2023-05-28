import React, { useEffect, useState } from "react";
import { Material } from "@prisma/client";
import TableInventory from "@/components/TableInventory";
import { Column } from "@/utils/utils";
import Layout from "@/layouts/Layout";
import { useNavigationContext } from "@/context/NavigationContext";
import { InventoryContextProvider } from "@/context/InventoryContext";

const InventoryPage = () => (
  <Layout>
    <InventoryContextProvider>
      <div className="flex flex-col h-full w-full">
        <InventoryManagement />
      </div>
    </InventoryContextProvider>
  </Layout>
);

const InventoryManagement = () => {
  const [materialSelected, setMaterialSelected] = useState<any>(null);
  const { setTituloHeader } = useNavigationContext();

  useEffect(() => {
    setTituloHeader("Gestión de inventarios");
  }, []);

  return (
    <div className="flex w-full flex-col h-full px-5">
      <div className="flex justify-between">
        <InputSearchMovement
          materialSelected={materialSelected}
          setMaterialSelected={setMaterialSelected}
        />
        <ButtonAddMovement />
      </div>
      <InventoryTable materialSelected={materialSelected}></InventoryTable>
    </div>
  );
};

const InventoryTable = ({ materialSelected }) => {
  // TODO Servico para consultar los movimientos, el servicio debe retornar la lista de movimientos con filtro.
  // TODO usar [materialSelected] para el filtro
  // TODO Tambien el calculo de la cantidad disponible.
  // TODO organizar el objeto response de la forma de [datos]

  let dataSource: any[] = [];
  let cantidadDisponible = 0;

  const loading = false; //TODO Cargar con el servicio

  if (materialSelected) {
    let datos = {
      movimientos: [
        {
          id: 1,
          quantity: 1,
          creation_date: new Date(),
          material_id: 1,
          tipoMaterial: "ENTRADA",
        },
        {
          id: 2,
          quantity: 1,
          creation_date: new Date(),
          material_id: 2,
          tipoMaterial: "SALIDA",
        },
        {
          id: 3,
          quantity: 1,
          creation_date: new Date(),
          material_id: 2,
          tipoMaterial: "SALIDA",
        },
        {
          id: 4,
          quantity: 1,
          creation_date: new Date(),
          material_id: 2,
          tipoMaterial: "SALIDA",
        },
        {
          id: 5,
          quantity: 1,
          creation_date: new Date(),
          material_id: 2,
          tipoMaterial: "SALIDA",
        },
      ],
      cantidadDisponible: 35,
    };

    dataSource = datos.movimientos.map((dato) => ({
      ...dato,
      creation_date: dato.creation_date.toLocaleDateString(),
    }));

    dataSource.forEach((dato) => {
      if (dato.tipoMaterial == "ENTRADA") {
        dato.entradas = dato.quantity;
      }
      if (dato.tipoMaterial == "SALIDA") {
        dato.salidas = dato.quantity;
      }
    });

    cantidadDisponible = datos.cantidadDisponible;
  }

  if (loading) return <div>Loading...</div>;

  const columns: Column[] = [];
  columns.push({ name: "id", header: "Identificador" });
  columns.push({ name: "creation_date", header: "Fecha del movimiento" });
  columns.push({ name: "entradas", header: "Entradas" });
  columns.push({ name: "salidas", header: "Salidas" });

  return (
    <>
      <TableInventory
        dataSource={dataSource}
        columns={columns}
      ></TableInventory>
      <div className="flex justify-end pr-0 mt-5 text-lg mb-24">
        Cantidad disponible: {cantidadDisponible}
      </div>
    </>
  );
};

const ButtonAddMovement = () => (
  <div className="flex my-5 justify-end">
    <button type="button" onClick={() => console.log("guardar")}>
      Agregar movimiento
    </button>
  </div>
);

const InputSearchMovement = ({ materialSelected, setMaterialSelected }) => {
  // TODO Servico para consultar los materiales
  // TODO organizar el objeto response de la forma de [materiales]

  const handleMaterialChange = (event) => {
    setMaterialSelected(event.target.value);
  };

  let materiales: Material[] = [
    {
      id: 1,
      name: "material1",
      available: 1,
      creation_date: new Date(),
      user_id: 1,
    },
    {
      id: 2,
      name: "material2",
      available: 1,
      creation_date: new Date(),
      user_id: 1,
    },
  ];

  return (
    <div className="flex my-5">
      <select
        required
        value={materialSelected}
        name="material"
        onChange={handleMaterialChange}
      >
        <option value={""}>Seleccione un material</option>
        {materiales?.map((material) => (
          <option key={`material_${material.id}`} value={material.id}>
            {material.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default InventoryPage;
