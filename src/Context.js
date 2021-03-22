import React, { Component } from 'react'
import Trigger from "./pattern/Trigger";

const RowContext = React.createContext();


const reducer = (prevState,action) => {
    switch(action.type){
        case "REMOVE_DOCUMENT":
            let {prevRow} = action.payload;
            return {
                ...prevState,
                rows: [...prevState.rows.filter(row => row.id !== prevRow.id)]
            };
        case "ADD_DOCUMENT":
            let {nextRow} = action.payload;
            return {
                ...prevState,
                rows: [...prevState.rows,nextRow]
            }
        case "UPDATE_DOCUMENT":
            let {nexRow} = action.payload;
            return{
                ...prevState,
                rows: [...prevState.rows.filter(row=>row.id !== nexRow.id) , nexRow]
            }
        case "UNDO":
            let {undoRowList} = action.payload;
            return {
                ...prevState,
                rows:undoRowList
            };
        case "REDO":
            let {redoRowList} = action.payload;
            return {
                ...prevState,
                rows:redoRowList
            };
        default:
            return prevState;
    }
}

export class Context extends Component {

    constructor(props){
        super(props);
        this.state = {
            rows: localStorage.getItem("objects") ? JSON.parse(localStorage.getItem("objects")) : [],
            trigger: new Trigger(),
            dispatch : action => {
                this.setState(prevState => reducer(prevState,action));
            }
        }
    }

    
    render() {
        return (
            <RowContext.Provider value={this.state}>
                {this.props.children}
            </RowContext.Provider>
        )
    }
}


const RowConsumer = RowContext.Consumer;

export default RowConsumer;