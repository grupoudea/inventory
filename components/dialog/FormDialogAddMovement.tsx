import React, { FormEvent, useState } from "react";
import FormDialog from "./FormDialog";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";
import { MdInput, MdOutput } from "react-icons/md";
import { CREATE_MOVEMENT } from "@/graphql/client/movement_client";
import { useMutation } from "@apollo/client";

const FormDialogAddMovement = ({
  materialSelected,
}: {
  materialSelected: number;
}) => {
  const [formData, setFormData] = useState({
    cantidad: 0,
    tipoMovimiento: "",
  });

  const { openDialogMovements, setOpenDialogMovements } = useInventoryContext();

  const [createMovement] = useMutation(CREATE_MOVEMENT);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let movimiento: any = {
        material_id: materialSelected,
        quantity: formData.cantidad,
        tipo_movimiento: formData.tipoMovimiento,
      };

      await createMovement({
        variables: {
          quantity: movimiento.quantity,
          movementType: movimiento.tipo_movimiento,
          materialId: movimiento.material_id,
        },
      });

      toast.success(`Movimiento realizado con éxito.`);
      setOpenDialogMovements(false);

      setFormData((prev) => ({
        ...prev,
        cantidad: 0,
        tipoMovimiento: "",
      }));
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const addInput = () => {
    setFormData((prev) => ({
      ...prev,
      tipoMovimiento: "ENTRADA",
    }));
  };

  const addOutput = () => {
    setFormData((prev) => ({
      ...prev,
      tipoMovimiento: "SALIDA",
    }));
  };

  return (
    <FormDialog
      open={openDialogMovements}
      setOpen={setOpenDialogMovements}
      formDialogTitle="Agregar un movimiento"
    >
      <div>
        <form onSubmit={submitForm} className="gap-3">
          <div className="flex flex-row gap-3 mb-5 items-end">
            <div className="flex flex-col">
              <span>Cantidad</span>
              <input
                required
                type="number"
                name="cantidad"
                min={1}
                step={1}
                value={formData.cantidad.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cantidad: parseInt(e.target.value),
                  }))
                }
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 justify-center">
            <div className="flex flex-col items-center">
              <button
                className="w-10 h-10 rounded-full bg-green-300 text-white flex items-center justify-center hover:bg-green-500"
                onClick={() => {
                  addInput();
                }}
              >
                <MdInput />
              </button>
              <label className="text-xs">Entrada</label>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="w-10 h-10 rounded-full bg-red-300 text-white flex items-center justify-center hover:bg-red-500"
                onClick={addOutput}
              >
                <MdOutput />
              </button>
              <span className="text-xs">Salida</span>
            </div>
          </div>
          <FormButtons
            closeModal={() => setOpenDialogMovements(false)}
            loading={loading}
            primaryText={"Crear"}
          />
        </form>
      </div>
    </FormDialog>
  );
};

export { FormDialogAddMovement };
