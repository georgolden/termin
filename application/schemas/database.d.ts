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
  nameUk: string;
  nameRu: string;
  specialization: string;
  specializationUk: string;
  specializationRu: string;
  cod: number;
  Image: string;
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
  cod: number;
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
  cod: number;
  countryId?: string;
}

interface City {
  name: string;
  countryId: string;
  cod: number;
  cityId?: string;
}

interface Session {
  accountId: string;
  token: string;
  ip: string;
  data: string;
  sessionId?: string;
}
