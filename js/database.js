const DB_NAME='POSAccountingDB', DB_VERSION=1;
let db;
function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,DB_VERSION);req.onupgradeneeded=e=>{const d=e.target.result;['products','invoices','accounts','journals'].forEach(s=>{if(!d.objectStoreNames.contains(s))d.createObjectStore(s,{keyPath:'id',autoIncrement:true})})};req.onsuccess=e=>{db=e.target.result;resolve(db)};req.onerror=()=>reject(req.error)})}
function add(store,data){return new Promise((resolve,reject)=>{const r=db.transaction(store,'readwrite').objectStore(store).add(data);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function put(store,data){return new Promise((resolve,reject)=>{const r=db.transaction(store,'readwrite').objectStore(store).put(data);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
function getAll(store){return new Promise((resolve,reject)=>{const r=db.transaction(store).objectStore(store).getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function remove(store,id){return new Promise((resolve,reject)=>{const r=db.transaction(store,'readwrite').objectStore(store).delete(id);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
async function clearStore(store){return new Promise((resolve,reject)=>{const r=db.transaction(store,'readwrite').objectStore(store).clear();r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
