import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function Song(props){
    return(
      <Col style={{padding: '20px'}}>
        <Card style={{ width: '15rem'}} className="Bootstrap-Card" >
          <Card.Img variant="top" src={props.item.image} />
          <Card.Body>
              <Card.Title><p className='song-title'>{props.item.name}</p></Card.Title>
              <Card.Text>
              {props.item.artist}
              </Card.Text>
              <Card.Text>
              {props.item.minutes}:{(props.item.seconds).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}
              </Card.Text>
              <Button variant="primary" onClick={() => {
                props.cartAdder(props.item)
              }}>Add To playlist</Button>
        </Card.Body>
      </Card>
      </Col>
    );
}