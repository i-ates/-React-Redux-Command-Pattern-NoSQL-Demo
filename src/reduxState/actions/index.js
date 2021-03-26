
export const undoChange = (collections) => {
    return { type: "UNDO", payload:collections};
}

export const redoChange = (collections) => {
    return { type: "REDO", payload:collections};
}

export const addCollection = (collection) => {
    return { type: "ADD_COLLECTION",payload:collection}
}

export const removeCollection = (collection) => {
    return { type: "REMOVE_COLLECTION",payload:collection}
}

export const updateCollection = (collection) => {
    return { type: "UPDATE_COLLECTION", payload:collection};
}