import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import './Tags.css'
// import { getTags } from '../../../services/api'

class Tags extends React.Component {
  state = {
    suggestions: [
      { id: 1, name: "apples" },
      { id: 2, name: "pears" },
      { id: 3, name: "bananas" },
      { id: 4, name: "mangos" },
      { id: 5, name: "lemons" },
      { id: 6, name: "apricots" },
      { id: 7, name: "oranges" }
    ]
  }

  async componentDidMount() {
    // let newSuggestions = await getTags()
    // this.setState({ ...this.state, suggestions: newSuggestions.tags })
    let input = document.getElementsByClassName('react-tags__search-input')
    if(input && input[0]) input[0].setAttribute('maxlength', 30)
  }

  onDelete = (i) => {
    const newTags = this.props.tags.slice(0)
    newTags.splice(i, 1)
    this.props.changeVal(this.props.type, newTags)
  }

  onAddition = (tag) => {
    tag = {
      _id: tag._id ? tag._id : null,
      name: tag.name
        .replace(/[^A-Za-z0-9& ]/gi, '').toLowerCase()
        .replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase() }).substring(0, 30)
    }
    let duplicate = this.props.tags.filter(tagItem => tagItem.name === tag.name)
    if(duplicate.length >= 1) return
    const newTags = [].concat(this.props.tags, tag)
    this.props.changeVal(this.props.type, newTags)
  }

  // onInput = async (query) => {
  //   let newSuggestions = await getTags({ tag: query })
  //   this.setState({ ...this.state, suggestions: newSuggestions.tags })
  // }

  render() {
    return (
      <ReactTags
        tags={this.props.tags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete}
        onAddition={this.onAddition}
        // onInput={this.onInput}
        placeholderText="Add tags..."
        allowNew={this.props.allowNew}
        autoresize={false}
        minQueryLength={1}
        maxSuggestionsLength={5}
        removeButtonText={""} />
    )
  }
}

export default Tags