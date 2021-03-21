import Trigger from "./pattern/Trigger";
import React, { Component } from 'react'

export default class App extends Component {
  constructor(args){
    super(args);
    this.state = {
      rows : JSON.parse(localStorage.getItem("objects")),
      trigger : new Trigger(this)
    }
    console.log(this.state.rows);
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

  updateElement = () => {
    this.state.trigger.updateElement(this.state.object,this.state.object2);
  }

  undo = () => {
    this.state.trigger.undo();
  }

  redo = () => {
    this.state.trigger.redo();
  }

  commit = () => {
    this.state.trigger.commit();
  }

  render() {
    const {rows} = this.state;
    return (
      <div >
        <input type="text" name="object" onChange={e => this.setState({[e.target.name]:JSON.parse(e.target.value)})}></input>
        <input type="text" name="object2" onChange={e => this.setState({[e.target.name]:JSON.parse(e.target.value)})}></input>
        <button onClick={this.addElement}>Add</button>
        <button onClick={this.removeElement}>Remove</button>
        <button onClick={this.updateElement}>Update</button>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.redo}>Redo</button>
        <button onClick={this.commit}>Commit</button>
        {rows && rows.map(row => (<div key={row.id}>{JSON.stringify(row)}</div>) ) }
      </div>
    );
  }
}
