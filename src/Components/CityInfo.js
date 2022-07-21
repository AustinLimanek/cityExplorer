import { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const axios = require('axios').default;


class Map extends Component {

   constructor() {
      super();
      this.state = {
        searchQuery: '',
        location: '',
        show: 'none',
        icon: '',
        mapImage: '',
        errorMessage: '',
        showAlert: false,
        weather: ''
      }
   }

  handleCitySearch = (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    axios.get(url).then(
      response => {
        console.log(response);
        let obj = response.data[0];
        this.setState({
          show: 'ltbl',
          location: obj.display_name,
          lat: obj.lat,
          lon: obj.lon,
          icon: obj.icon,
          mapImage: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${obj.lat},${obj.lon}&zoom=12&size=400x400&format=png`
        })
      })
      .catch((error) => {
        const errorMessage = `${error.response.data.error}. ${error.message} (${error.code}).`;
        this.setState({showAlert: true, errorMessage: errorMessage})
      })
  }

  handleWeather = (e) => {
    e.preventDefault();
    const url = `https://city-explorerajl.herokuapp.com/weather?city=${this.state.searchQuery}`;
    axios.get(url).then(
      response => {
        console.log(response);
        this.setState({
          weather: response,
        })
      })
      .catch((error) => {
        const errorMessage = `${error.response.data.error}. ${error.message} (${error.code}).`;
        this.setState({showAlert: true, errorMessage: errorMessage})
      })
  }

   handleChange = (e) => {
    let { value } = e.target;
    value.toLowerCase();
    this.setState({ searchQuery: value })
    console.log(value);
   }

   render() {
    return (
      <Container className='searchAndCard'>
        <Form onSubmit = {this.handleCitySearch} className='search'>
          <Form.Control type='text' onChange={this.handleChange} placeholder='Input city name' />
          <Button type='submit' className='submit'>Explore!</Button>
        </Form>
        <Card className='mapCard' style={{ width: '40rem'}}>
          <Card.Img variant ="top" src={this.state.mapImage} />
          <Card.Body>
            <Card.Title>{this.state.location}</Card.Title>
            <div className='holder'>
              <Card.Text>Latitude: {this.state.lat}</Card.Text>
              <Card.Text>Longitude: {this.state.lon}</Card.Text>
            </div>
            <Form onSubmit = {this.handleWeather}>
          <Button type='submit' className='submit'>Weather!</Button>
        </Form>
          </Card.Body>
        </Card>
       {this.state.weather && (this.state.weather.data.map(element => 
        <Card>
          <Card.Body>
          <Card.Title>{element.date}</Card.Title>
          <Card.Text>{element.description}</Card.Text>
          </Card.Body>
        </Card>))}

        <Alert show={this.state.showAlert} variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
          <Alert.Heading>
            Input was invalid. Option: Check spelling.
          </Alert.Heading>
          {this.state.errorMessage}
        </Alert>
      </Container>
    )
   }
}

export default Map;