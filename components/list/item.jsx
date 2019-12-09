import React from 'react';

class Item extends React.Component {
	render() {
		const {title, pic, id} = this.props
		return (
			<div className='col-md-5 video-contener' key={title}>
				<span className='video-title'><a target="_blank" href={'https://www.youtube.com/watch?v=' + id}>{title}</a></span> <br></br>
				<a target="_blank" href={'https://www.youtube.com/watch?v=' + id}><img className="video-pic" src={pic} alt="thu"/></a><br></br>
			</div>
		)
	}
}

export default Item
