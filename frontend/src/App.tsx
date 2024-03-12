import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/context.ts";
import router from "./routes/router.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApp } from "@/hooks/useApp.ts";

const client = new QueryClient();

function App() {
    const { userStore, stateApp } = useContext(Context);
    useApp();
    return (
        <QueryClientProvider client={client}>
            <Context.Provider value={{ userStore, stateApp }}>
                <RouterProvider router={router} />
            </Context.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
