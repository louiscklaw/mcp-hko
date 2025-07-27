/**
 * Current Weather Report (rhrread) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'rhrread' (for current weather report)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en
 *
 * Documentation:
 *
 * REQ0102
 */

export const USER_AGENT = "weather-app/1.0";

export async function makeRhrreadRequest() {
  const headers = { "User-Agent": USER_AGENT, Accept: "application/geo+json" };
  const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}
