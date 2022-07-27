({
  Entity: {},

  reason: { many: 'Reason' },
  patient: 'Patient',
  doctor: 'Doctor',
  duration: 'number',
  startTime: 'datetime',
  endTime: 'datetime',
  date: 'date',

  created: 'datetime',
  modified: 'datetime',

  recalled: { type: 'boolean', default: false },
  completed: { type: 'boolean', default: false },

  approved: { type: 'boolean', default: false },
  actions: { many: 'Action' },
});
