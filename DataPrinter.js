class LineOnBoard {
    from;
    to;
    delayed;
    originTime;
    prognostedTime;
    typ;
    name;
    platform;
}
class LineOnBoardEmsChur {
    from;
    to;
    delayed;
    originTime;
    prognostedTime;
    typ;
    name;
    platform;
    stopsInStationTwo;
    stopTimeInStationTwo;
}

export class DataPrinter {
    static printTimetable(data) {
        console.log("Station  %s", data.station.name)
        let tableForPrint = []

        data.stationboard.forEach((stationBoardElement) => {
                let currentLine = new LineOnBoard();
                currentLine.from = data.station.name;
                currentLine.to = stationBoardElement.to;
                currentLine.delayed = stationBoardElement.passList[0].delay;
                currentLine.originTime = stationBoardElement.stop.departure;
                currentLine.prognostedTime = stationBoardElement.stop.prognosis.departure;
                currentLine.typ = stationBoardElement.category;
                currentLine.name = stationBoardElement.name;
                currentLine.platform = stationBoardElement.stop.platform;

                tableForPrint.push(currentLine);
            }
        )
        console.table(tableForPrint);


    }

    static printTimetableForBothStations(datasetStationOne, datasetStationTwo) {
        console.log("Station  %s", datasetStationOne.station.name)
        let tableForPrint = []

        datasetStationOne.stationboard.forEach((stationBoardElement) => {
                let currentLine = new LineOnBoardEmsChur();
                currentLine.from = datasetStationOne.station.name;
                currentLine.to = stationBoardElement.to;
                currentLine.delayed = stationBoardElement.passList[0].delay;
                currentLine.originTime = stationBoardElement.stop.departure;
                currentLine.prognostedTime = stationBoardElement.stop.prognosis.departure;
                currentLine.typ = stationBoardElement.category;
                currentLine.name = stationBoardElement.name;
                currentLine.platform = stationBoardElement.stop.platform;
                if(this.checkIfStopsInStationTwo(stationBoardElement,datasetStationTwo)){

                    currentLine.stopsInStationTwo = datasetStationTwo.station.name
                    currentLine.stopTimeInStationTwo = this.getTimeAtStationTwo(stationBoardElement,datasetStationTwo)

                }else{
                    currentLine.stopsInStationTwo = "-"
                    currentLine.stopTimeInStationTwo = "-"
                }

                tableForPrint.push(currentLine);
            }
        )
        console.table(tableForPrint);
    }
    static checkIfStopsInStationTwo(stationBoardCurrentSet, datasetStationTwo) {
        let found = false;
        datasetStationTwo.stationboard.forEach((stationBoardElem) =>{
            let trainNumberOne=this.removeZerosAtStart(stationBoardCurrentSet.name);
            let trainNumberTwo=this.removeZerosAtStart(stationBoardElem.name);
            if(trainNumberOne === trainNumberTwo ){
                found=true;
            }
        })
        return found;
    }
    static getTimeAtStationTwo(stationBoardCurrentSet, datasetStationTwo) {
        let currentTime ="-";
        datasetStationTwo.stationboard.forEach((stationBoardElem) =>{
            let trainNumberOne=this.removeZerosAtStart(stationBoardCurrentSet.name);
            let trainNumberTwo=this.removeZerosAtStart(stationBoardElem.name);
            if(trainNumberOne === trainNumberTwo ){
                currentTime =stationBoardElem.stop.prognosis.departure;
            }
        });
        return currentTime;
    }
    static removeZerosAtStart(currentTrainName){
        if (currentTrainName === undefined){
            return "-"
        }
        return currentTrainName.replace(/^0+/, '')

    }
}
