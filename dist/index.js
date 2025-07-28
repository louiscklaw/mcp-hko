#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import addFnd from "./lib/makeFndRequest.js";
import addRhrread from "./lib/makeRhrreadRequest.js";
import addFlw from "./lib/makeFlwRequest.js";
import addWarningInfo from "./lib/makeWarningInfoRequest.js";
import addWarnsum from "./lib/makeWarnsumRequest.js";
import addSwt from "./lib/makeSwtRequest.js";
import addQem from "./lib/makeQemRequest.js";
import addFeltEarthquake from "./lib/makeFeltEarthquakeRequest.js";
import addHhot from "./lib/makeHhotRequest.js";
import addSrs from "./lib/makeSrsRequest.js";
import addLtmv from "./lib/makeLtmvRequest.js";
import addRyes from "./lib/makeRyesRequest.js";
import addClmMinTemp from "./lib/makeClmMinTempRequest.js";
import addHourlyRainfall from "./lib/makeHourlyRainfallRequest.js";
import addHlt from "./lib/makeHltRequest.js";
import addLunarDate from "./lib/makeLunarDateRequest.js";
import addLhl from "./lib/makeLhlRequest.js";
import addClmTemp from "./lib/makeClmTempRequest.js";
import addClmMaxTemp from "./lib/makeClmMaxTempRequest.js";
import addMrs from "./lib/makeMrsRequest.js";
//
//
//
//
const server = new FastMCP({ name: "mcp-hko", version: "1.0.0" });
// REQ0101
addFnd(server);
// REQ0102
addRhrread(server);
// REQ0103
addFlw(server);
// REQ0104
addWarningInfo(server);
// REQ0105
addWarnsum(server);
// REQ0106
addSwt(server);
// REQ0201
addQem(server);
// REQ0202
addFeltEarthquake(server);
// REQ0301
addHhot(server);
// REQ0302
addHlt(server);
// REQ0303
addSrs(server);
// REQ0304
addMrs(server);
// REQ0306
addLhl(server);
// REQ0307
addLtmv(server);
// REQ0308
addClmTemp(server);
// REQ0309
addClmMaxTemp(server);
// REQ0310
addClmMinTemp(server);
// REQ0311
addRyes(server);
// REQ0401
addLunarDate(server);
// REQ0501
addHourlyRainfall(server);
//
//
//
//
server.start({ transportType: "stdio" });
process.on("uncaughtException", (error) => {
    console.error(`[mcp-hko] exception: ${error instanceof Error ? error.stack : String(error)}`);
});
