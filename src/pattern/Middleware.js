class Middleware {
    constructor(newDao) {
        this._dao = newDao;
        this._objects =localStorage.getItem("objects")? JSON.parse(localStorage.getItem("objects")):[];
    }
    getDAO() {
        return this._dao;
    }
    setDAO(newDao) {
        this._dao = newDao;
    }
    getObjects() {
        return this._objects;
    }
    setObjects(newObjects) {
        this._objects = newObjects;
    }
    addDocument(object) {
        this._objects=[...this._objects,object];
    }
    removeDocument(object) {
        this._objects = this._objects.filter(o => o.id !== object.id);
    }
    updateDocument(object) {
        let previousObjects = this._objects.filter(o => o.id !== object.id);
        this._objects = [...previousObjects, object];
    }
    commit() {
        this._dao.write(this._objects);
    }
}
export default Middleware;