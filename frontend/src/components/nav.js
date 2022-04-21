import React from 'react';
import { Link } from 'react-router-dom';

function nav() {
    return (
        // nav bar
        <nav>
            <Link to='/'>home</Link>
            <div>
            </div>
            <Link to='/login'>login</Link>
        </nav>
    );
}

export default nav;