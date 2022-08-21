async () => {
  // const dbf = await npm.dbffile.DBFFile.open('./dbf/BEHA.DBF');
  // const records = await dbf.readRecords(100);
  // const r = db.pg.select('Country');
  const r = await api.registry.selectCity({ fields: ['*'], conditions: [] });
  // const r = db.pg.insert('City', { name: 'Wuppertal', countryId: 2, cod: 2 });
  return r;
};
