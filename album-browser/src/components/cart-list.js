import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from './cart';

export default function CartList(props){
    return (
        <ListGroup >
            {props.cart.map((song, index) => (
        <CartItem item={song} cartRemover={props.cartRemover}/>
      ))}
        </ListGroup>
    );
}