class PlayerDetails {
    constructor(userName, highScore, time, damage) {
        this.userName = userName;
        this.highScore = highScore;
        this.time = time;
        this.damage = damage;
    }

    addToServer() {
        let req = new XMLHttpRequest();
        const newS = {
            key: this.userName,
            data: {
                name: this.userName,
                highscore: this.highScore,
                time: this.time,
                damage: this.damage
            }
        }

        req.open("POST", "https://272.selfip.net/apps/hlvQ3jZ0kh/collections/usersTest/documents/")
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(newS));
    }
    
}
