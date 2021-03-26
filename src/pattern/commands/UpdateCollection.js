import Command from "./Command"

class updateCollection extends Command{
    constructor(newPreviousObject, newObject, newMiddleware) {
        super(newObject, newMiddleware);
        this._previousObject = newPreviousObject;
    }
    getPreviousObject() {
        return this._previousObject;
    }
    setPreviousObject(newPreviousObject) {
        this._previousObject = newPreviousObject;
    }
    execute() {
        super.getMiddleware().updateCollection(super.getElement());
    }
    unexecute() {
        super.getMiddleware().updateCollection(this.getPreviousObject());
    }
}
export default updateCollection;