import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";




const Cart = () => {

  const {cart} = useSelector((state) => state);
  console.log("Printing Cart");
  console.log(cart);

  return (
    <div>
  {
    cart.length > 0  ? 
    (<div className="flex sm:flex-row flex-col  justify-center items-center max-w-6xl mx-auto overflow-y-hidden">
      <div className="items-center w-full">
        {
          cart.map( (item,index) => {
            return <CartItem key={item.id} item={item} itemIndex={index} />
          } )
        }
      </div>

    </div>) : 
    (<div className="flex flex-col justify-center items-center mt-60">
      <h1 className="font-bold mb-4">Empty Book</h1>
      <Link to={"/"}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Add Recipe
        </button>
      </Link>
    </div>)
  }
    </div>
  );
};

export default Cart;
