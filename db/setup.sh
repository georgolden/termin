PGPASSWORD=admin psql -h 127.0.0.1 -f install.sql -U postgres
PGPASSWORD=admin psql -h 127.0.0.1 -d application -f ../db/application/schemas/database.sql -U admin
