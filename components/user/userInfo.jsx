import React from 'react';
import Item from '../list/item.jsx'

class UserInfo extends React.Component {
    constructor(props) {
		super(props);
    }
    render() {
        const {data} = this.props
        console.log('data',data)
        return (
           <div className='container-fluid margin-t-35 margin-l-35'>
               <h1 className='margin-l-25 yt-name'>{data[0].channelTitle}</h1>
               <div className='col-md-12'>
                {data.map(el =>
                    <Item key={el.title} id={el.resourceId.videoId} title={el.title} pic={el.thumbnails.medium.url} />
                )} 
                </div>
           </div> 
        )
    }
}

export default UserInfo 