import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

export default function CartItem(props){
    return(
        <ListGroup.Item as="li" style={{backgroundColor:'pink'}}>
            <CloseButton onClick={() => {
                props.cartRemover(props.item);
            }}/>
            <div>{props.item.name}</div>
            <img src= {props.item.image} class='playlist'/>
        </ListGroup.Item>
    );
}