import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends Component {

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
            <Col key={element.title + element.image_url}>
              <Card>
              <Card.Img variant="top" width='20px'
                src={element.image_url}
                alt={element.title}
                className = "image"
                />
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Movie Summary</Accordion.Header>
                      <Accordion.Body>{element.overview}</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Movie Information</Accordion.Header>
                      <Accordion.Body>
                      <ListGroup as="ol" numbered>
                        <ListGroup.Item variant="info">Released on: {element.released_on}</ListGroup.Item>
                        <ListGroup.Item variant="info">Viewer Rating: {element.average_votes}</ListGroup.Item>
                        <ListGroup.Item variant="info">Number of Votes: {element.total_votes}</ListGroup.Item>
                        <ListGroup.Item variant="info">Popularity Score: {element.popularity}</ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    )
   }
}

export default Movies;