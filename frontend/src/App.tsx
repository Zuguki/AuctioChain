import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/context.ts";
import router from "./routes/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApp } from "@/hooks/useApp.ts";

const client = new QueryClient();

function App() {
    const { userStore, stateApp } = useContext(Context);
    useApp();

    return (
        <Context.Provider value={{ userStore, stateApp }}>
            <QueryClientProvider client={client}>
                <RouterProvider router={router} />
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
        </Context.Provider>
    );
}

export default App;
