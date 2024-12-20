import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [searchText,setSearchText]=useState("");
  const [filteredRestaurant,setFilteredRestaurant]=useState([]);


  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData=async ()=>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    
    const json = await data.json();

    console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    setListOfRestraunt(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

};

const onlneStatus=useOnlineStatus();
if (onlneStatus===false) return <h1>Looks like you are offline, Please check your internet connection.</h1>

if (listOfRestaurants.length === 0){
    return <Shimmer/>
}





  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
          <button className="search-button" onClick={
            ()=>{
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredRestaurant(filteredRestaurant);
            }
          }>Search </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestraunt(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;