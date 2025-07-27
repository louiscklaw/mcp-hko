/**
 * Times of Sunrise/Sunset (SRS) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'SRS' (for Sunrise/Sunset Times)
 * - rformat: 'json' or 'csv' (Response format, default: csv)
 * - year: 2018-2024
 * - month: (Optional) 1-12 (requires year)
 * - day: (Optional) 1-31 (requires year and month)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=SRS&year=2025&month=1&rformat=json
 *
 * Documentation:
 *
 * REQ0303
 */

export async function makeSrsRequest({
  year,
  month,
  day,
  rformat = "csv",
}: {
  year: number;
  month?: number;
  day?: number;
  rformat?: string;
}) {
  // Validate year range
  if (year < 2018 || year > 2024) {
    throw new Error("Year must be between 2018 and 2024");
  }

  // Validate optional parameters
  if (month && (month < 1 || month > 12)) {
    throw new Error("Month must be between 1 and 12");
  }
  if (day && (day < 1 || day > 31)) {
    throw new Error("Day must be between 1 and 31");
  }

  // Validate dependencies
  if (month !== undefined && day !== undefined && !year) {
    throw new Error("Year is required when specifying month and day");
  }
  if (day !== undefined && (month === undefined || !year)) {
    throw new Error("Year and month are required when specifying day");
  }

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php";
  const params = new URLSearchParams({
    dataType: "SRS",
    year: year.toString(),
    rformat,
  });

  if (month !== undefined) params.append("month", month.toString());
  if (day !== undefined) params.append("day", day.toString());

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error fetching SRS data:", error);
    return null;
  }
}

export default makeSrsRequest;
