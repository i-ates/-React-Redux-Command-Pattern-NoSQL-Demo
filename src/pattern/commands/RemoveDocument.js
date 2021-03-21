import Command from "./Command"

class RemoveDocument extends Command{
    // constructor(newObject, newMiddleware) {
    //     super(newObject, newMiddleware);
    // }
    execute() {
        super.getMiddleware().removeDocument(super.getElement());
    }
    unexecute() {
        super.getMiddleware().addDocument(super.getElement());
    }
}
export default RemoveDocument;