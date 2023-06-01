import React, { FormEvent, useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import { FormButtons } from "./FormButtons";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";
import { useQuery } from "@apollo/client";
import { GET_ROLES } from "@/graphql/client/rol_client";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/client/user_client";

const FormDialogCreateUser = ({ userSelected }: any) => {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    rol: 0,
  });

  let titleDialog = "Crear usuario";
  if (userSelected) {
    titleDialog = "Editar usuario";
  }

  const { data } = useQuery<{ roles: any[] }>(GET_ROLES, {
    fetchPolicy: "cache-first",
  });

  let roles: any[] = data?.roles || [];

  const [rolSelected, setRolSelected] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userSelected) {
      console.log("userSelected");
      console.log(userSelected);
      setRolSelected(userSelected.rol_id);
      setFormData((prev) => ({
        ...prev,
        correo: userSelected.email,
        rol: userSelected.rol_id,
      }));
      setDisabled(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        correo: "",
      }));
      setDisabled(false);
    }
  }, [userSelected]);

  const { openDialogUsers, setOpenDialogUsers } = useInventoryContext();

  const loading = false; //TODO Cargar con el servicio
  const [createUser] = useMutation(CREATE_USER);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let user: any = {
        email: formData.correo,
        name: formData.nombre,
        rol_id: rolSelected,
      };

      if (user.rol_id == 0) {
        toast.warning("Selecciona un rol");
        return;
      }
      //TODO Servicio para guardar el usuario, ya esta construido de forma User
      var userCreated = await createUser({
        variables: {
          name: user.name,
          email: user.email,
          rolId: user.rol_id,
        },
      });
      console.log(userCreated);

      toast.success(`Usuario ${userCreated.data.email} creado con éxito.`);
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
              <span>Correo</span>
              <input
                required
                type="text"
                name="correo"
                disabled={disabled}
                value={formData.correo.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    correo: e.target.value,
                  }))
                }
                placeholder="Ingresa el correo"
              />
              <input
                required
                type="text"
                name="nombre"
                disabled={disabled}
                value={formData.nombre.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }))
                }
                placeholder="Ingresa el nombre de usuario"
              />
              <span>Rol</span>
              <select
                required
                value={rolSelected}
                name="rol"
                onChange={handleRolChange}
              >
                <option key={"default"} value={0}>
                  {"Selecciona un rol"}
                </option>
                {roles?.map((rol) => (
                  <option key={`rol_${rol.id}`} value={rol.id}>
                    {rol.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormButtons
            closeModal={() => {
              setOpenDialogUsers(false);
            }}
            loading={loading}
          />
        </form>
      </div>
    </FormDialog>
  );
};

export { FormDialogCreateUser };
