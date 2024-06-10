import React, { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { XCircle } from "lucide-react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UserDialogbox = ({ openDialog, setter }) => {
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => setter(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        className={` flex flex-col sm:flex-row justify-between gap-4`}
      >
        <span
          className={`text-18size sm:text-22size font-700 flex items-center justify-between`}
        >
          User profile information
          <span
            className="cursor-pointer block sm:hidden"
            onClick={() => setter(false)}
          >
            <XCircle color={"#393939"} />
          </span>
        </span>
      </DialogTitle>
      <DialogContent dividers={true}>
        <div>hello</div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialogbox;
