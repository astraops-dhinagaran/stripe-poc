import { Link } from "@tanstack/react-router";
import Logo from "../../../assets/logo.svg";
import { navLink } from "./navigationdata";
import { useEffect, useState } from "react";

export default function Sidebar() {

    const [role, setRole] = useState<string | undefined>();

    useEffect(() => {
        let roleValue: string | undefined = localStorage.getItem('user_role')!;
        setRole(roleValue)
    },[])

    return (
        <div className="h-full">
            <div className="w-[200px] m-5">
                <img src={Logo} width={'100%'} />
            </div>
            <div className="flex flex-col ml-5">
                {
                    navLink.map((item, index) => (
                        item.role.includes(role!) && <Link to={item.href} className="p-3 [&.active]:[#031554] [&.active]:bg-white [&.active]:rounded-l-full" key={"navigation"+index}>{item.title}</Link>
                    ))
                }
            </div>
        </div>
    );
}