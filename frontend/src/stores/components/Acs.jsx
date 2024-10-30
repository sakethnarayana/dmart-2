import React from 'react'
import {acData} from '../data/ac'
import { Link } from 'react-router-dom';

const Acs = () => {
    const firstFiveImages = acData.slice(0,5);
    return(
        <>
        <div className="proTitle">
        <h2>AC</h2>
        </div>
         
         <div className='proSection'>
            {
                firstFiveImages.map((item)=>{
                    return(
                        <Link to={`/AC/${item._id}`} key={item._id}>
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

export default Acs
