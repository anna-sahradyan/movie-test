import {createRoot} from 'react-dom/client'
import './assets/styles/main.scss';
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from './Routes.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        < RouterProvider router={router}/>
    </Provider>
)
