import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Dashboard, ReadBardcode, UpdateStatus } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<ReadBardcode />} />
            <Route path="*" element={<ReadBardcode />} />
            <Route path="/update-status" element={<UpdateStatus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
