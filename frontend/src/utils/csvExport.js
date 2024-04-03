function exportToCSV(data, columns) {
    // Debugging: Log data and columns
    console.log("Data for CSV export:", data);
    console.log("Columns:", columns);
  
    // Check if data array is empty
    if (data.length === 0) {
      // Send notification to browser
      alert("No data available to export.");
      return; // Exit function
    }
  
    const csvContent = [
        columns.map((column) => column.Header).join(","),
        ...data.map((row) => {
          console.log("Row:", row); // Log the row object
          return columns.map((column) => row[column.accessor]).join(",");
        }),
      ].join("\n");
      
  
    console.log("CSV Content:", csvContent); // Debugging: Log CSV content
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  export default exportToCSV;