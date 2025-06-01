import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display'>
        
        <h2 className='food-display-text' style={{textAlign:'center', fontSize:'30px' , margin:'20px 0px 30px', fontWeight:'600'}}>TOP DISHES NEAR YOU</h2>
        <div className="food-disply-list">
            {food_list.map((item , index)=>{
                if(category==="All" || category === item.category){
                    return<FoodItem key = {index} id = {item._id} name = {item.name} description={item.description} price={item.price} image={item.image}/>
                }
                
            })}
        </div>
    </div>
  )
}

export default FoodDisplay