import React from 'react';
import SearchInput from './search.jsx'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this)
		this.firstTimeSearch = true;
	}

	search(data) {
		
		var props = this.props
		props.updateState(true, false, [])
		var callback = function (data, props) {
			var playlist = [];
			var channelUploadId = ""
			
			function searchPlaylist(maxResults) {
				var payload = {
					"part": "snippet",
					"playlistId": channelUploadId,
					"maxResults": maxResults
				}
				return gapi.client.youtube.playlistItems.list(payload)
				.then(function(response) {
					playlist = response.result.items
					var modifyPlaylist = _.map(playlist, function(el) {
						return el.snippet
					})
					props.updateState(false, true, modifyPlaylist)
				});
			}
	
			function searchChannelStatistics(data) {
				var payload = {
					"part": "snippet,contentDetails, statistics",
					"id": data
				}
				//id = UCwBtP6NDQtsP5YBa4vuZqHA
				return gapi.client.youtube.channels.list(payload).then(function(response) {
					if (response.result.pageInfo.totalResults == 0) {
						props.updateState(false, false, [])
						alert("Brak danych!")
					} else {
						channelUploadId = response.result.items[0].contentDetails.relatedPlaylists.uploads
						searchPlaylist(25);
					}
				})
			}
			searchChannelStatistics(data);
		}
		
		var init = function(data) {
			gapi.load("client:auth2", function() {
				gapi.auth2.init({client_id: "984444499678-22lqeqt6fd9q5f911sk9jt6k42p57icb.apps.googleusercontent.com"});
				authenticate()
				loadClient()
			});
			var authenticate = function () {
				return new Promise(function(resolve, reject) {
					gapi.auth2.getAuthInstance()
					.signIn({scope:"https://www.googleapis.com/auth/youtube"})
					.then(function() {
						callback(data, props)
					})
				})		
			}
			
			var loadClient = function() {
				gapi.client.setApiKey("AIzaSyDQscYvc8_DnTBBMyI2mwJwsE1F-JHNeYM");
				return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
			}
		}
		
		if (this.firstTimeSearch) {
			this.firstTimeSearch = false
			init(data);
		} else {
			callback(data, props);
		}
	}
	
	
	render() {
		const {logoSubTitle} = this.props
		return (
			<div className='container-fluid margin-t-35 margin-l-35'>
				<span className="pull-left">
					<img className="margin-t-n-15" src="../styles/img/youtube-logo.jpg" width="190px" alt="ytlogo"/>
					<span className="logo-text">{logoSubTitle}</span>
				</span>
				<SearchInput search={this.search}/>
			</div>

		)
	}
}

export default Header
