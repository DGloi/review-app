import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
    FunnelIcon,
  } from "@heroicons/react/24/outline";
  import React from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  import "./TablePagination.css";
  
  function TablePagination({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount,
    totalRow,
    actions: Actions,
  }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter, sortBy },
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data,
          manualPagination: true,
          manualSortBy: true,
          initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: [],
          },
          pageCount: controlledPageCount,
          autoResetSortBy: false,
          autoResetExpanded: false,
          autoResetPage: false,
          autoResetGlobalFilter: false, 
        },
        useGlobalFilter,
        useSortBy,
        usePagination
      );
       
      const GlobalFilter = ({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
      }) => {
        const count = preGlobalFilteredRows.length;
        const [value, setValue] = React.useState(globalFilter);
        const inputRef = React.useRef();
      
        React.useEffect(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, []);
      
        return (
          <div
            className={
              Actions !== undefined
                ? "flex flex-row justify-between"
                : "flex flex-col"
            }
          >
            {Actions !== undefined ? <Actions /> : null}
            <input
              ref={inputRef}
              value={value || ""}
              onChange={(e) => {
                setValue(e.target.value);
                setGlobalFilter(e.target.value || undefined);
              }}
              placeholder={`${count} records...`}
              type="search"
              className={`input input-bordered input-sm w-full max-w-xs focus:outline-0 mb-2 ${
                Actions !== undefined ? "" : "self-end"
              }`}
            />
          </div>
        );
      };
      
    React.useEffect(() => {
      let search = globalFilter === undefined ? "" : globalFilter;
      fetchData(pageSize, pageIndex, search, sortBy);
    }, [fetchData, pageIndex, pageSize, globalFilter, sortBy]);
  
    return (
      <>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="overflow-x-auto relative">
          <table
            {...getTableProps()}
            className="table table-compact table-zebra w-full"
          >
            <thead>
            {headerGroups.map((headerGroup) => (
  <tr {...headerGroup.getHeaderGroupProps()}>
    {headerGroup.headers.map((column) => (
      <th
        {...column.getHeaderProps(column.getSortByToggleProps())}
      className="column-width">
       <div className="header-content">
        <span className="header-text">
          {column.isSorted ? (
            column.isSortedDesc ? (
          <ArrowLongDownIcon className="table-icon" />
            ) : (
          <ArrowLongUpIcon className="table-icon" />
        )
         ) : (
          <FunnelIcon className="table-icon" />
        )}
         {column.render("Header")}
       </span>
      </div>
      </th>
    ))}
  </tr>
))}                  
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover">
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mt-2">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} from {pageOptions.length}
              </strong>{" "}
              Total <strong>{preGlobalFilteredRows.length}</strong>{" "}
            </span>
            <span>
              | Go to Page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className="input input-bordered input-sm w-20 max-w-xs focus:outline-0"
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="select select-bordered select-sm w-30 max-w-xs focus:outline-0"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize} results per page
                </option>
              ))}
            </select>  
          </div>
          <div className="mt-2">
            <button
              className="btn btn-xs"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="btn btn-xs"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="btn btn-xs"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="btn btn-xs"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}     
          </div>
        </div>
      </>
    );
  }
  
  export default TablePagination;
  