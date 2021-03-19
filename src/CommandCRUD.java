public abstract class CommandCRUD {

    protected Student parameter;
    protected Middleware middleware;

    public CommandCRUD(Student parameter, Middleware middleware) {
        this.parameter = parameter;
        this.middleware = middleware;
    }

    public abstract void execute();
    public abstract void unexecute();

    public Student getParameter() {
        return parameter;
    }

    public void setParameter(Student parameter) {
        this.parameter = parameter;
    }

    public Middleware getMiddleware() {
        return middleware;
    }

    public void setMiddleware(Middleware middleware) {
        this.middleware = middleware;
    }
}
