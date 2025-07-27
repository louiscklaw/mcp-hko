/**
 * Latest 10-minute Mean Visibility (LTMV) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'LTMV' (for 10-minute Visibility)
 * - rformat: 'json' or 'csv' (Response format, default: csv)
 * - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json
 *
 * Documentation:
 *
 * REQ0307
 */

export async function makeLtmvRequest({
  lang = "en",
  rformat = "csv",
}: {
  lang?: string;
  rformat?: string;
}) {
  // Validate lang parameter
  const validLanguages = ["en", "tc", "sc"];
  if (!validLanguages.includes(lang)) {
    throw new Error(
      `Invalid language. Must be one of: ${validLanguages.join(", ")}`
    );
  }

  // Validate rformat parameter
  const validFormats = ["json", "csv"];
  if (!validFormats.includes(rformat)) {
    throw new Error(
      `Invalid format. Must be one of: ${validFormats.join(", ")}`
    );
  }

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php";
  const params = new URLSearchParams({
    dataType: "LTMV",
    lang,
    rformat,
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error fetching LTMV data:", error);
    return null;
  }
}

export default makeLtmvRequest;
