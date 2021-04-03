import UpdateCollection from '../../commands/UpdateCollection'
import AddCollection from '../../commands/AddCollection'
import Middleware from '../../Middleware';
import DAO from '../../DAO' 


let dummyData = {id:1, name:"collection1",documents:[{
    id:1, name:"document1", content:{
        name:"said",
        age:"23"
    }
}]};


test("Execute should work fine", ()=>{
    const middleware= new Middleware(new DAO());
   

    let addCommand= new AddCollection({...dummyData},middleware);

  

    let updatedData= {...dummyData};
    updatedData.documents= [...dummyData.documents];
    updatedData.documents.push({
        id:2, name:"document2", content:{
            name:"ismail",
            age:"24"
        }
    });
    let updateCommmand= new UpdateCollection({...dummyData},updatedData,middleware);

    addCommand.execute();
    expect(middleware.getCollections().length).toBe(1);

    updateCommmand.execute();
    let updatedCollection= middleware.getCollections().filter(c =>{
        return c.id===updatedData.id
    })[0];
    expect(updatedCollection.documents).toEqual(updatedData.documents);
    
   
});

test("Unexecute should work fine", ()=>{
    const middleware= new Middleware(new DAO());
   

    let addCommand= new AddCollection({...dummyData},middleware);

  

    let updatedData= {...dummyData};
    updatedData.documents= [...dummyData.documents];
    updatedData.documents.push({
        id:2, name:"document2", content:{
            name:"ismail",
            age:"24"
        }
    });
    let updateCommmand= new UpdateCollection({...dummyData},updatedData,middleware);

    addCommand.execute();
    expect(middleware.getCollections().length).toBe(1);

    updateCommmand.execute();
    let updatedCollection= middleware.getCollections().filter(c =>{
        return c.id===updatedData.id
    })[0];
    expect(updatedCollection.documents).toEqual(updatedData.documents);
    

    updateCommmand.unexecute();
    updatedCollection= middleware.getCollections().filter(c =>{
        return c.id===updatedData.id
    })[0];
    expect(updatedCollection.documents).toEqual(dummyData.documents);
   
});