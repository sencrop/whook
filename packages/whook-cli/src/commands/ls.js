import { extra, autoService, SPECIAL_PROPS } from 'knifecycle';
import { readdir } from 'fs';
import { readArgs } from '../libs/args';
import YError from 'yerror';
import path from 'path';
import os from 'os';

// Needed to avoid messing up babel builds 🤷
const _require = require;

export const definition = {
  description: 'Print available commands',
  example: `whook ls`,
  arguments: {
    type: 'object',
    additionalProperties: false,
    properties: {
      verbose: {
        type: 'boolean',
      },
    },
  },
};

export default extra(definition, autoService(initLsCommand));

async function initLsCommand({
  CONFIG,
  PROJECT_SRC,
  WHOOK_PLUGINS,
  WHOOK_PLUGINS_PATHS,
  readDir = _readDir,
  log,
  promptArgs,
  EOL = os.EOL,
  require = _require,
}) {
  return async () => {
    const { verbose } = readArgs(definition.arguments, await promptArgs());
    const commandsSources = [CONFIG.name || 'project', ...WHOOK_PLUGINS];
    const commandsPaths = [PROJECT_SRC, ...WHOOK_PLUGINS_PATHS];
    const pluginsDefinitions = await Promise.all(
      commandsPaths.map(async (pluginPath, i) => {
        try {
          return {
            plugin: commandsSources[i],
            commands: (await readDir(path.join(pluginPath, 'commands')))
              .filter(
                file =>
                  file !== '..' && file !== '.' && !file.endsWith('.test.js'),
              )
              .map(file => path.join(pluginPath, 'commands', file))
              .map(file => require(file))
              .map(({ definition, default: initializer }) => ({
                definition,
                name: initializer[SPECIAL_PROPS.NAME].replace(/Command$/, ''),
              })),
          };
        } catch (err) {
          log('debug', `✅ - No commands folder found at path ${pluginPath}`);
          log('stack', err.stack);
          return {
            plugin: commandsSources[i],
            commands: [],
          };
        }
      }),
    );

    pluginsDefinitions.forEach(({ plugin, commands }) => {
      log(
        'info',
        `${EOL}${EOL}# Provided by "${plugin}": ${
          commands.length === 0 ? 'none' : `${commands.length} commands`
        }${verbose ? EOL : ''}`,
      );
      commands.forEach(({ name, definition }) => {
        log(
          'info',
          `- ${name}: ${definition.description}${
            verbose && definition.example
              ? `${EOL}$ ${definition.example}${EOL}`
              : ''
          }`,
        );
      });
    });
  };
}

async function _readDir(dir) {
  return new Promise((resolve, reject) => {
    readdir(dir, (err, files) => {
      if (err) {
        reject(YError.wrap('E_BAD_PLUGIN_DIR', dir));
        return;
      }
      resolve(files);
    });
  });
}
