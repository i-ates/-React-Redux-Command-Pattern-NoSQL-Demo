import React, { Component } from "react";
import RowConsumer from "../Context";

export default class Content extends Component {



  addElement = (dispatch,trigger,e) => {
    trigger.addElement(this.state.object);
    dispatch({type:"ADD_DOCUMENT",payload:{nextRow:this.state.object}});
  }

  removeElement = (dispatch,trigger,e) => {
    trigger.removeElement(this.state.object);
    dispatch({type:"REMOVE_DOCUMENT",payload:{prevRow:this.state.object}})
  }

  updateElement = (dispatch,trigger,e) => {
    trigger.updateElement(this.state.object,this.state.object2);
    dispatch({type:"UPDATE_DOCUMENT",payload:{nexRow:this.state.object2}});
  }

  undo = (dispatch,trigger,e) => {
    let rows = trigger.undo();
    dispatch({type:"UNDO",payload:{undoRowList:rows}});
  }

  redo = (dispatch,trigger,e) => {
    let rows = trigger.redo();
    dispatch({type:"REDO",payload:{redoRowList:rows}});
  }

  commit = (trigger,e) => {
      trigger.commit();
  }

  render() {
    return (
      <RowConsumer>
        {(value) => {
          const { dispatch, rows ,trigger} = value;
          return (
            <div>
              <input
                type="text"
                name="object"
                onChange={(e) =>
                  this.setState({ [e.target.name]: JSON.parse(e.target.value) })
                }
              ></input>
              <input
                type="text"
                name="object2"
                onChange={(e) =>
                  this.setState({ [e.target.name]: JSON.parse(e.target.value) })
                }
              ></input>
              <button onClick={this.addElement.bind(this, dispatch,trigger)}>
                Add
              </button>
              <button onClick={this.removeElement.bind(this, dispatch,trigger)}>
                Remove
              </button>
              <button onClick={this.updateElement.bind(this, dispatch,trigger)}>
                Update
              </button>
              <button onClick={this.undo.bind(this,dispatch,trigger)}>Undo</button>
              <button onClick={this.redo.bind(this,dispatch,trigger)}>Redo</button>
              <button onClick={this.commit.bind(this,trigger)}>Commit</button>
              {/* <button className="cv" onClick={this.saveFile}>
                Download File
              </button> */}
              {rows &&
                rows.map((row) => (
                  <div key={row.id}>{JSON.stringify(row)}</div>
                ))}
            </div>
          );
        }}
      </RowConsumer>
    );
  }
}
