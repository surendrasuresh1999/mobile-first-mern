import React, { useState } from "react";
import Navbar from "../Common/Navbar";
import CustomPaginationActionsTable from "../Components/DataTable";

const Homepage = () => {

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <CustomPaginationActionsTable />
      </div>
    </>
  );
};

export default Homepage;
