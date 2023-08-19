import React from 'react'

const Adallowed = ({alloweduser}) => {
  return (
    <div>
    <div className='list-events'>
    <div class='container-zz'>
<ul>
  <li class='past'>
    <h4 className='oneline-h3' >{alloweduser.email} </h4>
  {/* <button style={{backgroundColor: 'black', color:'white',padding:'5px',margin:'2px',border: 'none',borderRadius:'4px'}} > Delete</button> */}
  </li>
  </ul>
  </div>
    </div>
  </div>
  )
}

export default Adallowed
