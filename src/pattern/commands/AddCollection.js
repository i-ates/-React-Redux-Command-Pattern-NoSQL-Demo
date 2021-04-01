import Command from "./Command"

class AddCollection extends Command{
    // constructor(newObject, newMiddleware) {
    //     super(newObject, newMiddleware);
    // }
    execute() {
        super.getMiddleware().addCollection(super.getElement());
    }
    unexecute() {
        super.getMiddleware().removeCollection(super.getElement());
    }
}
export default AddCollection;