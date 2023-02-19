var globalUserName;
var globalHighScore;
var globalTime;
var globalDamage;

var PlayerDetails = function(userName, highScore, time, damage) {
    globalUserName = userName;
    globalHighScore = highScore | 0;
    globalTime = time | 0;
    globalDamage = damage | null;
}

function addToServer(value) {
    let req = new XMLHttpRequest();
    const newS = {
        key: globalUserName,
        data: {
            name: globalUserName,
            highscore: globalHighScore,
            time: globalTime,
            damage: globalDamage
        }
    }

    req.open("GET", "https://272.selfip.net/apps/hlvQ3jZ0kh/collections/usersTest/documents/")
    req.send();
    req.addEventListener("load", function() {
        var listOfPpl = JSON.parse(req.responseText);
        for (let i = 0; i < listOfPpl.length; i++) {
            if (listOfPpl[i].key == value) {
                return;
            }
        } 

    });

    req.open("POST", "https://272.selfip.net/apps/hlvQ3jZ0kh/collections/usersTest/documents/")
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(newS));
    
}