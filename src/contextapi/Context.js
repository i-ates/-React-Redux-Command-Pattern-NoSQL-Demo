import React, { Component } from 'react'
import Trigger from "../pattern/Trigger";

const Context = React.createContext();

export class ContextProvider extends Component {

    constructor(props){
        super(props);
        this.state = {
            trigger: new Trigger(),
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