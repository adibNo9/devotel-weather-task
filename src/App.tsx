import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import WeatherContainer from './containers/weather-container';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherContainer />
    </QueryClientProvider>
  );
}

export default App;
