/**
 * 9-day Weather Forecast (fnd) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'fnd' (for 9-day forecast)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en
 *
 * Response Keys:
 * - weatherForecast: List of daily forecasts
 * - forecastDate: Forecast Date (YYYYMMDD)
 * - forecastWeather: Forecast Weather
 * - forecastMaxtemp: Forecast Maximum Temperature
 * - forecastMintemp: Forecast Minimum Temperature
 * - week: Day of the week
 * - forecastWind: Wind direction and strength
 * - forecastMaxrh: Maximum relative humidity
 * - forecastMinrh: Minimum relative humidity
 * - ForecastIcon: Weather icon code
 * - PSR: Probability of Significant Rain (High, Medium High, Medium, Medium Low, Low)
 *
 * Documentation:
 *
 * REQ0101
 */

export const USER_AGENT = "weather-app/1.0";

export async function makeFndRequest() {
  const headers = { "User-Agent": USER_AGENT, Accept: "application/json" };

  const url =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en";

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

export default function helloworld() {
  return "helloworld";
}
