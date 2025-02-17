export class Coordinate {
  type;
  x;
  y;
  constructor(plainStation) {
    Object.assign(this, plainStation);
  }
}

export class PasslistElement {
  arrival;
  arrivalTimestamp;
  delay;
  departure;
  departureTimestamp;
  location;
  distance;
  id;
  name;
  score;
  prognosis;
  capacity1st;
  capacity2nd;
  platform;
  realtimeAvailability;
  station;

  constructor(plainStation) {
    Object.assign(this, plainStation);
  }
}

export class Root {
  station;
  stationboard;

  constructor(root) {
    Object.assign(this, root);
  }

}

export class Station {
  coordinate;
  distance;
  id;
  name;
  score;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class StationBoardElement {
  capacity1st;
  capacity2nd;
  category;
  categoryCode;
  name;
  number;
  operator;
  passList;
  stop;
  subcategory;
  to;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class Stop {
  station;
  arrival;
  arrivalTimestamp;
  departure;
  departureTimestamp;
  delay;
  platform;
  prognosis;
  realtimeAvailability;
  location;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class Prognosis {
  platform;
  arrival;
  departure;
  capacity1st;
  capacity2nd;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class Location {
  id;
  name;
  score;
  coordinate;
  distance;

  constructor(data) {
    Object.assign(this, data);
  }
}

