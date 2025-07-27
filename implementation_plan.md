# Implementation Plan for REQ0401 and REQ0501

## Current Status
- REQ0401 (Gregorian-Lunar Calendar Conversion) is already implemented but incorrectly labeled as REQ0305 in the index.ts file
- REQ0501 (Rainfall in the Past Hour from Automatic Weather Station) is not yet implemented

## Tasks to Complete

### 1. Fix labeling for REQ0401
- Update the comment in src/index.ts for the lunardate tool from "REQ0305" to "REQ0401"

### 2. Implement REQ0501
Create a new library function `src/lib/makeHourlyRainfallRequest.ts` with:
- Function to fetch data from https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php
- Parameter validation for `lang` (en, tc, sc)
- Error handling
- Return JSON stringified response

### 3. Register the new tool in src/index.ts
- Import the new library function
- Add tool registration with:
  - name: "hourlyrainfall"
  - description: "Rainfall in the Past Hour from Automatic Weather Station API Request"
  - parameters: z.object({ lang: z.string().default("en") })
  - execute function calling the library function

## Library Function Implementation Details

For REQ0501, the library function should:
1. Accept a parameter object with optional `lang` property (default "en")
2. Validate the lang parameter against allowed values: "en", "tc", "sc"
3. Make HTTP request to the API endpoint with the lang parameter
4. Handle errors appropriately
5. Return the response as a JSON string

## Tool Registration Details

The tool registration should:
1. Import the new library function
2. Add a new server.addTool call with:
   - name: "hourlyrainfall"
   - description: "Rainfall in the Past Hour from Automatic Weather Station API Request"
   - parameters: z.object({ lang: z.string().default("en") })
   - execute: async function that calls the library function and handles errors
