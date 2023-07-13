import React from 'react';
import ReactDOM from 'react-dom/client';

import Counter from './App';

let counter = 1;

const refresh = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(<Counter counter={counter}/>);
}

// The following code creates a timer of some sorts that renders the changes every second.
// However, it is not recommended to make repeated calls to the render method in order to re-render components.
refresh();
/*
setInterval(() => {
refresh();
counter++;
}, 1000);
*/