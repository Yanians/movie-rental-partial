
import Dexie from 'dexie';

const dbConstructor =(dbName, dbStore) =>{
	  const db = new Dexie(dbName);
	        db.version(2).stores(dbStore);
	        db.open().catch(err=>{
	        	console.error('Error line 7', err.stack||err)
	        })
	        return db;
};

export const UserRegister = dbConstructor(
  'User', {
            checking: `++id, type`,
            register: `++id, firstName, lastName, email, contact, password, url`,
               login: `++id, email, password`,
          },
     );

export default dbConstructor;