async () => {
  const dbf = await npm.dbffile.DBFFile.open('./dbf/BEHA.DBF');
  const records = await dbf.readRecords(100);
  const doctors = records.map((item) => ({
    cod: item.BEHA,
    name: item.NAME,
  }));
  let doctorsDB;
  for (const doctor of doctors) {
    doctorsDB = await api.registry.selectDoctor({
      fields: ['*'],
      conditions: [{ cod: doctor.cod }],
    });
    if (doctorsDB.length === 0) {
      doctorsDB = await api.registry.createDoctor({
        name: doctor.name,
        cod: doctor.cod,
      });
    }
    doctor.doctorid = doctorsDB[0].doctorid;
    doctor.name = doctorsDB[0].name;
    doctor.nameUk = doctorsDB[0].nameUk;
    doctor.nameRu = doctorsDB[0].nameRu;
    doctor.specialization = doctorsDB[0].specialization;
    doctor.specializationUk = doctorsDB[0].specializationUk;
    doctor.specializationRu = doctorsDB[0].specializationRu;
  }
  // const r = db.pg.select('Country');
  //   const r = await api.registry.selectCity({ fields: ['*'], conditions: [] });
  // const r = db.pg.insert('City', { name: 'Wuppertal', countryId: 2, cod: 2 });
  return doctors;
};
