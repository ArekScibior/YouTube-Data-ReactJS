import React from 'react';
import SearchInput from './search.jsx'
import keys from "../../scripts/keys.jsx";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this)
		this.firstTimeSearch = true;
	}

	search(data) {
		var dataObj = {}
		var props = this.props
		props.updateState(true, false, dataObj)
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
					dataObj.playlist = modifyPlaylist
					props.updateState(false, true, dataObj)
				});
			}

			function searchChannelStatistics(data) {
				var payload = {
					"part": "snippet,contentDetails, statistics, brandingSettings",
					"forUsername": data,
					//"id": data
				}
				//id = UCwBtP6NDQtsP5YBa4vuZqHA - friz bnt - UC5FWImlh1axobNU541SIHHg Arczi - UCKGy5bsWhfug36p5jyt3-gA
				return gapi.client.youtube.channels.list(payload).then(function(response) {
					if (response.result.pageInfo.totalResults == 0) {
						dataObj.playlist = []
						dataObj.channelInfo = []
						props.updateState(false, false, dataObj)
						alert("Brak danych!")
					} else {
						channelUploadId = response.result.items[0].contentDetails.relatedPlaylists.uploads
						dataObj.channelInfo = response.result.items[0]
						searchPlaylist(26);
					}
				})
			}
			searchChannelStatistics(data);
		}

		var init = function(data) {
			gapi.load("client:auth2", function() {
				gapi.auth2.init({client_id: keys.client_id});
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
				gapi.client.setApiKey(keys.api_key);
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
			<div className='container-fluid margin-t-35'>
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
