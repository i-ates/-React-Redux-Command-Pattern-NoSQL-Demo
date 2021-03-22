import AddDocument from "./commands/AddDocument";
import RemoveDocument from "./commands/RemoveDocument";
import UpdateDocument from "./commands/UpdateDocument";
import Invoker from "./Invoker";
import Middleware from "./Middleware";
import JsonDAO from "./dao/JsonDAO";

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
    addElement(object) {
        this._invoker.execute(new AddDocument(object, this._invoker.getMiddleware()));
    }
    removeElement(object) {
        this._invoker.execute(new RemoveDocument(object, this._invoker.getMiddleware()));
    }
    updateElement(previousObject, object) {
        this._invoker.execute(new UpdateDocument(previousObject, object, this._invoker.getMiddleware()));
    }
    undo() {
        let rows = this._invoker.undo();
        return rows;
    }
    redo() {
        let rows = this._invoker.redo();
        return rows;
    }
    commit() {
        this._invoker.commit();
    }
}
export default Trigger;