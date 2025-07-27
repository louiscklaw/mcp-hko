#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { z } from "zod";
import helloworld, { makeFndRequest } from "./lib/makeFndRequest.js";
const server = new FastMCP({
    name: "hk-transport-eta",
    version: "1.0.0",
});
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
server.addTool({
    name: "get-route",
    description: "Get route detail with route number, Avaliable transport: bus, minibus, mtr (use 'mtr_hr' as input), light rail. Return list of route with company, route, routeType, dir, orig, dest, stopList, routeId, description. stopList is a list of stop with id, name, lat, long.",
    parameters: z.object({
        routeNo: z.string(),
    }),
    execute: async (args) => {
        return helloworld();
    },
});
server.addTool({
    name: "get-eta",
    description: "Get ETA (Estimated Time of Arrival) from a stop, parameters can retrive from `get-route`. Special case for parameter `dir`: when company is `mtr_hr`, use `UT` as value if travel from `orig` to `dest`, use `DT` as value if travel from `dest` to `orig`. Return eta in minutes and remark for special information.",
    parameters: z.object({
        company: z.string(),
        routeId: z.string(),
        stop: z.string(),
        routeType: z.string(),
        dir: z.string(),
    }),
    execute: async (args) => {
        let responseText = await fetch(`https://siri-shortcut-hk-bus-eta.pages.dev/api/eta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([args]),
        }).then((res) => res.text());
        return responseText;
    },
});
server.start({
    transportType: "stdio",
});
process.on("uncaughtException", (error) => {
    console.error(`[mcp-hkbus] exception: ${error instanceof Error ? error.stack : String(error)}`);
});
