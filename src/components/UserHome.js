import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Button, Modal, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { charIdMaker } from '../utils'

/* global fetch */

export default class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.createNewCharacter = this.createNewCharacter.bind(this)
  }


  openModal () {
    this.setState({showModal: true})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  createNewCharacter () {
    this.closeModal()
    this.props.createCharacter()
    this.forceUpdate()
  }

  componentWillMount () {
    fetch(`https://csm-5e.firebaseio.com/users/${this.props.match.params.user}.json`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.props.updateActiveAccount(this.props.match.params.user)
        this.props.updateActiveAccountInfo(json.characters)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    let dispArray = Object.entries(this.props.activeAccountInfo).map((entry) => {
      let charId = charIdMaker(entry[0])
      return <ListGroupItem id={charId} key={`char-${entry[0]}`}>{entry[1]}
        <Button id={`${charId}-edit-btn`} className='pull-right'>
          <Link id={`${charId}-edit-link`} to={`/characters/${entry[0]}/edit`}>Edit!</Link>
        </Button>
        <Button id={`${charId}-play-btn`} className='pull-right' disabled>
          <Link id={`${charId}-play-link`} to={`/characters/${entry[0]}/play`} style={{pointerEvents: 'none'}}>Play!</Link>
        </Button>
      </ListGroupItem>
    })
    return (
      <div>
        <h1 id='welcome-user'>Hello, {this.props.match.params.user}!</h1>
        <ListGroup>{dispArray}</ListGroup>
        <Button id='createCharacter-btn' onClick={this.openModal}>Create A New Character</Button>
        <Button id='quit-btn'><Link id='quit-link' to='/' onClick={this.props.clearActiveAccount}>Quit</Link></Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create A Character!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please enter your character's name below, then click 'Create'!</h4>
            <FormControl
              id="characterName"
              type="text"
              onChange={this.props.onCharacterNameInput}
              value={this.props.characterName}
              placeholder="Please enter your character's name..."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.createNewCharacter}>Create!</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

UserHome.propTypes = {
  updateActiveAccountInfo: PropTypes.func,
  updateActiveAccount: PropTypes.func,
  activeAccountInfo: PropTypes.object,
  match: PropTypes.object,
  clearActiveAccount: PropTypes.func,
  createCharacter: PropTypes.func,
  onCharacterNameInput: PropTypes.func,
  characterName: PropTypes.string
}
