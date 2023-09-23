import React from 'react'
import { useState } from 'react'
export const SearchParams = () => {
  const [location, setLocation] = useState('')

  

  return (
    <div className='search-params'>
      <form action="">
        <label htmlFor="location">
          Location
          <input onChange={e => setLocation(e.target.value)} type="text" id={location} placeholder='Location' value={location}/>
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SearchParams
