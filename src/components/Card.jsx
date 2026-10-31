import { themeColor } from "../common/constants";

const Card = ({cardData})=>{
    return (
        <div className="w-[20rem] h-[20rem] rounded-sm border border-zinc-200 shadow-sm">
            <div>
                <img className="w-[100%] h-[16rem] border-b border-zinc-200" src={cardData.image} alt="" />
            </div>
            <div className="w-[100%] p-4 flex justify-center items-center">
                <p className={`text-xl font-bold`}>{cardData?.title||""}</p>
            </div>
        </div>
    )
}

export default Card;