import React, { FormEvent, useState } from "react";
import FormDialog from "./FormDialog";
import { FormButtons } from "./FormButtons";
import { toast } from "react-toastify";
import { useInventoryContext } from "@/context/InventoryContext";
import { MdInput, MdOutput } from "react-icons/md";

const FormDialogAddMovement = () => {
  const [formData, setFormData] = useState({
    cantidad: 0,
    tipoMovimiento: "",
  });

  const { openDialogMovements, setOpenDialogMovements } = useInventoryContext();

  const loading = false; //TODO Cargar con el servicio

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let movimiento: any = {
        material_id: 1,
        quantity: formData.cantidad,
        creation_date: new Date(),
        tipo_movimiento: formData.tipoMovimiento,
      };

      console.log(movimiento);

      //TODO Servicio para guardar el movimiento, ya esta construido de forma Movement
      //TODO falta agregar el tipo movimiento, la entity no tiene el campo

      toast.success(`Movimiento realizado con éxito.`);
      setOpenDialogMovements(false);
    } catch (e) {
      console.error(e);
      toast.error("Ocurrió un error al agregar el movimiento");
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
                min={0}
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
            <button
              className="w-10 h-10 rounded-full bg-green-300 text-white flex items-center justify-center hover:bg-green-500"
              onClick={addInput}
            >
              <MdInput />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-red-300 text-white flex items-center justify-center hover:bg-red-500"
              onClick={addOutput}
            >
              <MdOutput />
            </button>
          </div>
          <FormButtons
            closeModal={() => setOpenDialogMovements(false)}
            loading={loading}
          />
        </form>
      </div>
    </FormDialog>
  );
};

export { FormDialogAddMovement };
