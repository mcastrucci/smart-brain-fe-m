import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit}) => {
    return(    
        <div>
            <p className='f3'>{`this magic brain will recognice the faces in your pictures`}</p>
            <div className='center'>
                <div className='form center pa3 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;