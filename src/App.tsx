import toast, { Toaster } from "react-hot-toast";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

import WeatherContainer from "./components/WeatherContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 100_000,
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      const queryError = error as Error;
      error && toast.error(queryError.message);
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherContainer />

      <Toaster
        position="bottom-left"
        containerClassName="drop-shadow-none"
        toastOptions={{
          style: {
            color: "#713200",
            textShadow: "none",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
