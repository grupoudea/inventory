import React from "react";
import { TableConfig } from "@/utils/utils";

const TableUsers = (config: TableConfig) => (
  <div className=" flex flex-col">
    <div className="overflow-x-auto">
      <div className="w-full inline-block align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {config.columns?.map((column) => (
                  <th
                    key={column.name}
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {config.dataSource?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 text-center whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap">
                    {item.creation_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <a className="text-gray-800 hover:text-gray-800" href="#">
                      {item.rol.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default TableUsers;
