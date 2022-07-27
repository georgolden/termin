({
  Entity: {},

  date: 'date',
  startTime: 'datetime',
  endTime: 'datetime',
  breakStart: 'datetime',
  breakEnd: 'datetime',
  doctor: 'Doctor',
  termins: { many: 'Termin', required: false },
});
