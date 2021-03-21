class Command {
    constructor(newObject, newMiddleware) {
        this._object = newObject;
        this._middleware = newMiddleware;
        if (this.constructor === Command) {
            throw new Error("FYI: Instance of Abstract class cannot  be instantited.");
        }
    }
    getElement() {
        return this._object;
    }
    setElement(newObject) {
        this._object = newObject;
    }
    getMiddleware() {
        return this._middleware;
    }
    setMiddleware(newMiddleware) {
        this._middleware = newMiddleware;
    }
}
export default Command;