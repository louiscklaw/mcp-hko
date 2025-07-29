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
 * Response Keys:
 * - humidity: Current humidity data
 * - temperature: Current temperature data
 * - pressure: Current pressure data
 * - wind: Current wind data
 * - uvindex: Current UV index data
 * - visibility: Current visibility data
 * - rainfall: Current rainfall data
 * - specialWxTips: Special weather tips
 * - updateTime: Last update time
 * - warningMessage: Weather warning messages
 *
 * Documentation:
 *
 * REQ0102
 */

import { FastMCP } from 'fastmcp'
import { z } from 'zod'
import { LANG_EN } from './CONSTANT.js'

export const USER_AGENT = 'weather-app/1.0'

export async function makeRhrreadRequest(lang: string = LANG_EN) {
  const headers = { 'User-Agent': USER_AGENT, Accept: 'application/geo+json' }
  const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`

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
    name: 'rhrread',
    description: `
Current Weather Report (rhrread) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en

 Response Keys:
 - humidity: Current humidity data
 - temperature: Current temperature data
 - pressure: Current pressure data
 - wind: Current wind data
 - uvindex: Current UV index data
 - visibility: Current visibility data
 - rainfall: Current rainfall data
 - specialWxTips: Special weather tips
 - updateTime: Last update time
 - warningMessage: Weather warning messages
    `,
    parameters: z.object({
      lang: z
        .string()
        .describe('change the language of the result')
        .default(LANG_EN)
    }),
    execute: async (args) => {
      const result = await makeRhrreadRequest(args.lang)
      return result || '<error>nothing returned</error>'
    }
  })
}
