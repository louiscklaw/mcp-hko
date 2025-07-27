/**
 * Special Weather Tips (swt) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'swt' (for special weather tips)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=en
 *
 * Response Keys:
 * - desc: Tips Content
 * - updateTime: Tips Update Time (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0106
 */

export async function makeSwtRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching special weather tips:", error);
    return null;
  }
}

export default makeSwtRequest;
