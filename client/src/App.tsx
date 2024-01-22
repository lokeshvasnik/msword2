import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { Logout } from "./pages/Logout";

const Navbar = lazy(() => import("./components/shared/Navbar"));
const TextEditor = lazy(() => import("./components/shared/TextEditor"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Loader = lazy(() => import("./components/shared/Loader"));
const Error = lazy(() => import("./components/shared/Error"));

const App = () => {
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to={`/docs/${uuid()}`} />}
                    />
                    <Route path="/docs/:id" element={<TextEditor />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
