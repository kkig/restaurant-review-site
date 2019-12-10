export default class ShopDataItem {
    constructor(id, name, type, address, lat, long, avgRating, ratings, dataSrc) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.avgRating = avgRating;
        this.ratings = ratings;
        this.dataSrc = dataSrc;
    }
};