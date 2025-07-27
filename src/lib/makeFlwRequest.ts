/**
 * Local Weather Forecast (flw) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'flw' (for local weather forecast)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en
 *
 * Documentation:
 *
 * REQ0103
 */

export async function makeFlwRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching local weather forecast:", error);
    return null;
  }
}

export default makeFlwRequest;
