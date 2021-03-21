import {useEffect} from "react";
import Trigger from "./pattern/Trigger";

function App() {

  useEffect(()=>{
    let trigger = new Trigger();
    trigger.addElement({"id":1,"name":"Said"});
    trigger.commit();
    trigger.undo();
    trigger.commit();
    trigger.redo();
    trigger.commit();
    trigger.updateElement({"id":1,"name":"Said"},{"id":1,"name":"Muhammed"});
    trigger.commit();
    trigger.undo();
    trigger.commit();
    trigger.removeElement({"id":1,"name":"Said"});
    trigger.commit();
    trigger.undo();
    trigger.commit();
    trigger.redo();
    trigger.commit();
  },[]);

  return (
    <div >
      
    </div>
  );
}

export default App;
