import React, {Component} from 'react'

export default class ArmorAndGold extends Component {
  render () {
    return (
      <div>
        <p>Armor: {this.props.character.armpr}</p>
        <table>
          <tbody>
            <tr>
              <td>
                            Copper:
                        </td>
              <td>
                {this.props.character.cp}
              </td>
            </tr>
            <tr>
              <td>
                            Silver:
                        </td>
              <td>
                {this.props.character.sp}
              </td>
            </tr>
            <tr>
              <td>
                            Gold:
                        </td>
              <td>
                {this.props.character.gp}
              </td>
            </tr>
            <tr>
              <td>
                            Platinum:
                        </td>
              <td>
                {this.props.character.pp}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
