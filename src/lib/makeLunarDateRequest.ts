/**
 * Gregorian-Lunar Calendar Conversion API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php
 *
 * Parameters:
 * - date: Gregorian date to convert (YYYY-MM-DD format)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php?date=2025-07-26
 *
 * Response example:
 * ```json
 * {
 *   "LunarYear": "乙巳年，蛇",
 *   "LunarDate": "六月初二"
 * }
 * ```
 *
 * Documentation:
 *
 * REQ0305
 */

export async function makeLunarDateRequest({ date }: { date: string }) {
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error("Date must be in YYYY-MM-DD format");
  }

  // Parse the date to validate it
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  // Validate date range (current year + 2 years)
  const currentYear = new Date().getFullYear();
  const inputYear = parsedDate.getFullYear();
  if (inputYear < currentYear || inputYear > currentYear + 2) {
    throw new Error(
      `Date must be between ${currentYear} and ${currentYear + 2}`
    );
  }

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php";
  const params = new URLSearchParams({
    date,
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching Lunar Date data:", error);
    return null;
  }
}

export default makeLunarDateRequest;
