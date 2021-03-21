import Command from "./Command"

class UpdateDocument extends Command{
    constructor(newPreviousObject, newObject, newMiddleware) {
        super(newObject, newMiddleware);
        this._previosObject = newPreviousObject;
    }
    getPreviousObject() {
        return this._previousObject;
    }
    setPreviousObject(newPreviousObject) {
        this._previousObject = newPreviousObject;
    }
    execute() {
        super.getMiddleware().updateDocument(super.getElement());
    }
    unexecute() {
        super.getMiddleware().removeDocument(this.getPreviousObject());
    }
}
export default UpdateDocument;