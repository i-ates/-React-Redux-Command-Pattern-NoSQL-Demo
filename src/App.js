import Trigger from "./pattern/Trigger";
import React, { Component } from 'react'

export default class App extends Component {
  constructor(args){
    super(args);
    this.state = {
      rows : [],
      trigger : new Trigger(this)
    }
  }

  update = (rows) => {
    this.setState({rows});
  }

  addElement = () => {
    this.state.trigger.addElement(this.state.object);
  }

  removeElement = () => {
    this.state.trigger.removeElement(this.state.object);
  }

  updateElement = (prev,next) => {
    this.state.trigger.updateElement(prev,next);
  }

  undo = () => {
    this.state.trigger.undo();
  }

  redo = () => {
    this.state.trigger.redo();
  }

  render() {
    const {rows} = this.state;
    return (
      <div >
        <input type="text" name="object" onChange={e => this.setState({[e.target.name]:JSON.parse(e.target.value)})}></input>
        <button onClick={this.addElement}>Add</button>
        <button onClick={this.removeElement}>Remove</button>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.redo}>Redo</button>
        {rows.map(row => (<div key={row.id}>{JSON.stringify(row)}</div>) ) }
      </div>
    );
  }
}
