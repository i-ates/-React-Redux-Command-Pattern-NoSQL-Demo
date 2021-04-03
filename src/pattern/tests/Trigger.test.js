import Trigger from '../Trigger'

// .env içinde SKIP_PREFLIGHT_CHECK=true olması lazım.

let dummyData = {id:1, name:"collection1",documents:[{
    id:1, name:"document1", content:{
        name:"said",
        age:"23"
    }
}]};

test("Add should work fine",()=> {
    const trigger= new Trigger();

    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
} );

test("Remove should work fine", ()=> {
    const trigger = new Trigger();
    
    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
    trigger.removeCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(0);
});

test("Update should work fine", ()=> {
    const trigger = new Trigger();
    
    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
    
    let updatedData= {...dummyData};
    updatedData.documents= [...dummyData.documents];
    updatedData.documents.push({
        id:2, name:"document2", content:{
            name:"ismail",
            age:"24"
        }
    });

    trigger.updateCollection(dummyData,updatedData);
    expect(trigger.getInvoker().getMiddleware().getCollections()[0].documents.length).toBe(2);
});

test("Undo should work fine",()=> {
    const trigger= new Trigger();

    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
    expect(trigger.getInvoker().getUndoCommands().length).toBe(1);
    expect(trigger.getInvoker().getRedoCommands().length).toBe(0);
    trigger.undo();
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(0);
    expect(trigger.getInvoker().getUndoCommands().length).toBe(0);
    expect(trigger.getInvoker().getRedoCommands().length).toBe(1);
});

test("Redo should work fine",()=> {
    const trigger= new Trigger();

    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
    expect(trigger.getInvoker().getUndoCommands().length).toBe(1);
    expect(trigger.getInvoker().getRedoCommands().length).toBe(0);

    trigger.undo();
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(0);
    expect(trigger.getInvoker().getUndoCommands().length).toBe(0);
    expect(trigger.getInvoker().getRedoCommands().length).toBe(1);

    trigger.redo();
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);
    expect(trigger.getInvoker().getUndoCommands().length).toBe(1);
    expect(trigger.getInvoker().getRedoCommands().length).toBe(0);


});

test("Commit should work fine", ()=>{
    const trigger = new Trigger();
    
    trigger.addCollection(dummyData);
    expect(trigger.getInvoker().getMiddleware().getCollections().length).toBe(1);

    trigger.commit();
    let collections=localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
    expect(collections.length).toBe(1);
});




