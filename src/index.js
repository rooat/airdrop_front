import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './routes'
ReactDOM.render(
        <App/>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <Provider> 
//         <App/>
//     </Provider>,
//     document.getElementById('root')
// );
