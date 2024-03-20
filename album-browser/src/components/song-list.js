import songData from '../assets/all-songs.json';
import { timeInSeconds, compareAscend, compareDescend } from './util';
import Song from './song.js';

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
        <div>
            {finalList.map((song, index) => (
        <Song item={song}/>
      ))}
        </div>
    );
}