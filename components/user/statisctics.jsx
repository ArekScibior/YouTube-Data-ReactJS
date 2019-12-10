import React from 'react';

class Statistics extends React.Component {
    constructor(props) {
		super(props);
    }
    render() {
        const {subs, views, videos} = this.props
       
        return (
            <div>
               <h2>Statistics</h2>
               <p><b>Video Count:</b> {videos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
               <p><b>Subs Count:</b> {subs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
               <p><b>Views Count:</b> {views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
        )
    }
}

export default Statistics 