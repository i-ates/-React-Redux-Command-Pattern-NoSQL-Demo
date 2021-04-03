import AddCollection from './../../commands/AddCollection'
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
});


test("UnExecute should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    let addCommand= new AddCollection({...dummyData},middleware);
    
    addCommand.execute();
    expect(middleware.getCollections().length).toBe(1);

    addCommand.unexecute();
    expect(middleware.getCollections().length).toBe(0);
});