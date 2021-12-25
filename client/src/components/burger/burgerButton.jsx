import React, { useState } from 'react'
import './burgerButton.scss'
import { useSelector } from 'react-redux'
import axios from "axios"

const BurgerButton = () => {
    const token = useSelector(state => state.token)
    //console.log(token)
    const handleCreate = async e =>{
        window.location.href = "/create";
    }
    return (
        <div className='class'>
            <button className='fancy-burger' onClick={handleCreate}>
                <span className='box'></span>
                <span className='rectangle--landscape'></span>
                <span className='rectangle--portrait'></span>
            </button>
        </div>
    )
}

export default BurgerButton
