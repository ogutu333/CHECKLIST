function addTaskToDatabase(task, date, color, image) {
  const request = indexedDB.open(dbName);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const taskData = {
      task,
      date,
      color,
      image,
    };
    store.add(taskData);
    transaction.oncomplete = () => {
      console.log('Task added to database:', taskData);
    };
    transaction.onerror = (event) => {
      console.error('Error adding task to database:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Error opening database:', event.target.error);
  };
}
