import { lazy, Suspense } from "react";

import toast, { Toaster } from "react-hot-toast";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

import Loader from "./components/Loader";

const WeatherContainer = lazy(() => import("./components/WeatherContainer"));

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
      <Suspense fallback={<Loader />}>
        <WeatherContainer />
      </Suspense>

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
