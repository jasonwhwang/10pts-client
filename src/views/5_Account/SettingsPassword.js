import React from 'react'
import { changePassword } from '../../services/authApi'
import Loading from '../0_Components/4_Loading/Loading'

class SettingsPassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    error: "",
    success: "",
    loading: false
  }

  changeLoading = (val) => {
    this.setState({ ...this.state, loading: val })
  }
  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    if (this.state.oldPassword === "" || this.state.newPassword === "") {
      this.setState({ ...this.state, error: "Missing required fields." })
      return
    }

    this.changeLoading(true)
    let response = null
    response = await changePassword(this.state.oldPassword, this.state.newPassword)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, success: "", loading: false })
    } else {
      this.setState({ ...this.state, oldPassword: "", newPassword: "", error: "", loading: false, success: "Password successfully changed." })
    }
  }

  componentDidUpdate() {
    if (this.state.success !== "" && (this.state.oldPassword || this.state.newPassword)) {
      this.setState({ ...this.state, error: "", success: "" })
    }
  }

  render() {
    return (
      <form className="box-flex-col" onSubmit={this.onSubmitForm}>
        <h5 className="box-text-bold settings-margin15">Password</h5>
        <input
          className="box-display-none"
          type="text"
          autoComplete="username" />
        <input
          id="oldPassword"
          type="password"
          maxLength="50"
          autoComplete="current-password"
          className="box-input settings-margin15"
          onChange={this.onChangeInput}
          value={this.state.oldPassword}
          placeholder="Old Password" />
        <input
          id="newPassword"
          type="password"
          maxLength="50"
          autoComplete="new-password"
          className="box-input settings-margin15"
          onChange={this.onChangeInput}
          value={this.state.newPassword}
          placeholder="New Password" />

        <div className="box-flex-row settings-margin15">
          <div>
            <button
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Change Password
              </button>
          </div>

          {this.state.error !== "" && !this.state.loading &&
            <h6 className="box-text-8 box-color-red box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
              {this.state.error}
            </h6>
          }
          {this.state.success !== "" && !this.state.loading &&
            <h6 className="box-text-8 box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
              {this.state.success}
            </h6>
          }
          {this.state.loading &&
            <div className="box-margin-left-20"><Loading small={true} /></div>
          }
        </div>
      </form>
    )
  }
}

export default SettingsPassword