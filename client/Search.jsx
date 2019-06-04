import React from 'react';

const Search = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input onChange={props.handleChange} type='text'></input>
      <button type='submit'>Search</button>
    </form>
  )
}

export default Search;
