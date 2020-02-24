import React from 'react'
// import { putUser } from '../../../services/api'
import Loading from '../0_Components/4_Loading/Loading'
import TextareaAutosize from 'react-autosize-textarea'

class SettingsAccount extends React.Component {
  state = {
    name: '',
    username: '',
    bio: '',
    error: '',
    success: '',
    loading: false
  }

  componentDidMount() {
    this.setState({ ...this.state, ...this.props.user })
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    this.setState({ ...this.state, loading: true })
    // let res = await putUser({ user: this.state })
    // if (res.error) {
    //   this.setState({ ...this.state, success: "", error: res.error, loading: false })
    // } else {
    //   this.props.changeUser(res.user)
    //   this.setState({ ...this.state, error: "", success: "Successfully updated account.", loading: false })
    // }
  }

  render() {
    return (
      <form className="box-flex-col box-margin-bottom-40" onSubmit={this.onSubmitForm}>
        <h6 className="box-text-nobold box-text-7 settings-labelMargin">Name</h6>
        <input
          id="name"
          type="text"
          maxLength="50"
          autoComplete="name"
          className="box-input settings-margin15"
          onChange={this.onChangeInput}
          value={this.state.name}
          placeholder="Name" />

        <h6 className="box-text-nobold box-text-7 settings-labelMargin">Username</h6>

        <input
          id="username"
          type="text"
          maxLength="50"
          required={true}
          autoComplete="username"
          className="box-input box-text-lowercase settings-margin15"
          onChange={this.onChangeInput}
          value={this.state.username}
          placeholder="Username" />

        <h6 className="box-text-nobold box-text-7 settings-labelMargin">Bio</h6>

        <TextareaAutosize rows={3}
          id="bio"
          placeholder="Bio"
          maxLength={500}
          className="box-input settings-margin15"
          value={this.state.description}
          onChange={this.onChangeInput} />

        <div className="box-flex-row settings-margin15">
          <div>
            <button onClick={this.onSubmitForm}
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Update Account
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

export default SettingsAccount