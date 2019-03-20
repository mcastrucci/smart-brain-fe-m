import React from 'react';

const Rank = ({ userInfo }) => {
    return(    
        <div className='shadow-1'>
            <div className='f3 pa2 center white'>
                {`welcome ${userInfo.name}!, your entries count is:`}
            </div>
            <div className='f2 pa2 center white'>
                {userInfo.entries}
            </div>
        </div>
    )
}

export default Rank;