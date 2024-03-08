function getTasksFromDatabase() {
  const request = indexedDB.open(dbName);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const tasks = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        tasks.push(cursor.value);
        cursor.continue();
      } else {
        console.log('Tasks retrieved from database:', tasks);
      }
    };
  };

  request.onerror = (event) => {
    console.error('Error opening database:', event.target.error);
  };
}
