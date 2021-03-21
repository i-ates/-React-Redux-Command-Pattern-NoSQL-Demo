import {useEffect} from "react";
import Trigger from "./pattern/Trigger";

function App() {

  useEffect(()=>{
    let trigger = new Trigger();
    trigger.addElement({"name":"Said"});
    trigger.commit();
    trigger.undo();
    console.log("hi");
    trigger.commit();
    trigger.redo();
  });

  return (
    <div >
      
    </div>
  );
}

export default App;
