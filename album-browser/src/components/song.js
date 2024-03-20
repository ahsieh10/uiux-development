import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Song(props){
    return(
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.item.image} />
        <Card.Body>
            <Card.Title>{props.item.name}</Card.Title>
            <Card.Text>
            {props.item.artist}
            </Card.Text>
            <Card.Text>
            {props.item.minutes}:{(props.item.seconds).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}
            </Card.Text>
            <Button variant="primary">Add To playlist</Button>
      </Card.Body>
    </Card>
    );
}