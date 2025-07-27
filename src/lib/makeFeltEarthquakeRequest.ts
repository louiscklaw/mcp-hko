/**
 * Locally Felt Earth Tremor Report (feltearthquake) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php
 *
 * Parameters:
 * - dataType: 'feltearthquake' (for locally felt earth tremor report)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=feltearthquake&lang=en
 *
 * Response Keys:
 * - updateTime: Last update time (YYYY-MM-DD'T'hh:mm:ssZ)
 * - mag: Richter magnitude scale (Numeric value)
 * - region: Region of the earthquake (Text)
 * - intensity: Intensity of the earthquake (Text)
 * - lat: Latitude (Numeric value)
 * - lon: Longitude (Numeric value)
 * - details: Earthquake details (Text)
 * - ptime: Date and time of the earthquake (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0202
 */

export async function makeFeltEarthquakeRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=feltearthquake&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching locally felt earth tremor report:", error);
    return null;
  }
}

export default makeFeltEarthquakeRequest;
