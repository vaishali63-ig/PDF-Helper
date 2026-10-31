import { NavLink } from "react-router";
import { cards } from "../common/staticData";
import Card from "../components/Card";

const Home = ()=>{
    return (
    <div className="flex p-4 bg-zinc-100 h-[100vh]">
        {
            cards.map(c=>{
                return <NavLink to={c.id}>
                    <Card cardData={c}/>
                </NavLink>
            })
        }
    </div>
    )
}

export default Home;