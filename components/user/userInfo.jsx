import React from 'react';
import Item from '../list/item.jsx'
import Statistics from './statisctics.jsx'

class UserInfo extends React.Component {
    constructor(props) {
		super(props);
    }
    render() {
        const {data} = this.props
        var playlist = data.playlist
        var channelInfo = data.channelInfo
        var statistics = channelInfo.statistics
        var banners = channelInfo.brandingSettings.image
        var showInfo = (playlist && playlist.length > 0)
        console.log(channelInfo)
        return (
           <div className='container-fluid margin-t-35 userInfo'> 
                <img className="banner" src={banners.bannerTabletImageUrl} alt="bannerUser"/>
                <div className='container-fluid'>
                    <h1 className='margin-l-25 yt-name'><a target="_blank" href={'https://www.youtube.com/channel/' + channelInfo.id}>{channelInfo.snippet.title}</a></h1>
                    <Statistics subs={statistics.subscriberCount} views={statistics.viewCount} videos={statistics.videoCount}/> 
                </div>

               {showInfo ? 
                <div className='col-md-12 container-items'>
                    {playlist.map(el =>
                        <Item key={el.title} id={el.resourceId.videoId} title={el.title} pic={el.thumbnails.medium.url} />
                    )} 
                </div> : null}
           </div> 
        )
    }
}

export default UserInfo 