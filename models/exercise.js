class Exercise {
    constructor(userid, desc, duration, date = new Date()) {
        this.userId = userid;
        this.description = desc;
        this.duration = duration;
        this.date = date;
    }
}

module.exports = Exercise;