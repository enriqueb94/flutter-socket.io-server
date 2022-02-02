"use strict";
class Bands {
    constructor () {
        this.bands = [];
    }

    addBands (band = new Band()) {
        this.bands.push(band);
    }

    getBands () {
        return this.bands;
    }

    deleteBand (id = "") {
        this.bands = this.bands.filter((el) => el.id !== id);
    }

    voteBand (id = "") {
        this.bands = this.bands.map((el) => {
            if (el.id === id) {
                el.votes++;
                return el;
            } else {
                return el;
            }
        });
    }
}

module.exports = Bands;
