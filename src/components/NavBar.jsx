import { NavLink } from "react-router";
import { themeColor } from "../common/constants";

const NavBar = ()=>{
    return (
        <div className="h-[4rem] border-b border-zinc-200 shadow-sm ">
        <NavLink to='/'>
        <div className="flex gap-2 items-center justify-start px-1 h-[100%]">
            <img className="w-[3rem] h-[3rem]" src="https://cdn.pdf-xchange.com/img/productIcons/pdf-tools(4142)_220x220.png?1458755968" alt="" />
            <p className={`text-3xl font-bold text-[${themeColor}]`}>PDF HELPER</p>
        </div>
        </NavLink>
        </div>
    )
}

export default NavBar;