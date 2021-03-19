import java.util.Stack;

public class Invoker {

    private Stack<CommandCRUD> undoCommands;
    private Stack<CommandCRUD> redoCommands;
    private Middleware middleware;

    public Invoker(Middleware middleware) {
        this.undoCommands = new Stack<>();
        this.redoCommands = new Stack<>();
        this.middleware = middleware;
    }

    public void execute(CommandCRUD command){
        command.execute();
        undoCommands.push(command);
        redoCommands.clear();
    }

    public boolean undo(){
        try {
            CommandCRUD command = undoCommands.pop();
            command.unexecute();
            redoCommands.push(command);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    public boolean redo(){
        try{
            CommandCRUD command = redoCommands.pop();
            command.execute();
            undoCommands.push(command);
            return true;
        }catch (Exception e){
            return false;
        }


    }

    public void commit(){
        middleware.commit();
    }

    public Stack<CommandCRUD> getUndoCommands() {
        return undoCommands;
    }

    public void setUndoCommands(Stack<CommandCRUD> undoCommands) {
        this.undoCommands = undoCommands;
    }

    public Stack<CommandCRUD> getRedoCommands() {
        return redoCommands;
    }

    public void setRedoCommands(Stack<CommandCRUD> redoCommands) {
        this.redoCommands = redoCommands;
    }

    public Middleware getMiddleware() {
        return middleware;
    }

    public void setMiddleware(Middleware middleware) {
        this.middleware = middleware;
    }
}
