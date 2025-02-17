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

                    currentLine.stopsInStationTwo = "true"
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
        datasetStationTwo.stationboard.forEach((stationBoardElem) =>{
            if(stationBoardCurrentSet.number === stationBoardElem.number ){
                return true;
            }
        })
        return false;
    }
    static getTimeAtStationTwo(stationBoardCurrentSet,datasetStationTwo) {
        datasetStationTwo.stationboard.forEach((stationBoardElem) =>{
            if(stationBoardCurrentSet.number === stationBoardElem.number ){
                return stationBoardElem.stop.prognosis.departure;
            }
        });
        return "-";
    }

}
