import React, { useEffect } from 'react';
import FlipDown from './flipdown';
import './flipdown.css'

export default () => {
    const JUN_1ST_2021 = 1622505600;
    
    useEffect(() => {
        new FlipDown(JUN_1ST_2021).start()
    });

    return (
        <div id="flipdown" className="flipdown"></div>
    )
}