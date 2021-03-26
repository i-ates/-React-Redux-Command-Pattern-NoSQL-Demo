import Invoker from "./Invoker";
import Middleware from "./Middleware";
import JsonDAO from "./dao/JsonDAO";
import AddCollection from "./commands/AddCollection";
import RemoveCollection from "./commands/RemoveCollection";
import UpdateCollection from "./commands/UpdateCollection";


class Trigger {
    constructor() {
        this._invoker = new Invoker(new Middleware(new JsonDAO()));
    }
    getInvoker() {
        return this._invoker;
    }
    setInvoker(newInvoker) {
        this._invoker = newInvoker;
    }
    addCollection(object) {
        this._invoker.execute(new AddCollection(object, this._invoker.getMiddleware()));
    }
    removeCollection(object) {
        this._invoker.execute(new RemoveCollection(object, this._invoker.getMiddleware()));
    }
    updateCollection(previousObject, object) {
        this._invoker.execute(new UpdateCollection(previousObject, object, this._invoker.getMiddleware()));
    }
    undo() {
        let collections = this._invoker.undo();
        return collections;
    }
    redo() {
        let collections = this._invoker.redo();
        return collections;
    }
    commit() {
        this._invoker.commit();
    }
}
export default Trigger;