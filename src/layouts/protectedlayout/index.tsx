import { Outlet } from "@tanstack/react-router";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function ProtectedLayout() {
    return ( 
        <div className="bg-blue-100 w-screen h-screen flex ">
            <div className="w-[300px] h-screen">
                <Sidebar />
            </div>
            <div className="w-full h-screen">
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <div className="w-full bg-white rounded h-[calc(100vh-60px)]">
                    <Outlet />
                </div>
            </div>
        </div>
     );
}

export default ProtectedLayout;