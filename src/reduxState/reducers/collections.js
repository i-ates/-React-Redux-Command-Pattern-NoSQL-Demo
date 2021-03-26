const collectionReducer = (
    prevState = {
            collections: localStorage.getItem("collections") ? JSON.parse(localStorage.getItem("collections")) : []
        },action) => {
    switch(action.type){
        case "ADD_COLLECTION":
            console.log(action.payload);
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
            return{
                ...prevState,
                collections: [...prevState.collections.filter(collection => collection.id !== action.payload.id) , action.payload]
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