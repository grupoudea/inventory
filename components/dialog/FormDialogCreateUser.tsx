import React, { FormEvent, useState } from "react";
import FormDialog from "./FormDialog";
import { FormButtons } from "./FormButtons";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";
import { Rol } from ".prisma/client";

interface FormDialogCreateUserProps {
  titleDialog: string;
  isEdit: boolean;
}

const FormDialogCreateUser = ({ titleDialog }: FormDialogCreateUserProps) => {
  const [formData, setFormData] = useState({
    correo: "",
    rol: 0,
    nombre: "",
  });

  //TODO Servicio para cargar la lista de roles, ya esta de la forma Rol
  let roles: Rol[] = [
    {
      id: 1,
      name: "ADMIN",
    },
    {
      id: 2,
      name: "USER",
    },
  ];

  const [rolSelected, setRolSelected] = useState(0);

  const { openDialogUsers, setOpenDialogUsers } = useInventoryContext();

  const loading = false; //TODO Cargar con el servicio

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let user: any = {
        name: formData.nombre,
        email: formData.correo,
        rol_id: rolSelected,
      };

      console.log("user");
      console.log(user);
      //TODO Servicio para guardar el usuario, ya esta construido de forma User

      toast.success(`Usuario creado con éxito.`);
      setOpenDialogUsers(false);
    } catch (e) {
      console.error(e);
      toast.error("Ocurrió un error al crear el usuario");
    }
  };

  const handleRolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setRolSelected(selectedValue);

    setFormData((prev) => ({
      ...prev,
      rol: selectedValue,
    }));
  };

  return (
    <FormDialog
      open={openDialogUsers}
      setOpen={setOpenDialogUsers}
      formDialogTitle={titleDialog}
    >
      <div>
        <form onSubmit={submitForm} className="gap-3">
          <div className="flex flex-row gap-3 mb-5">
            <div className="flex flex-col gap-3">
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
                placeholder="Ingresa el correo"
              />
              <span>Correo</span>
              <input
                required
                type="text"
                name="correo"
                value={formData.correo.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    correo: e.target.value,
                  }))
                }
                placeholder="Ingresa el correo"
              />
              <span>Rol</span>
              <select
                required
                value={rolSelected}
                name="rol"
                onChange={handleRolChange}
              >
                {roles?.map((rol) => (
                  <option key={`rol_${rol.id}`} value={rol.id}>
                    {rol.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormButtons
            closeModal={() => setOpenDialogUsers(false)}
            loading={loading}
          />
        </form>
      </div>
    </FormDialog>
  );
};

export { FormDialogCreateUser };
