import DAO from './../DAO' 

let dummyData = {id:1, name:"collection1",documents:[{
    id:1, name:"document1", content:{
        name:"said",
        age:"23"
    }
}]};

test("Write should work fine",()=>{
    const dao= new DAO();

    dao.write([dummyData]);
    let collections=localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
    expect(collections.length).toBe(1);


});

