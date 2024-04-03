import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Instruction from "./Instruction";
import Ingredient from "./Ingredient";
import { FaRegHeart , FaHeart } from "react-icons/fa";

const CartItem = ({item, itemIndex}) => {
  const [ingredients,setIngredients]=useState(false);
  const [instructions,setInstructions]=useState(false);
  const [like,setLike]=useState(false);

  const dispatch = useDispatch();
  
  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  const handleInstructionsClick = () => {
    setInstructions(!instructions);
  };
  const handleIngredientsClick = () => {
    setIngredients(!ingredients);
  };

  const handleLike=()=>{
    if(!like){
      toast.success("Add to favourite");
    }
    if(like){
      toast.error("Remove to favourite");
    }
    setLike(!like)
  }
  

  return (
    <div className="flex sm:flex-row flex-col justify-center gap-2 items-center m-10  border-b-4 border-black"> 
        <div className="h-[150px] w-[250px] mr-5">
          <img src={item.image} alt="img" className="h-full w-full border rounded" />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 justify-center items-baseline">
            <h1 className="font-bold text-center mb-3">{item.title}</h1>
            {
              like?(
                <FaHeart onClick={handleLike} className="text-red-500"/>
              ):(<FaRegHeart onClick={handleLike} className="text-red-500"/>)
            }
          </div>
          
          <div className="flex flex-row gap-4 items-end justify-between mb-5 mt-5">
            <button onClick={handleIngredientsClick} className={`py-2 px-4 border border-black rounded bg-white text-black hover:bg-black hover:text-white`}>
              Ingredients
            </button>
            {ingredients && (
              <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50'>
                <Ingredient list={item.extendedIngredients}  onClose={handleIngredientsClick} />
              </div>
            )}

            <button onClick={handleInstructionsClick} className={`py-2 px-4 border border-black rounded bg-white text-black hover:bg-black hover:text-white`}>
              Instructions
            </button>
            {instructions && (
              <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50'>
                <Instruction  instructions={item.instructions} onClose={handleInstructionsClick} />
              </div>
            )}
            
          </div>
          <div className="flex flex-row items-end justify-between mb-5">
            <p className="text-green-600 font-semibold">Time 🕐 : {item.readyInMinutes} min.</p>
            <button onClick={removeFromCart} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  rounded-full">
              Delete
            </button>
          </div>

        </div>

    </div>
  );
};

export default CartItem;
