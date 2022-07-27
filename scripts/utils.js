'use strict';

const path = require('node:path');
const { readScript, createContext } = require('metavm');

const loadConf = async () => {
  const pgConfPath = path.join(
    process.cwd(),
    'application',
    'config',
    'database.js',
  );
  const context = createContext({ process });
  const { exports } = await readScript(pgConfPath, { context }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
  return exports;
};

module.exports = { loadConf };
