CREATE TABLE "Role" (
  "roleId" bigint generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "Role" ADD CONSTRAINT "pkRole" PRIMARY KEY ("roleId");
CREATE UNIQUE INDEX "akRoleName" ON "Role" ("name");
CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "login" varchar(64) NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountLogin" ON "Account" ("login");

CREATE TABLE "AccountRole" (
  "accountId" bigint NOT NULL,
  "roleId" bigint NOT NULL
);

ALTER TABLE "AccountRole" ADD CONSTRAINT "pkAccountRole" PRIMARY KEY ("accountId", "roleId");
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleRole" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE CASCADE;
CREATE TABLE "Action" (
  "actionId" bigint generated always as identity,
  "date" timestamp with time zone NOT NULL,
  "comment" varchar NOT NULL
);

ALTER TABLE "Action" ADD CONSTRAINT "pkAction" PRIMARY KEY ("actionId");
CREATE TABLE "Doctor" (
  "doctorId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "nameUk" varchar NOT NULL DEFAULT '',
  "nameRu" varchar NOT NULL DEFAULT '',
  "specialization" varchar NOT NULL DEFAULT '',
  "specializationUk" varchar NOT NULL DEFAULT '',
  "specializationRu" varchar NOT NULL DEFAULT '',
  "cod" integer NOT NULL DEFAULT 0,
  "Image" varchar NOT NULL DEFAULT ''
);

ALTER TABLE "Doctor" ADD CONSTRAINT "pkDoctor" PRIMARY KEY ("doctorId");
CREATE TABLE "Reason" (
  "reasonId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "duration" integer NOT NULL
);

ALTER TABLE "Reason" ADD CONSTRAINT "pkReason" PRIMARY KEY ("reasonId");
CREATE TABLE "Patient" (
  "patientId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "surname" varchar NOT NULL,
  "gender" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "birthDate" timestamp with time zone NOT NULL,
  "cod" integer NOT NULL
);

ALTER TABLE "Patient" ADD CONSTRAINT "pkPatient" PRIMARY KEY ("patientId");
CREATE TABLE "Termin" (
  "terminId" bigint generated always as identity,
  "patientId" bigint NOT NULL,
  "doctorId" bigint NOT NULL,
  "duration" integer NOT NULL,
  "startTime" timestamp with time zone NOT NULL,
  "endTime" timestamp with time zone NOT NULL,
  "date" date NOT NULL,
  "created" timestamp with time zone NOT NULL,
  "modified" timestamp with time zone NOT NULL,
  "recalled" boolean NOT NULL DEFAULT false,
  "completed" boolean NOT NULL DEFAULT false,
  "approved" boolean NOT NULL DEFAULT false
);

ALTER TABLE "Termin" ADD CONSTRAINT "pkTermin" PRIMARY KEY ("terminId");
ALTER TABLE "Termin" ADD CONSTRAINT "fkTerminPatient" FOREIGN KEY ("patientId") REFERENCES "Patient" ("patientId");
ALTER TABLE "Termin" ADD CONSTRAINT "fkTerminDoctor" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("doctorId");

CREATE TABLE "TerminReason" (
  "terminId" bigint NOT NULL,
  "reasonId" bigint NOT NULL
);

ALTER TABLE "TerminReason" ADD CONSTRAINT "pkTerminReason" PRIMARY KEY ("terminId", "reasonId");
ALTER TABLE "TerminReason" ADD CONSTRAINT "fkTerminReasonTermin" FOREIGN KEY ("terminId") REFERENCES "Termin" ("terminId") ON DELETE CASCADE;
ALTER TABLE "TerminReason" ADD CONSTRAINT "fkTerminReasonReason" FOREIGN KEY ("reasonId") REFERENCES "Reason" ("reasonId") ON DELETE CASCADE;

CREATE TABLE "TerminAction" (
  "terminId" bigint NOT NULL,
  "actionId" bigint NOT NULL
);

ALTER TABLE "TerminAction" ADD CONSTRAINT "pkTerminAction" PRIMARY KEY ("terminId", "actionId");
ALTER TABLE "TerminAction" ADD CONSTRAINT "fkTerminActionTermin" FOREIGN KEY ("terminId") REFERENCES "Termin" ("terminId") ON DELETE CASCADE;
ALTER TABLE "TerminAction" ADD CONSTRAINT "fkTerminActionAction" FOREIGN KEY ("actionId") REFERENCES "Action" ("actionId") ON DELETE CASCADE;
CREATE TABLE "Calendar" (
  "calendarId" bigint generated always as identity,
  "date" date NOT NULL,
  "startTime" timestamp with time zone NOT NULL,
  "endTime" timestamp with time zone NOT NULL,
  "breakStart" timestamp with time zone NOT NULL,
  "breakEnd" timestamp with time zone NOT NULL,
  "doctorId" bigint NOT NULL
);

ALTER TABLE "Calendar" ADD CONSTRAINT "pkCalendar" PRIMARY KEY ("calendarId");
ALTER TABLE "Calendar" ADD CONSTRAINT "fkCalendarDoctor" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("doctorId");

CREATE TABLE "CalendarTermin" (
  "calendarId" bigint NOT NULL,
  "terminId" bigint NOT NULL
);

ALTER TABLE "CalendarTermin" ADD CONSTRAINT "pkCalendarTermin" PRIMARY KEY ("calendarId", "terminId");
ALTER TABLE "CalendarTermin" ADD CONSTRAINT "fkCalendarTerminCalendar" FOREIGN KEY ("calendarId") REFERENCES "Calendar" ("calendarId") ON DELETE CASCADE;
ALTER TABLE "CalendarTermin" ADD CONSTRAINT "fkCalendarTerminTermin" FOREIGN KEY ("terminId") REFERENCES "Termin" ("terminId") ON DELETE CASCADE;
CREATE TABLE "Country" (
  "countryId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "cod" integer NOT NULL
);

ALTER TABLE "Country" ADD CONSTRAINT "pkCountry" PRIMARY KEY ("countryId");
CREATE UNIQUE INDEX "akCountryName" ON "Country" ("name");
CREATE TABLE "City" (
  "cityId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "countryId" bigint NOT NULL,
  "cod" integer NOT NULL
);

ALTER TABLE "City" ADD CONSTRAINT "pkCity" PRIMARY KEY ("cityId");
CREATE UNIQUE INDEX "akCityName" ON "City" ("name");
ALTER TABLE "City" ADD CONSTRAINT "fkCityCountry" FOREIGN KEY ("countryId") REFERENCES "Country" ("countryId");
CREATE TABLE "DoctorsSchedule" (
  "doctorsScheduleId" bigint generated always as identity,
  "doctorId" bigint NOT NULL,
  "date" date NOT NULL,
  "startTime" timestamp with time zone NOT NULL,
  "endTime" timestamp with time zone NOT NULL
);

ALTER TABLE "DoctorsSchedule" ADD CONSTRAINT "pkDoctorsSchedule" PRIMARY KEY ("doctorsScheduleId");
ALTER TABLE "DoctorsSchedule" ADD CONSTRAINT "fkDoctorsScheduleDoctor" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("doctorId");
CREATE TABLE "Session" (
  "sessionId" bigint generated always as identity,
  "accountId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" inet NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "Session" ADD CONSTRAINT "pkSession" PRIMARY KEY ("sessionId");
ALTER TABLE "Session" ADD CONSTRAINT "fkSessionAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId");
CREATE UNIQUE INDEX "akSessionToken" ON "Session" ("token");