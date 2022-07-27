({ birthDate }) => {
  return db.pg.select('Patient', ['*'], { birthDate });
};
