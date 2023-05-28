import React, { Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";

interface FormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formDialogTitle: string;
  children: JSX.Element;
}

const FormDialog = ({
  open,
  setOpen,
  formDialogTitle,
  children,
}: FormDialogProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{formDialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default FormDialog;
