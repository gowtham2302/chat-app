import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard"
import { ConProvider } from "../contexts/ConProvider";
import { CovProvider } from "../contexts/CovProvider";
import { Socketprovider } from "../contexts/Socketprovider";

function App() {
  
  const [id , setid] = useLocalStorage('-id' , null)

  const dashboard = (
    <Socketprovider id={id}>
        <ConProvider>
          <CovProvider id={id}>
           <Dashboard id={id}/>
          </CovProvider>
        </ConProvider>
      </Socketprovider>
    
  )

  return (
  <>
  {id ? dashboard:<Login setid= {setid}/>}
  
  </>
  )
}

export default App;
