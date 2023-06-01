import React, { FormEvent, useState } from "react";
import FormDialog from "./FormDialog";
import { FormButtons } from "./FormButtons";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";
import { CREATE_MATERIAL } from "@/graphql/client/material_client";
import { useMutation } from "@apollo/client";
import { useUserData } from "@/hooks/useUserData";

const FormDialogCreateMaterial = () => {
  let { userData } = useUserData();
  const [formData, setFormData] = useState({
    nombre: "",
    cantidad: 0,
  });

  const { openDialogMaterials, setOpenDialogMaterials } = useInventoryContext();

  const loading = false; //TODO Cargar con el servicio
  const [createMaterial] = useMutation(CREATE_MATERIAL);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let material: any = {
        name: formData.nombre,
        user_id: userData?.user.id,
        available: parseInt(formData.cantidad.toString()),
      };
      console.log("material");
      console.log(material);

      var materialCreated = await createMaterial({
        variables: {
          name: material.name,
          userId: material.user_id,
          available: material.available,
        },
      });
      console.log(materialCreated);

      toast.success(`Material creado con éxito.`);
      setOpenDialogMaterials(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <FormDialog
      open={openDialogMaterials}
      setOpen={setOpenDialogMaterials}
      formDialogTitle="Agregar un movimiento"
    >
      <div>
        <form onSubmit={submitForm} className="gap-3">
          <div className="flex flex-row gap-3 mb-5">
            <div className="flex flex-col">
              <span>Nombre</span>
              <input
                required
                type="text"
                name="nombre"
                value={formData.nombre.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }))
                }
                placeholder="Ingresa el nombre"
              />
            </div>
            <div className="flex flex-col">
              <span>Cantidad disponible</span>
              <input
                required
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cantidad: parseInt(e.target.value),
                  }))
                }
                placeholder="Ingresa la cantidad"
              />
            </div>
          </div>
          <FormButtons
            closeModal={() => setOpenDialogMaterials(false)}
            loading={loading}
          />
        </form>
      </div>
    </FormDialog>
  );
};

export { FormDialogCreateMaterial };
