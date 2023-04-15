import React from 'react';
import {Provider} from "react-redux";
import {store} from "./redux/store";

// TODO: Move into different components
function MainPage() {
    return (
        <div>
            VisionMate - Eye Care Management System
        </div>
    );
}

const App = () => (
    <Provider store={store}>
        <MainPage/>
    </Provider>
);
export default App;