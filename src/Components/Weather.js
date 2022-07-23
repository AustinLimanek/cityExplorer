import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: true,
    }
 }

  render() {
    return (
      <Row>
        {this.props.data && (this.props.data.data.map(element =>
          <Col key={element.date}>
            <Card>
              <Card.Body>
                <Card.Title>{element.date}</Card.Title>
                <Card.Text>{element.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
   }
}

export default Weather;