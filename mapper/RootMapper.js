import {
  Coordinate,
  Station,
  PasslistElement,
  Root,
  StationBoardElement,
  Location,
  Prognosis, Stop
} from "../models/BaseObjects.js";

export class RootMapper{

  convertDataset(data){
    let rootElem = new Root(data);
    this.convertStation(rootElem)
    this.convertStationBoard(rootElem)
    return rootElem;
  }

  convertStation(rootElement){
    let station = new Station(rootElement.station)
    station.coordinate = new Coordinate(rootElement.station.coordinate);
    rootElement.station = station;
  }

  convertStationBoard(rootElement){
    let convertedStationboard=[];
    rootElement.stationboard.forEach((plainStationBoardElem) => {
      let stationBoardElem = new StationBoardElement(plainStationBoardElem)
      this.convertPassList(plainStationBoardElem.passList,stationBoardElem)
      stationBoardElem.stop = new Stop(stationBoardElem.stop)
      stationBoardElem.stop.location = new Location(stationBoardElem.stop.location)
      this.convertStation(stationBoardElem.stop)
      stationBoardElem.stop.prognosis = new Prognosis(stationBoardElem.stop.prognosis)
      convertedStationboard.push(stationBoardElem)
    });
    rootElement.stationboard =convertedStationboard;
  }

  convertPassList(passListPlain, stationBoardElem) {
    let passListCurrent = []
    passListPlain.forEach((plainElem) => {
      let passListElem = new PasslistElement(plainElem)
      passListElem.location = new Location(plainElem.location)
      passListElem.location.coordinate = new Coordinate(plainElem.location.coordinate)
      passListElem.prognosis = new Prognosis(plainElem.prognosis)
      this.convertStation(passListElem)
      passListCurrent.push(passListElem)
    });
    stationBoardElem.passList = passListCurrent;
  }

}


