import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { FiSearch } from "react-icons/fi";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search,setSearch]=useState("");
  const [tag,setTag]=useState("");
  const [ratingdata,setRatingdata]=useState([]);
  const apiKey="3a8dd82d6e644d509c4c157c8d8eb6bd";
  const API_URL=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=veg&maxFat=25&number=20`;
  const Search_API=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${search}&number=20`
  const Tag_API=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${tag}&number=20`


  async function fetchfoodData() {
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data.results);
      // setPosts(recipe.results);
    }
    catch(error) {
      console.log("Error aagya ji");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchfoodData();
    const storedRatingdata = localStorage.getItem("ratingdata");
    if (storedRatingdata) {
      setRatingdata(JSON.parse(storedRatingdata));
    }
  },[])

  const queryHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (search.trim() === "") {
        // If search query is empty, fetch default data
        await fetchfoodData();
      } else {
        // If search query is not empty, fetch data based on search query
        const res = await fetch(Search_API);
        const data = await res.json();
        setPosts(data.results);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setPosts([]);
    }

    setLoading(false);
    console.log(tag);
  };


  const tagHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tag.trim() === "") {
        // If tag is empty, fetch default data
        await fetchfoodData();
      } else {
        // If tag is not empty, fetch data based on tag
        const res = await fetch(Tag_API);
        const data = await res.json();
        setPosts(data.results);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setPosts([]);
    }

    setLoading(false);
  };




  console.log(posts);
  return (
    <div>
      <div className="mt-4  lg:mx-20 flex flex-col lg:flex-row items-center gap-3 justify-between">
        <div>
          <form onSubmit={queryHandler} className="mx-8 md:mx-auto md:max-w-lg">
            <div className="relative">
              <FiSearch className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white text-lg py-2 px-4 pl-10 rounded-full w-full focus:outline-none"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        <div>
          <div class="relative h-10 w-72 min-w-[200px]">
            <select
              type="text"
              value={tag}
              onChange={(e)=>{setTag(e.target.value)}}
              onClick={tagHandler}
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="">select a tag</option>
              <option value="italian"><span><FaPizzaSlice className="text-black"/><h4>Italian</h4></span></option>
              <option value="american"><span> <FaHamburger /><h4>American</h4></span></option>
              <option value="thai"><span> <GiNoodles /><h4>Thai</h4></span></option>
              <option value="japanese"><GiChopsticks /><h4>Japanese</h4></option>
            </select>
            <label
              class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a Tag
            </label>
          </div>

        </div>
        
      </div>
      {
        loading ? <Spinner />  :
        posts.length > 0 ? 
        (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {
            posts.map( (post) => (
            <Product key = {post.id} post={post} ratingdata={ratingdata} setRatingdata={setRatingdata}/>
          ) )
          }
        </div>) :
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div> 
      }
    </div>
  );
};

export default Home;
