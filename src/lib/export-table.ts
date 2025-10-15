interface ExportOptions {
  filename?: string;
  headers?: string[];
}

/**
 * Export data to CSV file
 * @param data - Array of objects to export
 * @param options - Export options including filename and custom headers
 */
export const exportToCSV = <T extends Record<string, unknown>>(data: T[], options: ExportOptions = {}) => {
  if (!data || data.length === 0) {
    throw new Error("No data to export");
  }

  const { filename = "export.csv", headers } = options;

  // Get headers from data keys or use provided headers
  const csvHeaders = headers || Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    csvHeaders.join(","),
    ...data.map((row) =>
      csvHeaders
        .map((header) => {
          const value = row[header];
          // Handle values that contain commas or quotes
          const stringValue = String(value || "");
          return stringValue.includes(",") || stringValue.includes('"') ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
        })
        .join(",")
    ),
  ].join("\n");

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename.endsWith(".csv") ? filename : `awwrandom_${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Export data to JSON file
 * @param data - Data to export
 * @param filename - Name of the file
 */
export const exportToJSON = <T>(data: T, filename: string = "export.json") => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename.endsWith(".json") ? filename : `awwrandom_${filename}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
