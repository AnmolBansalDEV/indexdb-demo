let db: IDBDatabase;
let version = 1;
let request: IDBOpenDBRequest;

export interface User {
  name: string;
  email: string;
}

export enum Stores {
  Users = "users",
}

export const initDb = () => {
  return new Promise<boolean>((resolve, reject) => {
    request = window.indexedDB.open("usersDatabase", version);
    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log("Creating users store");
        db.createObjectStore(Stores.Users, { autoIncrement: true });
      }
    };
    request.onsuccess = () => {
      db = request.result;
      console.log("request.onsuccess - initDB", version);
      resolve(true);
    };

    request.onerror = () => {
      reject(new Error("error accessing the indexedDb"));
    };
  });
};

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  request = window.indexedDB.open("usersDatabase", version);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        reject(new Error(error));
      } else {
        reject(new Error("Unknown error"));
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    request = window.indexedDB.open("usersDatabase", version);
    request.onsuccess = () => {
      console.log("request.onsuccess - getAllData");
      db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
      res.onerror = () => {
        reject(new Error('error fetching data'))
      }
    };
  });
};
