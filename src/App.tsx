import Login from "../src/components/auth/login";
import Home from "./components/home";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider } from "./contexts/authContext";

// Generated route tree
import { routeTree } from "./routeTree.gen";

// router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
