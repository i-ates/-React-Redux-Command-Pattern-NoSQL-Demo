import React, { Component } from 'react'
import Trigger from "../pattern/Trigger";

const Context = React.createContext();

export class ContextProvider extends Component {

    constructor(props){
        super(props);
        this.state = {
            trigger: new Trigger(),
            isJSON: true,
            undoCommandsCount:0,
            redoCommandsCount:0,
            setUndoCommandsCount:  (value) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        undoCommandsCount:value
                    };
                });
            },
            setRedoCommandsCount:  (value) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        redoCommandsCount:value
                    };
                });
            },
            setIsJSON:  (value) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        isJSON: value
                    };
                });
            },
            setCollection: (collection) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        collection,
                        document: undefined
                    };
                });
            },
            setDocument: (document) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        document
                    };
                });
            },
        }
    }

    
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}


const ContextConsumer = Context.Consumer;

export default ContextConsumer;