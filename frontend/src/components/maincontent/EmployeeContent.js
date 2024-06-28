import { getEmployeeTable, deleteEmployee } from "services/APIEmployee";
import TablePagination from "utils/TablePagination";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState, useCallback } from "react";
import  exportToCSV  from "utils/csvExport";
import './EmployeeContent.css';


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
  const handleDelete = async (id, pageSize, pageIndex, search, order) => {
    try {
      // Make the API call to delete the record with the given ID
      await deleteEmployee(id, () => {
      }, (error) => {
        // Error callback
        console.error("Error deleting record:", error);
      });
      
      // After successful deletion, fetch updated data from the API
      fetchData(pageSize, pageIndex, search, order);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
    ;
  
const handleExportToCSV = async (columns) => {
  try {
    // Fetch all data from the API
    const response = await getEmployeeTable({ page: 0, limit: totalRow });
  
    // Check if response is valid
    if (Array.isArray(response)) {
      // Exclude the "Action" column from the export
      const filteredColumns = columns.filter(column => column.accessor !== "action");
  
      // Check if all objects in response array have the 'id' property defined
      if (response.every(obj => obj.hasOwnProperty('id'))) {
        exportToCSV(response, filteredColumns);
      } else {
        console.error("Some objects in data array do not have the 'id' property defined.");
      }
    } else {
      console.error("Invalid response format from API:", response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
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
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.id)} className="btn btn-xs btn-error">
          <span className="sr-only"></span> {/* Screen reader only text */}
          <TrashIcon className="w-4 h-4" />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <section id="EmployeeTable">
      <h1 className="table-title">Employee Table</h1> 
      <TablePagination
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        totalRow={totalRow}
      />
      <div className="mb-4">
        <br/>
        <button onClick={() => handleExportToCSV(columns)} className="btn btn-primary">Export to CSV</button>
      </div>
    </section>
  );
}

export default EmployeeTable;