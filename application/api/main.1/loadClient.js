async () => {
  const dbf = await npm.dbffile.DBFFile.open('./dbf/PATIENT.DBF');
  const records = await dbf.readRecords(100);
  return records;
};
