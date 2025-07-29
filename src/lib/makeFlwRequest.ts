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
 * Response Keys:
 * - generalSituation: General weather situation
 * - tcInfo: Tropical cyclone information
 * - fireDangerWarning: Fire danger warning message
 * - forecastPeriod: Forecast period
 * - forecastDesc: Detailed forecast description
 * - outlook: Weather outlook
 * - updateTime: Update time in format YYYY-MM-DD'T'hh:mm:ssZ
 *
 * Documentation:
 *
 * REQ0103
 */

import { FastMCP } from 'fastmcp'
import { z } from 'zod'
import { LANG_EN } from './CONSTANT.js'

export const USER_AGENT = 'weather-app/1.0'

export async function makeFlwRequest(lang: string) {
  const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' }

  const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=${lang}`

  try {
    const response = await fetch(url, { headers })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    return JSON.stringify(await response.json())
  } catch (error) {
    console.error('Error making NWS request:', error)
    return null
  }
}

export default (server: FastMCP<undefined>) => {
  server.addTool({
    name: 'flw',
    description: `
Local Weather Forecast (flw) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en

 Response Keys:
 - generalSituation: General weather situation
 - tcInfo: Tropical cyclone information
 - fireDangerWarning: Fire danger warning message
 - forecastPeriod: Forecast period
 - forecastDesc: Detailed forecast description
 - outlook: Weather outlook
 - updateTime: Update time in format YYYY-MM-DD'T'hh:mm:ssZ
    `,
    parameters: z.object({
      lang: z
        .string()
        .describe('change the language of the result')
        .default(LANG_EN)
    }),
    execute: async (args) => {
      const result = await makeFlwRequest(args.lang)
      return result || '<error>nothing returned</error>'
    }
  })
}

export const addFlw = (server: FastMCP<undefined>) => {
  server.addTool({
    name: 'flw',
    description: `
Local Weather Forecast (flw) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en

 Response Keys:
 - generalSituation: General weather situation
 - tcInfo: Tropical cyclone information
 - fireDangerWarning: Fire danger warning message
 - forecastPeriod: Forecast period
 - forecastDesc: Detailed forecast description
 - outlook: Weather outlook
 - updateTime: Update time in format YYYY-MM-DD'T'hh:mm:ssZ
    `,
    parameters: z.object({
      lang: z
        .string()
        .describe('change the language of the result')
        .default(LANG_EN)
    }),
    execute: async (args) => {
      const result = await makeFlwRequest(args.lang)
      return result || '<error>nothing returned</error>'
    }
  })
}
