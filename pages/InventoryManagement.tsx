import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { TypeColumn } from "@inovua/reactdatagrid-community/types/TypeColumn";

const TestTable = () => {
  const dataSource = [
    {
      id: 1,
      firstName: "test",
      lastName: "test1",
      email: "email@test.com",
    },
  ];

  const columns: TypeColumn[] = [
    {
      name: "id",
      header: "id",
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: "#3730A3",
          color: "white",
        },
      },
    },
    {
      name: "firstName",
      header: "firstName",
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: "#3730A3",
          color: "white",
        },
      },
    },
    {
      name: "lastName",
      header: "lastName",
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: "#3730A3",
          color: "white",
        },
      },
    },
    {
      name: "email",
      header: "email",
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: "#3730A3",
          color: "white",
        },
      },
    },
  ];

  return (
    <ReactDataGrid
      columns={columns}
      dataSource={dataSource}
      pagination
      pageSizes={[5, 10, 15]}
    />
  );
};

const InventoryManagement = () => {

  return (
    <>
      <div>InventoryManagement</div>
      <TestTable></TestTable>
    </>
  );
};

export default InventoryManagement;
