const sqlite = require('sqlite3');
const db = new sqlite.Database('Travel.db');

const CreateTripTable = `CREATE TABLE IF NOT EXISTS Trip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination TEXT NOT NULL,
    location TEXT NOT NULL,
    continet TEXT NOT NULL,
    language TEXT NOT NULL,
    description TEXT DEFAULT 0,
    flightCost REAL DEFAULT 0,
    hotelCost REAL DEFAULT 0,
    foodCost REAL DEFAULT 0,
    visacost REAL DEFAULT 0,
    currencycode TEXT DEFAULT 'N/A'
)`;

const CreateUserTable = `CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
)`;

module.exports = { 
    db, 
    CreateTripTable,
    CreateUserTable
};
