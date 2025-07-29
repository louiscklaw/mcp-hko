/**
 * Gregorian-Lunar Calendar Conversion API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php
 *
 * Parameters:
 * - date: Gregorian date to convert (YYYY-MM-DD format)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php?date=2025-07-26
 *
 * Response Keys:
 * - LunarYear: Lunar year in traditional Chinese with zodiac (e.g. "癸卯年，兔")
 * - LunarDate: Lunar date in traditional Chinese (e.g. "六月初二")
 *
 * Documentation:
 *
 * REQ0401
 */

import { FastMCP } from 'fastmcp'
import { z } from 'zod'

export const USER_AGENT = 'weather-app/1.0'

export async function makeLunarDateRequest({ date }: { date: string }) {
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    throw new Error('Date must be in YYYY-MM-DD format')
  }

  // Parse the date to validate it
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date')
  }

  // Validate date range (current year + 2 years)
  const currentYear = new Date().getFullYear()
  const inputYear = parsedDate.getFullYear()
  if (inputYear < currentYear || inputYear > currentYear + 2) {
    throw new Error(
      `Date must be between ${currentYear} and ${currentYear + 2}`
    )
  }

  const baseUrl =
    'https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php'
  const params = new URLSearchParams({
    date
  })

  const url = `${baseUrl}?${params.toString()}`

  const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' }

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
    name: 'lunardate',
    description: `
Gregorian-Lunar Calendar Conversion API Request

 Parameters:
 - date: Gregorian date to convert (YYYY-MM-DD format)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php?date=2025-07-26

 Response Keys:
 - LunarYear: Lunar year in traditional Chinese with zodiac (e.g. "癸卯年，兔")
 - LunarDate: Lunar date in traditional Chinese (e.g. "六月初二")
    `,
    parameters: z.object({
      date: z.string().describe('Gregorian date to convert (YYYY-MM-DD format)')
    }),
    execute: async (args) => {
      const result = await makeLunarDateRequest(args)
      return result || '<error>nothing returned</error>'
    }
  })
}
