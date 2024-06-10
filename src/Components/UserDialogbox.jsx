import React, { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { XCircle } from "lucide-react";
import axios from "axios";
import MuiLoader from "../Common/MuiLoader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UserDialogbox = ({ openDialog, setter }) => {
  const [isFetching, setIsFetching] = useState(true);

  const [userProfileData, serUserProfileData] = useState({});

  const getSwapiParticulerPersonData = () => {
    axios
      .get(openDialog.url)
      .then((response) => {
        console.log(response.data);
        serUserProfileData(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSwapiParticulerPersonData();
  }, []);
  return (
    <Dialog
      open={openDialog.open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => setter(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <span className={`text-18size sm:text-22size font-700`}>
          User profile Card
        </span>
      </DialogTitle>
      <DialogContent dividers={true}>
        {isFetching ? (
          <MuiLoader />
        ) : (
          <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col p-8">
              <div>
                <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-500">
                  <span className="font-medium leading-none text-white">
                    {userProfileData.name.slice(0, 2).toUpperCase()}
                  </span>
                </span>
              </div>
              <h3 className="mt-6 text-18size font-medium text-gray-900">
                <span className="font-semibold text-gray-400">Name: </span>
                {userProfileData.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between space-y-1">
                <dt className="sr-only">Title</dt>

                <dd className="text-sm text-gray-500">
                  Eye color:{" "}
                  <span className="font-semibold text-black">
                    {userProfileData.eye_color}
                  </span>
                </dd>
                <dd className="text-sm text-gray-500">
                  Skin color:{" "}
                  <span className="font-semibold text-black">
                    {userProfileData.skin_color}
                  </span>
                </dd>
                <dd className="text-sm text-gray-500">
                  Birth Year:{" "}
                  <span className="font-semibold text-black">
                    {userProfileData.birth_year}
                  </span>
                </dd>
              </dl>
            </div>
          </li>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDialogbox;
