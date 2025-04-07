import { describe, it, afterEach, beforeEach, vi, expect } from 'vitest';
import { makeFlwRequest } from '../../src/lib/makeFlwRequest.js';
import { formatFlwResponse } from '../../src/lib/formatFlwResponse.js';
import { flwUrl, rhrreadUrl } from '../../src/urls.js';
import { ImakeRhrreadResponse } from '../../src/types/ImakeRhrreadResponse.js';
import { ImakeFlwResponse } from '../../src/types/ImakeFlwResponse.js';

describe('makeFlwRequest.test', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Assert if setTimeout was called properly
  it('should handle successful API response with all required fields', async () => {
    // Mock the API response
    const mockResponse = {
      generalSituation:
        'An easterly airstream is affecting the coast of Guangdong gradually. Meanwhile, a band of clouds is covering western Guangdong.',
      tcInfo: '',
      fireDangerWarning: '',
      forecastPeriod: 'Weather forecast for today',
      forecastDesc:
        'Mainly cloudy. The minimum temperature will be about 19 degrees in the morning. Sunny periods during the day with a maximum temperature of around 24 degrees. Moderate easterly winds.',
      outlook:
        'Becoming humid with sunny intervals in the following few days. Rather warm during the day.',
      updateTime: '2025-04-07T02:45:00+08:00',
    };

    // Mock the fetch function to return the response body
    vi.spyOn(global, 'fetch').mockReturnValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    // Call the makeFlwRequest function
    const response = await makeFlwRequest<ImakeFlwResponse>(flwUrl);

    // Assert that the response is not null
    expect(response).not.toBeNull();

    // Assert that the response has all the required fields
    expect(response).toHaveProperty('generalSituation');
    expect(response).toHaveProperty('tcInfo');
    expect(response).toHaveProperty('fireDangerWarning');
    expect(response).toHaveProperty('forecastPeriod');
    expect(response).toHaveProperty('forecastDesc');
    expect(response).toHaveProperty('outlook');
    expect(response).toHaveProperty('updateTime');

    // Assert that the response values match the expected values
    expect(response.generalSituation).toBe(mockResponse.generalSituation);
    expect(response.tcInfo).toBe(mockResponse.tcInfo);
    expect(response.fireDangerWarning).toBe(mockResponse.fireDangerWarning);
    expect(response.forecastPeriod).toBe(mockResponse.forecastPeriod);
    expect(response.forecastDesc).toBe(mockResponse.forecastDesc);
    expect(response.outlook).toBe(mockResponse.outlook);
    expect(response.updateTime).toBe(mockResponse.updateTime);
  });

  it('should handle API response with optional fields', async () => {
    // Mock the API response with optional fields
    const mockResponse = {
      generalSituation:
        'An easterly airstream is affecting the coast of Guangdong gradually. Meanwhile, a band of clouds is covering western Guangdong.',
      tcInfo: 'Tropical Cyclone Warning Signal No. 3 is in force.',
      fireDangerWarning: 'Fire Danger Warning: High',
      forecastPeriod: 'Weather forecast for today',
      forecastDesc:
        'Mainly cloudy. The minimum temperature will be about 19 degrees in the morning. Sunny periods during the day with a maximum temperature of around 24 degrees. Moderate easterly winds.',
      outlook:
        'Becoming humid with sunny intervals in the following few days. Rather warm during the day.',
      updateTime: '2025-04-07T02:45:00+08:00',
    };

    // Mock the fetch function to return the response body
    vi.spyOn(global, 'fetch').mockReturnValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    // Call the makeFlwRequest function
    const response = await makeFlwRequest<ImakeFlwResponse>(flwUrl);

    // Assert that the response is not null
    expect(response).not.toBeNull();

    // Assert that the response has all the required fields
    expect(response).toHaveProperty('generalSituation');
    expect(response).toHaveProperty('tcInfo');
    expect(response).toHaveProperty('fireDangerWarning');
    expect(response).toHaveProperty('forecastPeriod');
    expect(response).toHaveProperty('forecastDesc');
    expect(response).toHaveProperty('outlook');
    expect(response).toHaveProperty('updateTime');

    // Assert that the response values match the expected values
    expect(response.generalSituation).toBe(mockResponse.generalSituation);
    expect(response.tcInfo).toBe(mockResponse.tcInfo);
    expect(response.fireDangerWarning).toBe(mockResponse.fireDangerWarning);
    expect(response.forecastPeriod).toBe(mockResponse.forecastPeriod);
    expect(response.forecastDesc).toBe(mockResponse.forecastDesc);
    expect(response.outlook).toBe(mockResponse.outlook);
    expect(response.updateTime).toBe(mockResponse.updateTime);
  });

  it('should handle API error response', async () => {
    vi.spyOn(global, 'fetch').mockReturnValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as any);

    await expect(makeFlwRequest<ImakeFlwResponse>(flwUrl)).resolves.toBeNull();

    // expect(1).toBe(2);
  });
});
