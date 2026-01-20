import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sutra.db');

export const initDB = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      contact TEXT,
      address TEXT,
      medicalHistory TEXT
    );
    CREATE TABLE IF NOT EXISTS encounters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientId TEXT NOT NULL,
      type TEXT NOT NULL,
      data TEXT NOT NULL,
      sync_status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const savePatient = (patient) => {
    db.runSync(
        'INSERT OR REPLACE INTO patients (id, name, age, gender, contact, address, medicalHistory) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [patient.uniqueId, patient.name, patient.age, patient.gender, patient.contact, patient.address, patient.medicalHistory]
    );
};

export const getPatients = () => {
    return db.getAllSync('SELECT * FROM patients');
};

export const saveEncounter = (patientId, type, data) => {
    db.runSync(
        'INSERT INTO encounters (patientId, type, data, sync_status) VALUES (?, ?, ?, ?)',
        [patientId, type, JSON.stringify(data), 'pending']
    );
};

export const getPendingEncounters = () => {
    return db.getAllSync("SELECT * FROM encounters WHERE sync_status = 'pending'");
};

export const markEncounterSynced = (id) => {
    db.runSync("UPDATE encounters SET sync_status = 'synced' WHERE id = ?", [id]);
};
