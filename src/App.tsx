import {Outlet} from "react-router-dom";
import {Header} from "./components/header/Header.tsx";
import {Footer} from "./components/footer/Footer.tsx";




export const App = () => {

    return (
        <div className="wrapper">
            <Header/>
            <div className="main">
                <Outlet/>
            </div>
            <Footer/>

        </div>
    );
};
