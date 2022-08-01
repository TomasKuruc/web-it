import React from 'react';
import './App.css';
import Layout from "./layout/Layout";
import FrontRoutes from "./routes/FrontRoutes";

function App() {
  return (
    <div className="App">
        <Layout>
            <FrontRoutes/>
        </Layout>
    </div>
  );
}

export default App;
