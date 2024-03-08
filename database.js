const dbName = 'todosDB';
const dbVersion = 1;
const storeName = 'todos';

const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database initialized:', db);
};

request.onerror = (event) => {
  console.error('Error initializing database:', event.target.error);
};
