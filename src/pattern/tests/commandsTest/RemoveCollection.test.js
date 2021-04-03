import AddCollection from './../../commands/AddCollection'
import RemoveCollection from './../../commands/RemoveCollection'
import Middleware from '../../Middleware';
import DAO from './../../DAO' 

let dummyData = {id:1, name:"collection1",documents:[{
    id:1, name:"document1", content:{
        name:"said",
        age:"23"
    }
}]};

test("Execute should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    let addCommand= new AddCollection({...dummyData},middleware);
    
    addCommand.execute();
    expect(middleware.getCollections().length).toBe(1);

    let removeCommand= new RemoveCollection({...dummyData},middleware);
    removeCommand.execute();
    expect(middleware.getCollections().length).toBe(0);
});


test("Unexecute should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    let addCommand= new AddCollection({...dummyData},middleware);
    
    addCommand.execute();
    expect(middleware.getCollections().length).toBe(1);

    let removeCommand= new RemoveCollection({...dummyData},middleware);
    removeCommand.execute();
    expect(middleware.getCollections().length).toBe(0);

    removeCommand.unexecute();
    expect(middleware.getCollections().length).toBe(1);
});