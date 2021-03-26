import Command from "./Command"

class RemoveCollection extends Command{
    // constructor(newObject, newMiddleware) {
    //     super(newObject, newMiddleware);
    // }
    execute() {
        super.getMiddleware().removeCollection(super.getElement());
    }
    unexecute() {
        super.getMiddleware().addCollection(super.getElement());
    }
}
export default RemoveCollection;