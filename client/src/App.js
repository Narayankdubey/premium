import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import { AnimatedRoutes } from "./components";
import Notification from "./components/widget/Notification/Notification";
import Loader from "./components/widget/Loader";

function App() {
  const {notification,loading} = useSelector((state) => state.ui);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {loading && <Loader/>}
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
