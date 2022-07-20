import { Component } from 'react';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: true,
    }
 }

  render() {
    return (
      <div>
        <p>{this.props.date}</p>
        <p>{this.props.description}</p>
      </div>
    )
   }
}

export default Weather;