import { Component } from 'react';
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
        icon: ''
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
          icon: obj.icon
        })
      }
      );
  }

   handleChange = (e) => {
    let { value } = e.target;
    value.toLowerCase();
    this.setState({ searchQuery: value })
    console.log(value);
   }

   render() {
    return (
      <Container>
        <Form onSubmit = {this.handleCitySearch}>
          <Form.Control type='text' onChange={this.handleChange} placeholder='Input city name'/>
          <Button type='submit'>Explore!</Button>
        </Form>
        <Card>
          <Card.Img variant ="top" src={this.state.icon} />
          <Card.Body>
            <Card.Title>{this.state.location}</Card.Title>
            <div>
              <Card.Text>Latitude: {this.state.lat}</Card.Text>
              <Card.Text>Longitude: {this.state.lon}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
   }
}

export default Map;