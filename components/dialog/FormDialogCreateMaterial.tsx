import React, { FormEvent, useState } from "react";
import FormDialog from "./FormDialog";
import { FormButtons } from "./FormButtons";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";

const FormDialogCreateMaterial = () => {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const { openDialogMaterials, setOpenDialogMaterials } = useInventoryContext();

  const loading = false; //TODO Cargar con el servicio

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let material: any = {
        name: formData.nombre,
        creation_date: new Date(),
        user_id: 1,
      };
      console.log("material");
      console.log(material);

      //TODO Servicio para guardar el material, ya esta construido de forma Material
      //TODO Falta servicio para obtener el usuario logueado

      toast.success(`Material creado con éxito.`);
      setOpenDialogMaterials(false);
    } catch (e) {
      console.error(e);
      toast.error("Ocurrió un error al crear el material");
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
