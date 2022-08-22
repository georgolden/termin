async () => {
  // const dbf = await npm.dbffile.DBFFile.open('./dbf/BEHA.DBF');
  // const records = await dbf.readRecords(100);
  // const r = db.pg.select('Country');
  // const r = await api.registry.selectCity({ fields: ['*'], conditions: [] });
  // const r = db.pg.insert('City', { name: 'Wuppertal', countryId: 2, cod: 2 });
  const dbf = await npm.dbffile.DBFFile.open('./dbf/PATIENT.DBF');
  const records = await dbf.readRecords();
  for (const record of records) {
    await api.registry.createPatient({
      name: record.NAME,
      surname: record.VORNAME,
      cod: record.PK,
      gender:
        record.GESCHLECHT === 'W'
          ? 'Female'
          : record.GESCHLECHT === 'M'
          ? 'Male'
          : 'Other',
      birthDate: record.GEBDATP,
      phone: record.TELEFON,
    });
  }
  return records;
};
