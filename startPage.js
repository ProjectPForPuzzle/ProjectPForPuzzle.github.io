var flag = true;

function startPage() {
    document.body.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7528fa32-f037-470a-831e-da5a7d6a2621/d37qerr-ed9651f5-024e-4b0f-a1e8-a4c2d4642c83.png/v1/fill/w_1192,h_670,q_70,strp/inception_maze_wallpaper_by_crzisme_d37qerr-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzc1MjhmYTMyLWYwMzctNDcwYS04MzFlLWRhNWE3ZDZhMjYyMVwvZDM3cWVyci1lZDk2NTFmNS0wMjRlLTRiMGYtYTFlOC1hNGMyZDQ2NDJjODMucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GYZelCU7WMNST7COv1Ae0pXQsZtdiGKrjpVHwuV6oGU')";
    document.body.style.backgroundPosition = "center top";
    document.body.style.backgroundSize = "100%";

    var label = document.createElement("label");
    document.body.appendChild(label);
    label.innerHTML = "Enter your name: ";
    label.style.color = "white";
    
    var x = document.createElement("INPUT");
    document.body.appendChild(x);
    x.id = "userInput";
    x.addEventListener('input', userNameStuff);


    var startBtn = document.createElement("button");
    document.body.appendChild(startBtn);
    startBtn.innerHTML = "Start Game";
    startBtn.id = "startBtn";
    // startBtn.classList.add("glow-on-hover");
    startBtn.disabled = true;

    var leaderboard = document.createElement("button");
    document.body.appendChild(leaderboard);
    leaderboard.innerHTML = "Leaderboard";

    leaderboard.onclick = displayData;
}

function userNameStuff() {
    var x = document.getElementById("userInput");
    var startBtn = document.getElementById("startBtn");
    if (x.value.trim().length > 0) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
    startBtn.onclick = moreDetailsBtns;
}

function resetFunction() {
}

function moreDetailsBtns() {
    var playerName = document.getElementById("userInput").value;
    resetFunction();
    playerChar = new PlayerDetails(playerName);
    addToServer(playerName);
}

function comp(a, b) {
    if (a.data.highscore > b.data.highscore) {
        return 1;
     } else { 
        return -1;
     }
     return 0;
}

function displayData() {
    if (flag) {
        let req = new XMLHttpRequest();
        req.open("GET", "https://272.selfip.net/apps/hlvQ3jZ0kh/collections/usersTest/documents/")
        req.send();
        req.addEventListener("load", function() {
            var listOfPpl = JSON.parse(req.responseText);
            let table = document.createElement("table");
            table.setAttribute("id", "tabularData");
            document.body.appendChild(table);
            table.style.color = "white";
            var tBody = document.createElement('tbody');
            table.appendChild(tBody);
            let row = document.createElement("tr");
            tBody.appendChild(row);
    
            var th1 = document.createElement('TH');
            th1.width = '75';
            th1.appendChild(document.createTextNode("Name"));
            row.appendChild(th1);
    
            var th2 = document.createElement('TH');
            th2.width = '75';
            th2.appendChild(document.createTextNode("Score"));
            row.appendChild(th2);
      
            listOfPpl.sort(comp);

            for (var i = 0; i < 5; i++) {
                let tr = document.createElement('TR'); 
                let cell1 = document.createElement("td");
                let cell2 = document.createElement("td");
                tr.appendChild(cell1);
                tr.appendChild(cell2);
                cell1.innerHTML = listOfPpl[i].key;
                cell2.innerHTML = listOfPpl[i].data;
                tBody.appendChild(tr);
            }
        })
        flag = false;
    } else {
        flag = true;
        var table = document.getElementById("tabularData");
        if (table) {
            table.remove();
        }
    }
}