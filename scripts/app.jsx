import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header/header.jsx'
import UserInfo from '../components/user/userInfo.jsx'
import MDSpinner from "react-md-spinner";

document.addEventListener('DOMContentLoaded', function(){

	class App extends React.Component {
		constructor(props) {
			super(props);
			this.state = {isLoading: false, isLoaded: false, data: []};
			this.updateState = this.updateState.bind(this)
		}


		updateState(isLoading, isLoaded,data) {
			this.setState({
				isLoading: isLoading,
				isLoaded: isLoaded,
				data: data
			})
		}

		render(){
			return ( 
				<div>
					<Header updateState={this.updateState} logoSubTitle="Channel Search"/>
					{this.state.isLoading ? <MDSpinner size={50} className='spinnerPosition'/> : null}
					{this.state.isLoaded ? <UserInfo data={this.state.data}/> : null}
				</div>

			)
		}
	}

	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
});
