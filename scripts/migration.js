'use strict';

const path = require('node:path');
const fsp = require('node:fs').promises;
const { Client } = require('pg');
const { loadConf } = require('./utils.js');

const migrate = async (conf) => {
  const client = new Client({ connectionString: conf.uri });
  const sqlPath = path.join(
    process.cwd(),
    'application',
    'schemas',
    'migration.sql',
  );
  try {
    const sql = await fsp.readFile(sqlPath, { encoding: 'utf8' });
    if (!sql) {
      console.warn(
        'Warn: migration.sql is empty ' +
          'application can not work properly' +
          ' if migration required',
      );
      return;
    }
    await client.connect();
    await client.query(sql);
    console.log(`Migration succeed db "${conf.database}"`);
  } catch (error) {
    console.log(`Error: During migration db "${conf.database}"`);
    console.error(error.stack);
    await client.end();
    process.exit(1);
  }
  await client.end();
};

(async () => {
  const conf = await loadConf();
  await migrate(conf);
})();
