import React from 'react'
import {computerData} from '../data/computers'
import { Link } from 'react-router-dom'

const Computers = () => {
    const firstFiveImages = computerData.slice(0,5)
    
    return (
    <>
    <div className="proTitle">
    <h2>Computers</h2>
    </div>
    
        <div className='proSection'>
        {
          firstFiveImages.map((item)=>{
              return(
                <Link to={`/Computers/${item._id}`} key={item._id}>
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

export default Computers
