import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Screens from "./screens/Routes/Screens";

const queryClient = new QueryClient()
function App() {

  return (
  <QueryClientProvider client={queryClient}>
  <Screens/>
  </QueryClientProvider>
  )
}


export default App;
