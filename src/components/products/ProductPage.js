import React from "react"

export default function ProductPage (close) {
    return (
        <>
            <div className="windowContainer">
                <div className="window-header">
                    {/* product name */}
                    <button data-close-button className='close-button' onClick={close} >&times;</button>
                </div>
                <div className="window-body">
                    <h1>PRODUCT</h1>
                </div>
            </div>
            <div id="overlay"></div>
        </>
    )
}