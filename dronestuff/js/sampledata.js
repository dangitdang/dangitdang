function droneFlight(dateString, flightPath) {
    this.date = new Date(dateString);
    this.flightPath = flightPath;
}

droneFlight.prototype.getDateInt = function(){
    return this.date.valueOf();
}

droneFlight.prototype.getDateStr = function(){
    var pre = this.date.toDateString();
    return pre.slice(4);
}

droneFlight.prototype.getFlightPath = function(){
    return this.flightPath;
}


function compareFlight(a,b){
    if (a.getDateInt() > b.getDateInt()) {
        return 1;
    }
    if (a.getDateInt() < b.getDateInt()) {
        return -1;
    }
    return 0;
}
