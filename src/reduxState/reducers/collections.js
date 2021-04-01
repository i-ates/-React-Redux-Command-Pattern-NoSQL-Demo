const collectionReducer = (
    prevState = {
            collections: localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
        },action) => {
    switch(action.type){
        case "ADD_COLLECTION":
            return {
                ...prevState,
                collections: [...prevState.collections,action.payload]
            };
        case "REMOVE_COLLECTION":
            return {
                ...prevState,
                collections: [...prevState.collections.filter(collection => collection.id !== action.payload.id)]
            }
        case "UPDATE_COLLECTION":
            let count = 0; 
            prevState.collections.forEach((collection,index) => {
                if(collection.id === action.payload.id){
                    count = index;
                }
            });
            let collections = [...prevState.collections];
            collections.splice(count,1,action.payload);
            return{
                ...prevState,
                collections
            }
        case "UNDO":
        case "REDO":
            return {
                ...prevState,
                collections: [...action.payload]
            };
        default:
            return prevState;
    }
}

export default collectionReducer;