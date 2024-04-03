import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/Slices/CartSlice';
import { toast } from 'react-hot-toast';
import RatingForm from './RatingForm';

const Product = ({ post, ratingdata, setRatingdata }) => {
  const [rat, setRat] = useState(0);
  const { cart } = useSelector((state) => state);
  const [showRatingForm, setShowRatingForm] = useState(false);

  const dispatch = useDispatch();

  const updateRatingdata = (newRatingData) => {
    const existingRatingIndex = ratingdata.findIndex((item) => item.id === newRatingData.id);
    if (existingRatingIndex !== -1) {
      const updatedRatingdata = [...ratingdata];
      updatedRatingdata[existingRatingIndex] = newRatingData;
      setRatingdata(updatedRatingdata);
      localStorage.setItem('ratingdata', JSON.stringify(updatedRatingdata));
    } else {
      const newRatingdata = [...ratingdata, newRatingData];
      setRatingdata(newRatingdata);
      localStorage.setItem('ratingdata', JSON.stringify(newRatingdata));
    }
  };

  const handleRating = () => {
    const newrating = {
      id: post.id,
      rating: rat,
    };
    updateRatingdata(newrating);
    setShowRatingForm(!showRatingForm);
  };

  const addToCart = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${post.id}/information?apiKey=3a8dd82d6e644d509c4c157c8d8eb6bd`
      );
      const data = await response.json();
      dispatch(add(data));
      toast.success('Item added to Cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error('Item removed from Cart');
  };

  return (
    <div className="relative flex flex-col items-center justify-between shadow-xl transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left mt-1 flex-wrap">{post.title}</p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} alt="img" className="h-full w-full border rounded" />
      </div>

      <div className="flex justify-center gap-12 items-center w-full mt-5">
        <div>
          <p className="flex gap-1 items-baseline justify-center text-green-600 font-semibold">
            <FaStar onClick={handleRating} className="text-yellow-600 cursor-pointer" />
            {ratingdata.find((item) => item.id === post.id) ? (
              <>
                {ratingdata.find((item) => item.id === post.id).rating}/5
              </>
            ) : (
              <>
                {rat}/5
              </>
            )}
          </p>
        </div>

        {cart.some((p) => p.id === post.id) ? (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            onClick={removeFromCart}
          >
            Remove From My Book
          </button>
        ) : (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            onClick={addToCart}
          >
            Add to My Book
          </button>
        )}
      </div>

      {showRatingForm && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 z-50">
          <RatingForm rat={rat} setRat={setRat} onClose={handleRating} />
        </div>
      )}
    </div>
  );
};

export default Product;
