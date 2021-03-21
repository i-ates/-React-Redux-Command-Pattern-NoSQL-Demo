import Command from "./Command"

class AddDocument extends Command{
    // constructor(newObject, newMiddleware) {
    //     super(newObject, newMiddleware);
    // }
    execute() {
        super.getMiddleware().addDocument(super.getElement());
    }
    unexecute() {
        super.getMiddleware().removeDocument(super.getElement());
    }
}
export default AddDocument;