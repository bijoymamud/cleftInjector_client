import { StrictMode, Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.jsx";
import { RouterProvider } from "react-router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoadingScreen from "./LoadingPages/LoadingScreen";

function DelayedFallback({ children }) {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return showApp ? children : <LoadingScreen />;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Suspense fallback={<LoadingScreen />}>
        <DelayedFallback>
          <RouterProvider router={router} />
        </DelayedFallback>
      </Suspense>
    </StrictMode>
  </Provider>
);
