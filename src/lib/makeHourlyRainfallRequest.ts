/**
 * Rainfall in the Past Hour from Automatic Weather Station API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php
 *
 * Parameters:
 * - lang: Language option (en, tc, sc) - default: en
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php?lang=en
 *
 * Response example:
 * ```json
 * {
 *   "obsTime": "2025-01-01T08:00:00+08:00",
 *   "hourlyRainfall": [
 *     {
 *       "automaticWeatherStation": "Lau Fau Shan",
 *       "automaticWeatherStationID": "RF001",
 *       "value": "0",
 *       "unit": "mm"
 *     },
 *     {
 *       "automaticWeatherStation": "Wetland Park",
 *       "automaticWeatherStationID": "RF002",
 *       "value": "2",
 *       "unit": "mm"
 *     }
 *   ]
 * }
 * ```
 *
 * Documentation:
 *
 * REQ0501
 */

export async function makeHourlyRainfallRequest({
  lang = "en",
}: {
  lang?: string;
}) {
  // Validate lang parameter
  const validLanguages = ["en", "tc", "sc"];
  if (!validLanguages.includes(lang)) {
    throw new Error(
      `Invalid language. Must be one of: ${validLanguages.join(", ")}`
    );
  }

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php";
  const params = new URLSearchParams({
    lang,
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching Hourly Rainfall data:", error);
    return null;
  }
}

export default makeHourlyRainfallRequest;
