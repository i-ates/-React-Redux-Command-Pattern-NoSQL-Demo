class Invoker {
    constructor(newMiddleware) {
        this._middleware = newMiddleware;
        this._undoCommands = [];
        this._redoCommands = [];
    }
    execute(command) {
        command.execute();
        this._undoCommands.push(command);
        this._redoCommands = [];
        return this;
    }
    undo() {
        try {
            let command = this._undoCommands.pop();
            command.unexecute();
            this._redoCommands.push(command);
        } catch (error) { }
        return this;
    }
    redo() {
        try {
            let command = this._redoCommands.pop();
            command.execute();
            this._undoCommands.push(command);
        } catch (error) { }
        return this;
    }
    commit() {
        this._middleware.commit();
        return this;
    }
    getMiddleware() {
        return this._middleware;
    }
    setMiddleware(newMiddleware) {
        this._middleware = newMiddleware;
    }
    getUndoCommands() {
        return this._undoCommands;
    }
    setUndoCommands(newUndoCommands) {
        this._undoCommands = newUndoCommands;
    }
    getRedoCommands() {
        return this._redoCommands;
    }
    setRedoCommands(newRedoCommands) {
        this._redoCommands = newRedoCommands;
    }
}
export default Invoker;