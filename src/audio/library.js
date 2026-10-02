let database;
function db() {
  if (!database) database = new Promise((resolve,reject) => {
    const request = indexedDB.open('zakialarm-audio',1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return database;
}
export async function audioFile(action, id, file) {
  const database = await db();
  return new Promise((resolve,reject) => {
    const transaction = database.transaction('files', action === 'get' ? 'readonly' : 'readwrite');
    const files = transaction.objectStore('files');
    const request = action === 'put' ? files.put(file,id) : action === 'clear' ? files.clear() : files[action](id);
    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
