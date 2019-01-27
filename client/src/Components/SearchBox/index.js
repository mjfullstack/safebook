import React from 'react';
import './style.css';

// CAN'T ACCESS State Object! So pass one down that can!!!
// const onSearchChange = (event) => {
//   this.setState({ searchfield: event.target.value })
//   console.log("event.target.value: ", event.target.value);
// };

// class SearchBox extends Component {
const SearchBox = ({searchfield, searchChange}) => {
  console.log(`SearchBox - searchfield: ${searchfield}; searchChange: ${searchChange}`);
  return (
    <div className='pa2' id='mySearchBox'>
      <input 
        className='pa3 ba b--orange bg-lightest-blue'
        type='search'
        placeholder='Search Safer Users...'
        onChange={searchChange}
      />
    </div>
  )
}

export default SearchBox;