import './App.css';
import { AppUI } from './AppUI';
import {MoviesContextProvider} from'../Context'





function App() {
  
  
  return (
    <MoviesContextProvider>
      <AppUI/>
    </MoviesContextProvider>
  );
}

export default App;
