public class AddCommand extends CommandCRUD{


    public AddCommand(Student parameter, Middleware middleware) {
        super(parameter, middleware);
    }

    @Override
    public void execute() {
        middleware.addElement(parameter);
    }

    @Override
    public void unexecute() {
        middleware.removeElement(parameter);
    }
}
