({
  host: '127.0.0.1',
  port: 5432,
  database: 'termin',
  user: 'admin',
  password: 'admin',
  get uri() {
    return `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
  },
});
