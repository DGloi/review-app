import { getEmployeeTable } from "services/APIEmployee";
import TablePagination from "utils/TablePagination";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState, useCallback } from "react";

function EmployeeTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [totalRow, setTotalRow] = useState(0);

  const fetchData = useCallback(
    async (pageSize, pageIndex, search, order) => {
      setLoading(true);
      try {
        const queryOptions = {
          page: pageIndex,
          limit: pageSize,
          search: search,
          order: order,
        };
        const items = await getEmployeeTable(queryOptions);

        // Log the API response to the console
        console.log("API response:", items);

        // Check if items is an array
        if (Array.isArray(items)) {
          // Calculate totalRow based on the length of the items array
          const totalRow = items.length;
          setTotalRow(totalRow);

          // Calculate pageCount based on totalRow and pageSize
          const pageCount = Math.ceil(totalRow / pageSize);
          setPageCount(pageCount);

          // Slice the items array based on pagination parameters
          const startIndex = pageIndex * pageSize;
          const endIndex = startIndex + pageSize;
          const slicedItems = items.slice(startIndex, endIndex);

          // Update data with the sliced items
          setData(slicedItems);
        } else {
          console.error("Invalid response format from API:", items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => `#${row.original.id}`,
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Level",
        accessor: "level",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Division",
        accessor: "division",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "Currency",
        accessor: "currency",
      },
      {
        Header: "Salary Timebase",
        accessor: "salary_timebase",
      },
      {
        Header: "Hire Date",
        accessor: "hire_date",
      },
      {
        Header: "Action",
        accessor: ({ row }) => {
          return (
            <div className="flex gap-2">
              <button className="btn btn-xs btn-info">
                <PencilSquareIcon className="w-4 h-4" />
              </button>
              <button className="btn btn-xs btn-error">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <section id="EmployeeTable">
      <TablePagination
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        totalRow={totalRow}
      />
    </section>
  );
}

export default EmployeeTable;
