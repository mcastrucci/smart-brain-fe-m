import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, box}) => {
    console.log('Face recogntion URL:' + imageUrl);
    return(    
        <div className="center ma">
            <div className='absolute mt2'>
                <img id='inputImage' className='pa2 shadow-2' width='500px' height='auto' alt='' src={imageUrl}/>
                <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;