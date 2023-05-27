import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { TypeColumn } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { Column } from "@/utils/utils";

interface TableReactDataGridProps {
  dataSource: any[];
  columns: Column[];
}

const TableReactDataGrid = (config: TableReactDataGridProps) => {
  const columns: any[] = [];

  config.columns.forEach((col) => {
    let typeColum: TypeColumn = {
      name: col.name,
      header: col.header,
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: "#3730A3",
          color: "white",
        },
      },
    };
    columns.push(typeColum);
  });

  return (
    <ReactDataGrid
      columns={columns}
      dataSource={config.dataSource}
      pagination
      pageSizes={[5, 10, 15]}
    />
  );
};

export default TableReactDataGrid;
