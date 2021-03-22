import React, { Component } from 'react'
import Trigger from "./pattern/Trigger";

const RowContext = React.createContext();


export class Context extends Component {

    constructor(props){
        super(props);
        this.state = {
            rows: localStorage.getItem("objects") ? JSON.parse(localStorage.getItem("objects")) : [],
            trigger: new Trigger(),
            dispatch : action => {
                this.setState(prevState => this.reducer(prevState,action));
            }
        }
    }

    reducer = (prevState,action) => {
        switch(action.type){
            case "REMOVE_DOCUMENT":
                const {prevRow} = action.payload;
                this.state.trigger.removeElement(prevRow);
                return {
                    ...prevState,
                    rows: [...prevState.rows.filter(row => row.id !== prevRow.id)]
                };
            case "ADD_DOCUMENT":
                const {nextRow} = action.payload;
                this.state.trigger.addElement(nextRow);
                return {
                    ...prevState,
                    rows: [...prevState.rows,nextRow]
                }
            case "UPDATE_DOCUMENT":
                const {preRow,nexRow} = action.payload;
                this.state.trigger.updateElement(preRow,nexRow);
                return{
                    ...prevState,
                    rows: [...prevState.rows.filter(row=>row.id !== nexRow.id) , nexRow]
                }
            case "UNDO":
                let rows = this.state.trigger.undo();
                console.log(rows);
                return {
                    ...prevState,
                    rows
                };
            case "REDO":
                let rowList = this.state.trigger.redo();
                console.log(rowList);
                return {
                    ...prevState,
                    rows: [...rowList]
                };
            case "COMMIT":
                this.state.trigger.commit();
                return prevState;
            default:
                return prevState;
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