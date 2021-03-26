class Middleware {
    constructor(newDao) {
        this._dao = newDao;
        this._collections = localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
    }
    getDAO() {
        return this._dao;
    }
    setDAO(newDao) {
        this._dao = newDao;
    }
    getCollections() {
        return this._collections;
    }
    setCollections(collections) {
        this._collections = collections;
    }
    addCollection(collection){
        this._collections = [...this._collections,collection]
    }
    removeCollection(collection) {
        this._collections = this._collections.filter(o => o.id !== collection.id);
    }
    updateCollection(collection) {
        let previousObjects = this._collections.filter(o => o.id !== collection.id);
        this._collections = [...previousObjects, collection];
    }
    commit() {
        this._dao.write(this._collections);
    }
}
export default Middleware;