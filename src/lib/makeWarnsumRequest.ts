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
 * * - {Property name}: Warning Statement Code (WFIRE, WFROST, WHOT, etc.)
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

import { FastMCP } from 'fastmcp'
import { z } from 'zod'
import { LANG_EN } from './CONSTANT.js'

export const USER_AGENT = 'weather-app/1.0'

export async function makeWarnsumRequest(lang: string) {
  const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' }

  const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=${lang}`

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
    name: 'warnsum',
    description: `
Weather Warning Summary (warnsum) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en

 Response Keys:
 * - {Property name}: Warning Statement Code (WFIRE, WFROST, WHOT, etc.)
 - name: Warning Name
 - code: Warning Code
 - actionCode: Action Code (ISSUE, REISSUE, CANCEL, etc.)
 - issueTime: Issue Time (YYYY-MM-DD'T'hh:mm:ssZ)
 - updateTime: Update Time (YYYY-MM-DD'T'hh:mm:ssZ)
    `,
    parameters: z.object({
      lang: z
        .string()
        .describe('change the language of the result')
        .default(LANG_EN)
    }),
    execute: async (args) => {
      const result = await makeWarnsumRequest(args.lang)
      return result || '<error>nothing returned</error>'
    }
  })
}
