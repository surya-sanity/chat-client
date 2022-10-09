import Login from "./screens/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/Authentication/SignUp";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AuthVerify from "./components/AuthVerify";
import NavBar from "./components/NavBar";
import ChatScreen from "./screens/Chat/ChatScreen";
import UsersScreen from "./screens/Users/UsersScreen";
import { useSocketHook } from "./hooks/socketHook";

const AppContent = () => {
  useSocketHook()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<NavBar />}>
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/users" element={<UsersScreen />} />
        </Route>
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
