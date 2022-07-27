'use strict';

const path = require('node:path');
const fsp = require('node:fs').promises;
const { Client } = require('pg');
const { loadConf } = require('./utils.js');

console.dir({ env: process.env });

const createDb = async (conf) => {
  console.dir({ conf });
  console.dir({ uri: process.env.PGROOTURI });
  const { user, database, password } = conf;
  const client = new Client({
    connectionString:
      process.env.PGROOTURI || 'postgresql://postgres:postgres@localhost:5432/',
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000,
  });
  try {
    await client.connect();
    await client
      .query(`CREATE USER ${user} WITH PASSWORD '${password}';`)
      .then(() => {
        console.log(`User "${user}" created successfully`);
      })
      .catch((err) => {
        const isUser = err.message === `role "${user}" already exists`;
        if (isUser) console.warn(`Warn: User "${user}" already exists`);
        else throw err;
      });
    await client
      .query(`CREATE DATABASE ${database} OWNER ${user};`)
      .then(() => {
        console.log(`Db "${database}" created successfully`);
      })
      .catch(async (err) => {
        const isDb = err.message === `database "${database}" already exists`;
        if (isDb) console.warn(`Warn: Db "${database}" already exists`);
        else throw err;
      });
  } catch (error) {
    console.log('Error: During database creation');
    console.error(error.stack);
    await client.end();
    process.exit(1);
  }
  await client.end();
};

const setupDb = async (conf) => {
  console.dir({ conf });
  console.dir({ uri: conf.uri });
  const client = new Client({
    connectionString: conf.uri,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000,
  });
  const sqlPath = path.join(
    process.cwd(),
    'application',
    'schemas',
    'database.sql',
  );
  try {
    const sql = await fsp.readFile(sqlPath, { encoding: 'utf8' });
    await client.connect();
    await client
      .query(sql)
      .then(() => {
        console.log('Database structure setup succeed');
      })
      .catch((err) => {
        if (err.message.includes('already exists')) {
          console.log(err);
          console.warn(`Error: Migration required for db "${conf.database}"`);
        } else throw err;
      });
  } catch (error) {
    console.log('Error: During database setup');
    console.error(error.stack);
    await client.end();
    process.exit(1);
  }
  await client.end();
};

(async () => {
  try {
    const conf = await loadConf();
    await createDb(conf);
    await setupDb(conf);
  } catch (error) {
    console.log('Error here');
    console.error(error);
  }
})();
