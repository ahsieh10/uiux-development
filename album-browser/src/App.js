import logo from './logo.svg';
import './App.css';
import { useState} from "react";
import songData from "./assets/all-songs.json";
import SongList from './components/song-list.js';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cart, setCart] = useState({});
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
  const [playlistMinutes, setPlaylistMinutes] = useState(0);
  const [playlistSeconds, setPlaylistSeconds] = useState(0);
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

  return (
    <div className="App">
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <body>
      {
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filter</Accordion.Header>
            <Accordion.Body>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Filter by Artist</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type='checkbox'
                      id='txt'
                      defaultChecked = 'true'
                      label='TXT'
                      onClick={() => changeArtistFilter('TXT')}
                    />
                    <Form.Check
                      type='checkbox'
                      id='seventeen'
                      defaultChecked = 'true'
                      label='Seventeen'
                      onClick={() => changeArtistFilter('Seventeen')}
                    />
                    <Form.Check
                      type='checkbox'
                      id='enhypen'
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
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Filter by Price</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check 
                      type="checkbox"
                      id="range-switch"
                      label="Filter on"
                      onChange={enableRangeFilter}
                    />
                    <>
                    <Form.Label>Display songs under: {Math.floor(length / 60)}:{length % 60}</Form.Label>
                    <Form.Range min='120' max='240' id='song-range' onChange = {changeFilterRange} disabled/>
                    </>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Sort</Accordion.Header>
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
      }
      {
      <SongList lengthFilter = {filterLength} length = {length} artists = {filterArtist} sort = {sort} ascending = {ascending}/>
      }
      </body>
    </div>
  );
}

export default App;
