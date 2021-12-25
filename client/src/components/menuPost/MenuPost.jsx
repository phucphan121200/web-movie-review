import React from 'react'
import "./menuPost.scss"

const MenuPost = () => {
    return (
        <div className='menu'>
            <nav className='nav'>
                <a className='navbar post' href="#">Posts</a>
                <a className='navbar save' href="#">Saved</a>
                <a className='navbar hidden' href="#">Hidden</a>
                <div className='animation start-post'></div>
            </nav>
        </div>
    )
}

export default MenuPost
