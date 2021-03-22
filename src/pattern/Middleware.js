class Middleware {
    constructor(newDao,gui) {
        this._dao = newDao;
        this._objects = []
        this._gui = gui;
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
        this._objects.push(object);
        this._gui.update(this._objects);
    }
    removeDocument(object) {
        this._objects = this._objects.filter(o => o.id !== object.id);
        this._gui.update(this._objects);
    }
    updateDocument(object) {
        let previousObjects = this._objects.filter(o => o.id !== object.id);
        this._objects = [...previousObjects, object];
        this._gui.update(this._objects);
    }
    commit() {
        this._dao.write(this._objects);
    }
}
export default Middleware;