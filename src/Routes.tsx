import {createBrowserRouter} from 'react-router-dom';
import {App} from './App';
import {Home} from '../src/components/home/Home.tsx';
import {MovieDetail} from "./components/details/MovieDetail.tsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true, element: <Home/>},
            {path: "/movie/:id", element: <MovieDetail/>},

        ]
    }
]);
