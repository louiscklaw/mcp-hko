/**
 * Quick Earthquake Messages (qem) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php
 *
 * Parameters:
 * - dataType: 'qem' (for quick earthquake messages)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=en
 *
 * Response Keys:
 * - lat: Latitude
 * - lon: Longitude
 * - mag: Richter magnitude scale
 * - region: Region
 * - ptime: Earthquake date and time (YYYY-MM-DD'T'hh:mm:ssZ)
 * - updateTime: Update time (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0201
 */

export async function makeQemRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching quick earthquake messages:", error);
    return null;
  }
}

export default makeQemRequest;
