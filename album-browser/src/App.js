import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { useState} from "react";
import songData from "./assets/all-songs.json";
import SongList from './components/song-list.js';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import CartList from './components/cart-list.js';
import Button from 'react-bootstrap/Button';
import { timeInSeconds } from './components/util.js';
import ListGroup from 'react-bootstrap/ListGroup';


songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cart, setCart] = useState([]);
  const [length, setLength] = useState(190);
  const [filterLength, setFilterLength] = useState(false);
  const [filterArtist, setFilterArtist] = useState({
    'TXT':true,
    'Seventeen':true,
    'Enhypen':true,
    'aespa':true,
  }); //change based on artists
  const [sort, setSort] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [playlistLength, setPlaylistLength] = useState(0);
  function changeArtistFilter(artist){
    const filterArtistCopy = {...filterArtist};
    filterArtistCopy[artist] = !filterArtistCopy[artist];
    setFilterArtist(filterArtistCopy);
  }

  const changeSorted = () => {
    const elem = document.getElementById('isSorting');
    if(elem.disabled){
      elem.disabled = false;
      setSort(true);
    } else {
      elem.disabled = true;
      setSort(false);
    }
  }

  function removeSong(song){
    const index = cart.indexOf(song);
    var newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setPlaylistLength(playlistLength - timeInSeconds(song.minutes, song.seconds));
  }

  const changeSortingMethod = () => {
    const allFields = document.getElementById('isSorting');
    if(!allFields.disabled){
      setAscending(!ascending);
    }
  }

  const enableRangeFilter = () => {
    const elem = document.getElementById('song-range');
    if(elem.disabled){
      elem.disabled = false;
      setFilterLength(true);
    } else {
      elem.disabled = true;
      setFilterLength(false);
    }
  }

  const changeFilterRange = () => {
    const elem = document.getElementById('song-range');
    setLength(elem.value);
    console.log(elem.value);
  }

  function addToCart(song){
    var newCart = [...cart];
    newCart.push(song);
    setCart(newCart);
    setPlaylistLength(playlistLength + timeInSeconds(song.minutes, song.seconds));
  }

  const resetFilters = () => {
    setLength(190);
    document.getElementById('song-range').value=190;
    setFilterLength(false);
    document.getElementById('range-switch').checked=false;
    document.getElementById('song-range').disabled = true;
    setFilterArtist({
      'TXT':true,
      'Seventeen':true,
      'Enhypen':true,
      'aespa':true,
    });
    //FIGURE OUT UI
    const keys = Object.keys(filterArtist);
    for(var i = 0; i < keys.length; i++){
      console.log(i);
      var elem = document.getElementById(keys[i]);
      elem.checked=true;
    }
    setSort(false);
    document.getElementById('sort').checked=false;
    setAscending(true);
    document.getElementById('sort-ascending').checked=true;
    document.getElementById('isSorting').disabled=true;
  }

  return (
    <div className="App">
      <header>
      </header>
      <body>
        <h1>
          Playlist Curator
        </h1>
        <div id='page'>
            <div id='filters'>
              <Accordion style={{border: '20px'}} alwaysOpen>
                <Accordion.Item eventKey="0" className='filter-item'>
                  <Accordion.Header><p className='filter-head'>Filter</p></Accordion.Header>
                  <Accordion.Body>
                    <Accordion alwaysOpen>
                      <Accordion.Item eventKey="0" className='filter-item'>
                        <Accordion.Header>Filter by Artist</Accordion.Header>
                        <Accordion.Body>
                          <Form.Check
                            type='checkbox'
                            id='TXT'
                            defaultChecked = 'true'
                            label='TXT'
                            onClick={() => changeArtistFilter('TXT')}
                          />
                          <Form.Check
                            type='checkbox'
                            id='Seventeen'
                            defaultChecked = 'true'
                            label='Seventeen'
                            onClick={() => changeArtistFilter('Seventeen')}
                          />
                          <Form.Check
                            type='checkbox'
                            id='Enhypen'
                            defaultChecked = 'true'
                            label='Enhypen'
                            onClick={() => changeArtistFilter('Enhypen')}
                          />
                          <Form.Check
                            type='checkbox'
                            id='aespa'
                            defaultChecked = 'true'
                            label='aespa'
                            onClick={() => changeArtistFilter('aespa')}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1" className='filter-item'>
                        <Accordion.Header>Filter by Length</Accordion.Header>
                        <Accordion.Body>
                          <ListGroup>
                          <ListGroup.Item >
                          <div>Filter On</div>
                          <input type='checkbox' onChange={enableRangeFilter} label='Filter on' id='range-switch'></input>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <>
                              <Form.Label>Display songs under: {Math.floor(length / 60)}:{(length % 60).toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}</Form.Label>
                              <Form.Range min='120' max='240' id='song-range' onChange = {changeFilterRange} disabled/>
                              </>
                          </ListGroup.Item>
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='filter-item'>
                  <Accordion.Header><p className='filter-head'>Sort</p></Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type='checkbox'
                      id='sort'
                      label='Sort'
                      onClick = {changeSorted}
                    />
                    <Form onChange = {changeSortingMethod}>
                      <fieldset id='isSorting' disabled>
                        <Form.Check
                          type='radio'
                          name='sort'
                          id='sort-ascending'
                          label='Sort by time duration (ascending)'
                          defaultChecked
                        />
                        <Form.Check
                          type='radio'
                          name='sort'
                          id='sort-descending'
                          label='Sort by time duration (descending)'
                        />
                      </fieldset>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            <Button onClick={resetFilters} className='reset'>Reset Filters</Button>
          </div>
          <SongList lengthFilter = {filterLength} length = {length} artists = {filterArtist} sort = {sort} ascending = {ascending} cartAdder={addToCart}/>
        <div class='cart-list'>
        <div class='cart-total'>
        Total length of playlist: 
        </div>
        <div class='cart-time'>
        {Math.floor(playlistLength / 60)}:{(playlistLength % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
        </div>
        <CartList cart={cart} cartRemover={removeSong}/>
      </div>
        </div>
      </body>
    </div>
  );
}

export default App;
