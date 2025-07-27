/**
 * Weather Warning Summary (warnsum) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'warnsum' (for weather warning summary)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en
 *
 * Response Keys:
 * - {Property name}: Warning Statement Code (WFIRE, WFROST, WHOT, etc.)
 * - name: Warning Name
 * - code: Warning Code
 * - actionCode: Action Code (ISSUE, REISSUE, CANCEL, etc.)
 * - issueTime: Issue Time (YYYY-MM-DD'T'hh:mm:ssZ)
 * - updateTime: Update Time (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0105
 */

export async function makeWarnsumRequest(lang = "en") {
  try {
    const response = await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error fetching weather warning summary:", error);
    return null;
  }
}

export default makeWarnsumRequest;
