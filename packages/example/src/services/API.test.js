import initAPI from './API';
import FULL_CONFIG from '../config/test/config';
import {
  flattenSwagger,
  getSwaggerOperations,
} from '@whook/http-router/dist/utils';

describe('API', () => {
  const { CONFIG, NODE_ENV, DEBUG_NODE_ENVS } = FULL_CONFIG;
  const log = jest.fn();

  beforeEach(() => {
    log.mockReset();
  });

  it('should work', async () => {
    const API = await initAPI({
      log,
      CONFIG,
      NODE_ENV,
      DEBUG_NODE_ENVS,
      API_VERSION: '1.1.0',
    });

    expect({
      API,
      logCalls: log.mock.calls.filter(args => 'stack' !== args[0]),
    }).toMatchSnapshot();
  });

  it('should always have the same amount of public endpoints', async () => {
    const API = await initAPI({
      log,
      CONFIG,
      NODE_ENV,
      DEBUG_NODE_ENVS,
      API_VERSION: '1.1.0',
    });
    const operations = await getSwaggerOperations(await flattenSwagger(API));

    expect(
      operations
        .filter(
          operation => !operation['x-whook'] || !operation['x-whook'].private,
        )
        .map(({ method, path }) => `${method} ${path}`)
        .sort(),
    ).toMatchSnapshot();
  });
});