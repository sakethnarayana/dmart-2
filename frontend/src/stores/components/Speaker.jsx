import React from 'react'
import {speakerData} from '../data/speaker'
import { Link } from 'react-router-dom';

const Speaker = () => {
    const firstFiveImages = speakerData.slice(0,5);
    return(
        <>
        <div className="proTitle">
        <h2>Speakers</h2>
        </div>
         
         <div className='proSection'>
            {
                firstFiveImages.map((item)=>{
                    return(
                        <Link to={`/Speakers/${item._id}`} key={item._id}>
                          <div className='imgBox'>
                         <img className='proImage' src={item.image} alt="" />
                        </div>    
                        </Link> 
                    )
                    
                   
                })
            }
         </div>
        </>
    )
    
}

export default Speaker
