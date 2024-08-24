import { Row,Col } from "react-bootstrap";
import './SingleCrd.css';
function SingleCard({card,handleChoice,flipped,disable}){
    const handleClick=()=>{
        if(!disable){
            handleChoice(card);
        }
      
    }
    return(
        <>
        <div className="card">
            <div className={flipped ? "flipped":""}>
            <img className='front' src={card.src}/>
            <img className='back' src='Images/cover.jpg' onClick={handleClick}/>
            </div>
          </div>
        </>
    );
}
export default SingleCard;