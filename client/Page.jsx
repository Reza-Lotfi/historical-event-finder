import React from 'react';

const Page = (props) => {
  return (
    props.events.map((event, index) => {
      return <li className='event' key={index}>{event.description}</li>
    })
  )
}

export default Page