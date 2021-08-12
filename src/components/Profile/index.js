import {Component} from 'react'
import './index.css'

class Profile extends Component {
  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = localStorage.getItem('pa_token', '')
    const apiUrl = 'https://api.spotify.com/v1/me'
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
    localStorage.setItem('country', data.country)
  }

  render() {
    return (
      <div>
        <h1>Profile Route</h1>
      </div>
    )
  }
}

export default Profile
