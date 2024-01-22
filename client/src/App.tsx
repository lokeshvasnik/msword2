import TextEditor from "./components/shared/TextEditor";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Navbar from "./components/shared/Navbar";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to={`/docs/${uuid()}`} />}
                />
                <Route path="/docs/:id" element={<TextEditor />} />
            </Routes>
        </Router>
    );
};

export default App;
