import Invoker from '../Invoker'
import Middleware from '../Middleware';
import AddCollection from './../commands/AddCollection'
import RemoveCollection from './../commands/RemoveCollection'
import UpdateCollection from './../commands/UpdateCollection'
import DAO from './../DAO' 


let dummyData = {id:1, name:"collection1",documents:[{
    id:1, name:"document1", content:{
        name:"said",
        age:"23"
    }
}]};


test("Execute should work fine",()=>{
    const middleware= new Middleware(new DAO());
    const invoker= new Invoker(middleware);

    let addCommand= new AddCollection({...dummyData},middleware);

    let removeCommand= new RemoveCollection({...dummyData},middleware);

    let updatedData= {...dummyData};
    updatedData.documents= [...dummyData.documents];
    updatedData.documents.push({
        id:2, name:"document2", content:{
            name:"ismail",
            age:"24"
        }
    });
    let updateCommmand= new UpdateCollection({...dummyData},updatedData,middleware);

    invoker.execute(addCommand);
    expect(invoker.getUndoCommands().length).toBe(1);

    invoker.execute(updateCommmand);
    expect(invoker.getUndoCommands().length).toBe(2);
    
    invoker.execute(removeCommand);
    expect(invoker.getUndoCommands().length).toBe(3);


});


test("Undo should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    const invoker= new Invoker(middleware);

    let addCommand= new AddCollection({...dummyData},middleware);

    invoker.execute(addCommand);
    expect(invoker.getUndoCommands().length).toBe(1);

    invoker.undo();
    expect(invoker.getUndoCommands().length).toBe(0);
    expect(invoker.getRedoCommands().length).toBe(1);

})

test("Redo should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    const invoker= new Invoker(middleware);

    let addCommand= new AddCollection({...dummyData},middleware);

    invoker.execute(addCommand);
    expect(invoker.getUndoCommands().length).toBe(1);

    invoker.undo();
    expect(invoker.getUndoCommands().length).toBe(0);
    expect(invoker.getRedoCommands().length).toBe(1);

    invoker.redo();
    expect(invoker.getUndoCommands().length).toBe(1);
    expect(invoker.getRedoCommands().length).toBe(0);

})

test("Commit should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    const invoker= new Invoker(middleware);

    let addCommand= new AddCollection({...dummyData},middleware);

    invoker.execute(addCommand);
    expect(invoker.getUndoCommands().length).toBe(1);

    invoker.commit();
    let collections=localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
    expect(collections.length).toBe(1);


})