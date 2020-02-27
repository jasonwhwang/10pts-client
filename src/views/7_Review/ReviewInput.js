import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { Send } from 'react-feather'

class ReviewInput extends React.Component {
  state = { comment: '' }
  changeInput = (e) => this.setState({ [e.target.id]: e.target.value })
  render() {
    return (
      <div className="box-border-top box-padding-15 review-textarea box-flex-row">
        <TextareaAutosize rows={3} maxRows={10}
          id="comment"
          placeholder="Comment..."
          className="box-textarea box-text-5 box-flex-1"
          value={this.state.comment}
          autoFocus={true}
          onChange={this.changeInput} />
        <div><button className="box-margin-top-3 follow-blue">
          <Send size={18}/>
        </button></div>
      </div>
    )
  }
}

export default ReviewInput