#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { z } from "zod";
import helloworld, { makeFndRequest } from "./lib/makeFndRequest.js";
import { makeRhrreadRequest } from "./lib/makeRhrreadRequest.js";
import { makeFlwRequest } from "./lib/makeFlwRequest.js";
import { makeWarningInfoRequest } from "./lib/makeWarningInfoRequest.js";
import { makeWarnsumRequest } from "./lib/makeWarnsumRequest.js";
import { makeSwtRequest } from "./lib/makeSwtRequest.js";
import { makeQemRequest } from "./lib/makeQemRequest.js";
import { makeFeltEarthquakeRequest } from "./lib/makeFeltEarthquakeRequest.js";
import { makeHhotRequest } from "./lib/makeHhotRequest.js";
import { makeHltRequest } from "./lib/makeHltRequest.js";
import { makeSrsRequest } from "./lib/makeSrsRequest.js";
import { makeMrsRequest } from "./lib/makeMrsRequest.js";
import { makeLunarDateRequest } from "./lib/makeLunarDateRequest.js";
import { makeLhlRequest } from "./lib/makeLhlRequest.js";
import { makeLtmvRequest } from "./lib/makeLtmvRequest.js";
import { makeClmTempRequest } from "./lib/makeClmTempRequest.js";
import { makeRyesRequest } from "./lib/makeRyesRequest.js";
import { makeClmMinTempRequest } from "./lib/makeClmMinTempRequest.js";
import { makeHourlyRainfallRequest } from "./lib/makeHourlyRainfallRequest.js";

const server = new FastMCP({
  name: "hk-transport-eta",
  version: "1.0.0",
});

// REQ0101
server.addTool({
  name: "fnd",
  description: "9-day Weather Forecast (fnd) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeFndRequest();
    return result || "<error>nothing returned</error>";
  },
});

// REQ0102
server.addTool({
  name: "rhrread",
  description: "Current Weather Report",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeRhrreadRequest();
    return result || "<error>nothing returned</error>";
  },
});

// REQ0103
server.addTool({
  name: "flw",
  description: "Local Weather Forecast (flw) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeFlwRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0104
server.addTool({
  name: "warningInfo",
  description: "Weather Warning Information (warningInfo) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeWarningInfoRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0105
server.addTool({
  name: "warnsum",
  description: "Weather Warning Summary (warnsum) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeWarnsumRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0106
server.addTool({
  name: "swt",
  description: "Special Weather Tips (swt) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeSwtRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0201
server.addTool({
  name: "qem",
  description: "Quick Earthquake Messages (qem) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeQemRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0202
server.addTool({
  name: "feltearthquake",
  description: "Locally Felt Earth Tremor Report (feltearthquake) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeFeltEarthquakeRequest(args.lang);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0301
server.addTool({
  name: "hhhot",
  description: "Hourly Heights of Astronomical Tides (HHOT) API Request",
  parameters: z.object({
    station: z.string(),
    year: z.number(),
    month: z.number().optional(),
    day: z.number().optional(),
    hour: z.number().optional(),
    rformat: z.string().default("json"),
  }),
  execute: async (args) => {
    const result = await makeHhotRequest(args);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0302
server.addTool({
  name: "hlt",
  description:
    "Times and Heights of Astronomical High and Low Tides (HLT) API Request",
  parameters: z.object({
    station: z.string(),
    year: z.number(),
    month: z.number().optional(),
    day: z.number().optional(),
    hour: z.number().optional(),
    rformat: z.string().default("json"),
  }),
  execute: async (args) => {
    const result = await makeHltRequest(args);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0303
server.addTool({
  name: "srs",
  description: "Times of Sunrise/Sunset (SRS) API Request",
  parameters: z.object({
    year: z.number(),
    month: z.number().optional(),
    day: z.number().optional(),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeSrsRequest(args);
    return result || "<error>nothing returned</error>";
  },
});

// REQ0304
server.addTool({
  name: "mrs",
  description: "Times of Moonrise/Moonset (MRS) API Request",
  parameters: z.object({
    year: z.number(),
    month: z.number().optional(),
    day: z.number().optional(),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeMrsRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0401
server.addTool({
  name: "lunardate",
  description: "Gregorian-Lunar Calendar Conversion API Request",
  parameters: z.object({
    date: z.string(),
  }),
  execute: async (args) => {
    const result = await makeLunarDateRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0501
server.addTool({
  name: "hourlyrainfall",
  description:
    "Rainfall in the Past Hour from Automatic Weather Station API Request",
  parameters: z.object({
    lang: z.string().default("en"),
  }),
  execute: async (args) => {
    const result = await makeHourlyRainfallRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0306
server.addTool({
  name: "lhl",
  description:
    "Cloud-to-Ground and Cloud-to-Cloud Lightning Count (LHL) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeLhlRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0307
server.addTool({
  name: "ltmv",
  description: "Latest 10-minute Mean Visibility (LTMV) API Request",
  parameters: z.object({
    lang: z.string().default("en"),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeLtmvRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0308
server.addTool({
  name: "clmtemp",
  description: "Daily Mean Temperature (CLMTEMP) API Request",
  parameters: z.object({
    station: z.string(),
    year: z.number(),
    month: z.number().optional(),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeClmTempRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0309
import { makeClmMaxTempRequest } from "./lib/makeClmMaxTempRequest.js";

server.addTool({
  name: "clmmaxt",
  description: "Daily Maximum Temperature (CLMMAXT) API Request",
  parameters: z.object({
    station: z.string(),
    year: z.number(),
    month: z.number().optional(),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeClmMaxTempRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0310
server.addTool({
  name: "clmmin",
  description: "Daily Minimum Temperature (CLMMINT) API Request",
  parameters: z.object({
    station: z.string(),
    year: z.number(),
    month: z.number().optional(),
    rformat: z.string().default("csv"),
  }),
  execute: async (args) => {
    const result = await makeClmMinTempRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
// REQ0311
server.addTool({
  name: "ryes",
  description: "Weather and Radiation Level Report (RYES) API Request",
  parameters: z.object({
    date: z.string(),
    lang: z.string().default("en"),
    station: z.string(),
  }),
  execute: async (args) => {
    const result = await makeRyesRequest(args);
    return result || "<error>nothing returned</error>";
  },
});
server.addTool({
  name: "get-route",
  description:
    "Get route detail with route number, Avaliable transport: bus, minibus, mtr (use 'mtr_hr' as input), light rail. Return list of route with company, route, routeType, dir, orig, dest, stopList, routeId, description. stopList is a list of stop with id, name, lat, long.",
  parameters: z.object({
    routeNo: z.string(),
  }),
  execute: async (args) => {
    return helloworld();
  },
});

server.addTool({
  name: "get-eta",
  description:
    "Get ETA (Estimated Time of Arrival) from a stop, parameters can retrive from `get-route`. Special case for parameter `dir`: when company is `mtr_hr`, use `UT` as value if travel from `orig` to `dest`, use `DT` as value if travel from `dest` to `orig`. Return eta in minutes and remark for special information.",
  parameters: z.object({
    company: z.string(),
    routeId: z.string(),
    stop: z.string(),
    routeType: z.string(),
    dir: z.string(),
  }),
  execute: async (args) => {
    let responseText = await fetch(
      `https://siri-shortcut-hk-bus-eta.pages.dev/api/eta`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([args]),
      }
    ).then((res) => res.text());
    return responseText;
  },
});

server.start({
  transportType: "stdio",
});

process.on("uncaughtException", (error) => {
  console.error(
    `[mcp-hkbus] exception: ${
      error instanceof Error ? error.stack : String(error)
    }`
  );
});
