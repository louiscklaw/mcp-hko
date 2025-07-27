/**
 * Weather Warning Information (warningInfo) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'warningInfo' (for weather warning information)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en
 *
 * Documentation:
 *
 * REQ0104
 */

export async function makeWarningInfoRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching weather warning information:", error);
    return null;
  }
}

export default makeWarningInfoRequest;
