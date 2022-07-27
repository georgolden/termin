async () => {
  if (application.worker.id === 'W1') {
    console.debug('Connect to pg');
    console.dir({ city: application.schemas.model.entities.get('City') });
  }
  const options = { ...config.database, console };
  db.pg = new metarhia.metasql.Database(options);
};
