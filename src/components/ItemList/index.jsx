import React from 'react'
import './styles.css'

const ItemList = ({title, link, description}) => {
  return (
    <div className='item-list'>
        <a href={link} target='blank'><strong>{title}</strong></a> 
        <p>{description}</p>
        <hr />
    </div>
  )
}

export default ItemList;