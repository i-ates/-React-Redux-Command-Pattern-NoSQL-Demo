import React, { Component } from "react";
import RowConsumer from "../Context";

export default class Content extends Component {



  addElement = (dispatch,e) => {
    dispatch({type:"ADD_DOCUMENT",payload:{nextRow:this.state.object}});
  }

  removeElement = (dispatch,e) => {
    dispatch({type:"REMOVE_DOCUMENT",payload:{prevRow:this.state.object}})
  }

  updateElement = (dispatch,e) => {
    dispatch({type:"UPDATE_DOCUMENT",payload:{preRow:this.state.object,nexRow:this.state.object2}});
  }

  undo = (dispatch,e) => {
      dispatch({type:"UNDO"});
  }

  redo = (dispatch,e) => {
      dispatch({type:"REDO"});
  }

  commit = (dispatch,e) => {
      dispatch({type:"COMMIT"});
  }

  render() {
    return (
      <RowConsumer>
        {(value) => {
          const { dispatch, rows } = value;
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
              <button onClick={this.addElement.bind(this, dispatch)}>
                Add
              </button>
              <button onClick={this.removeElement.bind(this, dispatch)}>
                Remove
              </button>
              <button onClick={this.updateElement.bind(this, dispatch)}>
                Update
              </button>
              <button onClick={this.undo.bind(this,dispatch)}>Undo</button>
              <button onClick={this.redo.bind(this,dispatch)}>Redo</button>
              <button onClick={this.commit.bind(this,dispatch)}>Commit</button>
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
