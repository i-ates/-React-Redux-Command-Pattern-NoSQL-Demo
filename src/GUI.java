public class GUI {

    private Invoker invoker;

    public GUI(Invoker invoker) {
        this.invoker = invoker;
    }

    public void addElement(Student element){
        this.invoker.execute(new AddCommand(element,this.invoker.getMiddleware()));
    }

    public void removeElement(Student element) {
        this.invoker.execute(new RemoveCommand(element,this.invoker.getMiddleware()));
    }

    public boolean undo() {
        return  this.invoker.undo();
    }

    public boolean redo() {
        return this.invoker.redo();
    }

    public void commit() {
        this.invoker.commit();
    }

    public Invoker getInvoker() {
        return invoker;
    }

    public void setInvoker(Invoker invoker) {
        this.invoker = invoker;
    }


}
