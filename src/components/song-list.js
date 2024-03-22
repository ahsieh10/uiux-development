import songData from '../assets/all-songs.json';
import { timeInSeconds, compareAscend, compareDescend } from './util';
import Song from './song.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

export default function SongList(props){
    var finalList = [...songData];
    if(props.lengthFilter){
        var newList = [];
        for (const index in finalList){
            const item = finalList[index];
            if(timeInSeconds(item.minutes, item.seconds) <= props.length){
                newList.push(item);
            }
        }
        finalList = newList;
    }
    var newList = [];
    for (const index in finalList){
        const item = finalList[index];
        if(props.artists[item.artist] == true){
            newList.push(item);
        }
    }
    finalList = newList;
    if(props.sort){
        if(props.ascending){
            finalList.sort(compareAscend);
        } else {
            finalList.sort(compareDescend);
        }
    }
    return (
        <div id = 'song-list'>
        {
            <Container>
                <Row lg={4}>
                    {
                        finalList.slice(0, 4).map((song, index) => (
                            <Song item={song} cartAdder={props.cartAdder}/>
                          ))
                    }
                </Row>
                <Row lg={4}>
                    {
                        finalList.slice(4, 8).map((song, index) => (
                            <Song item={song} cartAdder={props.cartAdder}/>
                          ))
                    }
                </Row>
                <Row lg={4}>
                    {
                        finalList.slice(8, 12).map((song, index) => (
                            <Song item={song} cartAdder={props.cartAdder}/>
                          ))
                    }
                </Row>
            </Container>
        }  
        </div>
    );
}