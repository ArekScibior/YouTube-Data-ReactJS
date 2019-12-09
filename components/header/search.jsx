import React from 'react';

class searchInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {query:""}
		this.search = this.search.bind(this)
	}
	updateQueryState(event) {
		this.setState({query: event.target.value})
	}

	render() {

		return (
			<div className="col-md-6">
				<div className="input-group col-md-12 display-inline-flex ">
					<input type="text" onChange={this.updateQueryState.bind(this)} className="form-control" placeholder="Entry Channel's ID" value={this.state.title}/>
					<div className="input-group-append">
						<button onClick={this.search} className="btn btn-outline-secondary button-search" type="button">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</div>
		)
	}

	search(data) {
		this.props.search(this.state.query)
	}
}

export default searchInput
