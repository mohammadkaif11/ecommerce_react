import React from 'react'
import Nav from '../GlobalComponent/Nav'

function Order() {
  return (
    <><Nav/>
     <div class="container mx-2 my-2">
      <div class="orderContainer">
        <h3 class="display-5" style={{textAlign:"center"}}>Your Order</h3>
        <hr />
      </div>
    </div>
    </>
  )
}

export default Order