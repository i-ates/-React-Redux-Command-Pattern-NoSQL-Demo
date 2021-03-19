public class RemoveCommand extends CommandCRUD {

    public RemoveCommand(Student element, Middleware middleware) {
        super(element,middleware);
    }

    @Override
    public void execute() {
        this.middleware.removeElement(parameter);
    }

    @Override
    public void unexecute() {
        this.middleware.addElement(parameter);
    }
}
