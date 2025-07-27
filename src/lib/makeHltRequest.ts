/**
 * Times and Heights of Astronomical High and Low Tides (HLT) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'HLT' (for Times and Heights of Astronomical High and Low Tides)
 * - rformat: 'json' (Response format)
 * - station: CCH/CLK/CMW/KCT/KLW/LOP/MWC/QUB/SPW/TAO/TBT/TMW/TPK/WAG
 * - year: 2022-2024
 * - month: (Optional) 1-12
 * - day: (Optional) 1-31
 * - hour: (Optional) 1-24
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HLT&station=CLK&year=2025&rformat=json
 *
 * Documentation:
 *
 * REQ0302
 */

export async function makeHltRequest({
  station,
  year,
  month,
  day,
  hour,
  rformat = "json",
}: {
  station: string;
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  rformat?: string;
}) {
  // Validate station code
  const validStations = [
    "CCH",
    "CLK",
    "CMW",
    "KCT",
    "KLW",
    "LOP",
    "MWC",
    "QUB",
    "SPW",
    "TAO",
    "TBT",
    "TMW",
    "TPK",
    "WAG",
  ];
  if (!validStations.includes(station)) {
    throw new Error(
      `Invalid station code. Must be one of: ${validStations.join(", ")}`
    );
  }

  // Validate year range
  if (year < 2022 || year > 2034) {
    throw new Error("Year must be between 2022 and 2024");
  }

  // Validate optional parameters
  if (month && (month < 1 || month > 12)) {
    throw new Error("Month must be between 1 and 12");
  }
  if (day && (day < 1 || day > 31)) {
    throw new Error("Day must be between 1 and 31");
  }
  if (hour && (hour < 1 || hour > 24)) {
    throw new Error("Hour must be between 1 and 24");
  }

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php";
  const params = new URLSearchParams({
    dataType: "HLT",
    station,
    year: year.toString(),
    rformat,
  });

  if (month !== undefined) params.append("month", month.toString());
  if (day !== undefined) params.append("day", day.toString());
  if (hour !== undefined) params.append("hour", hour.toString());

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error fetching HLT data:", error);
    return null;
  }
}

export default makeHltRequest;
