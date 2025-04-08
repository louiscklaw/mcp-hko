import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { makeRhrreadRequest } from './lib/makeRhrreadRequest.js';
import { formaRhrreadtResponse } from './lib/formaRhrreadtResponse.js';
import { flwUrl, rhrreadUrl } from './urls.js';
import { ImakeRhrreadResponse } from './types/ImakeRhrreadResponse.js';
import { ImakeFlwResponse } from './types/ImakeFlwResponse.js';
import { makeFlwRequest } from './lib/makeFlwRequest.js';
import { formatFlwResponse } from './lib/formatFlwResponse.js';
// import { formatFlwResponse } from './formatFlwResponse.ts.del';

export const USER_AGENT = 'weather-app/1.0';

// Create server instance
const server = new McpServer({
  name: 'hko-mcp',
  version: '1.0.0',
});

// Register weather tools
server.tool('get-weather', 'Get current weather of Hong Kong', {}, async () => {
  const response = await makeRhrreadRequest<ImakeRhrreadResponse>(rhrreadUrl);
  const result = formaRhrreadtResponse(response);

  return {
    content: [{ type: 'text', text: result }],
  };
});

// Register weather tools
server.tool(
  'get-weather-forcast',
  'Get weather forcast of Hong Kong',
  {},
  async () => {
    const response = await makeFlwRequest<ImakeFlwResponse>(flwUrl);
    const result = formatFlwResponse(response);

    return {
      content: [{ type: 'text', text: result }],
    };
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});

// original

/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

// Please see the comment in the .eslintrc.json file about the suppressed rule!
// Below is an example of how to use ESLint errors suppression. You can read more
// at https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export async function greeter(name: any) {
  // The name parameter should be of type string. Any is used only to trigger the rule.
  return await delayedHello(name, Delays.Long);
}
