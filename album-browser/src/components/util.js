export function timeInSeconds(minutes, seconds){
    return minutes * 60 + seconds;
}

export function compareAscend(item1, item2){
    if(timeInSeconds(item1.minutes, item1.seconds) != timeInSeconds(item2.minutes, item2.seconds)){
        return timeInSeconds(item1.minutes, item1.seconds) - timeInSeconds(item2.minutes, item2.seconds);
    } else {
        return item1.name.localeCompare(item2.name);
    }
}

export function compareDescend(item1, item2){
    if(timeInSeconds(item1.minutes, item1.seconds) != timeInSeconds(item2.minutes, item2.seconds)){
        return timeInSeconds(item2.minutes, item2.seconds) - timeInSeconds(item1.minutes, item1.seconds);
    } else {
        return item2.name.localeCompare(item1.name);
    }
}