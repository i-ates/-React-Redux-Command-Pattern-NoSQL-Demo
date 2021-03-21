class Command {
    constructor(newObject, newMiddleware) {
        this.object = newObject;
        this.middleware = newMiddleware;
        if (this.constructor === Command) {
            throw new Error("FYI: Instance of Abstract class cannot  be instantited.");
        }
    }
    getElement() {
        return this.object;
    }
    setElement(newObject) {
        this.object = newObject;
    }
    getMiddleware() {
        return this.middleware;
    }
    setMiddleware(newMiddleware) {
        this.middleware = newMiddleware;
    }
}
export default Command;