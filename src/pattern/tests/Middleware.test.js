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



test("Add collection should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    middleware.addCollection({...dummyData});
    expect(middleware.getCollections().length).toBe(1);
});

test("Remove collection should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    middleware.addCollection({...dummyData});
    expect(middleware.getCollections().length).toBe(1);

    middleware.removeCollection({...dummyData});
    expect(middleware.getCollections().length).toBe(0);
});

test("Update collection should work fine", ()=>{
    const middleware= new Middleware(new DAO());
    
    middleware.addCollection({...dummyData});
    expect(middleware.getCollections().length).toBe(1);

    let updatedData= {...dummyData};
    updatedData.documents= [...dummyData.documents];
    updatedData.documents.push({
        id:2, name:"document2", content:{
            name:"ismail",
            age:"24"
        }
    });

    middleware.updateCollection(updatedData);
    let updatedCollection= middleware.getCollections().filter(c =>{
        return c.id===updatedData.id
    })[0];

    expect(updatedCollection.documents).toEqual(updatedData.documents);
});


test("Commit should work fine", ()=>{
    const middleware= new Middleware(new DAO());

    middleware.addCollection({...dummyData});
    expect(middleware.getCollections().length).toBe(1);

    
    

    middleware.commit();
    let collections=localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
    expect(collections.length).toBe(1);


});
