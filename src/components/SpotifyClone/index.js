import {Component} from 'react'
import moment from 'moment'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class SpotifyClone extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    featuredPlaylistData: [],
    browseCategoriesData: [],
    newReleasesData: [],
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const country = localStorage.getItem('country', '')
    const token = localStorage.getItem('pa_token', '')

    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const apiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`
    // const apiUrl = `https://api.spotify.com/v1/browse/featured-playlists`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/spotify-remix-login-music.png"
        alt="website logo"
      />
      <h1 className="loading-heading">Loading...</h1>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return 'success'
      case apiStatusConstants.failure:
        return 'faulure'
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return <div>{this.renderView()}</div>
  }
}

export default SpotifyClone
