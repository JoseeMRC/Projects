import { AppContextProvider } from './context/AppContextProvider'
import { AppRoutes } from './routes/AppRoutes'


function App() {
  return (

       <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>

  );
}

export default App;

