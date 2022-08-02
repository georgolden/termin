interface Role {
  name: string;
  roleId?: string;
}

interface Account {
  login: string;
  password: string;
  rolesId: string[];
  accountId?: string;
}

interface Action {
  date: string;
  comment: string;
  actionId?: string;
}

interface Doctor {
  name: string;
  doctorId?: string;
}

interface Reason {
  name: string;
  duration: number;
  reasonId?: string;
}

interface Patient {
  name: string;
  surname: string;
  gender: string;
  phone: string;
  birthDate: string;
  patientId?: string;
}

interface Termin {
  reasonId: string[];
  patientId: string;
  doctorId: string;
  duration: number;
  startTime: string;
  endTime: string;
  date: string;
  created: string;
  modified: string;
  recalled: boolean;
  completed: boolean;
  approved: boolean;
  actionsId: string[];
  terminId?: string;
}

interface Calendar {
  date: string;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  doctorId: string;
  terminsId?: string[];
  calendarId?: string;
}

interface Country {
  name: string;
  countryId?: string;
}

interface City {
  name: string;
  countryId: string;
  cityId?: string;
}

interface Session {
  accountId: string;
  token: string;
  ip: string;
  data: string;
  sessionId?: string;
}
