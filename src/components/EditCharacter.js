import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditCharacter extends Component {
  render () {
    return (
      <div>
        Editing Character!!
        {console.log(this.props.match.params.uid)}
      </div>
    )
  }
}

EditCharacter.propTypes = {
  match: PropTypes.object
}
