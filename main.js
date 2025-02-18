import {RootMapper} from "./mapper/RootMapper.js";
import {DataPrinter} from "./DataPrinter.js";


class Solution {

    static onFirstStationReceivedSuccessful(data) {
        let mapper = new RootMapper();
        let dataset = mapper.convertDataset(data)
        DataPrinter.printTimetable(dataset);
    }

    static onBothStationReceivedSuccessful(dataStations) {
        let mapper = new RootMapper();
        let dataFirst = mapper.convertDataset(dataStations[0]);
        let dataSecond = mapper.convertDataset(dataStations[1]);
        DataPrinter.printTimetableForBothStations(dataFirst, dataSecond);
    }

    static main() {
        const urlTrainstationOne = "http://transport.opendata.ch/v1/stationboard?station=Basel&limit=40%22";
        const urlTrainstationTwo = "http://transport.opendata.ch/v1/stationboard?station=Zurich&limit=40%22";

        Solution.getDataFirstTrainStation(urlTrainstationOne).then(this.onFirstStationReceivedSuccessful);
        Solution.getDataFromBothTrainStations(urlTrainstationOne, urlTrainstationTwo).then(this.onBothStationReceivedSuccessful)

    }

    static async getDataFirstTrainStation(url) {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Response status: ${response.status}`);
        }
        return await response.json();

    }

    static async getDataFromBothTrainStations(dataStaionOne, dataStationTwo) {
        return await Promise.all([this.getDataFirstTrainStation(dataStaionOne), this.getDataFirstTrainStation(dataStationTwo)]);
    }
}

Solution.main()






