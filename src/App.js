import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import useLocalStorage from "./Hooks/useLocalStorage";
import ConversationProvider from './Components/ConversationProvider'
import SocketProvider from "./Components/SocketProvider";

function App() {
  const [id,setId]=useLocalStorage('id')
  return (
   
          <div className="App">
          
        {id?   <SocketProvider id={id}> <ConversationProvider id={id}><Dashboard id={id} /></ConversationProvider>  </SocketProvider>:<Login onIdSubmit={setId}/>}
      
    </div>


  );
}

export default App;
