import React, {Component} from 'react'

export default class ACInitSpeed extends Component {
  render () {
    let dexBonus = Math.floor((this.props.character.abScores[1][1] - 10) / 2)
    let sign
    if (dexBonus >= 0) {
      sign = '+'
    } else {
      sign = ''
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>
                            AC:
                        </th>
              <th>
                            Init:
                        </th>
              <th>
                            Speed:
                        </th>
            </tr>
            <tr>
              <td>
                {10 + dexBonus}
              </td>
              <td>
                {sign}{dexBonus}
              </td>
              <td>
                {this.props.character.speed}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
