function getFromServer() {
    let req = new XMLHttpRequest();

    req.open("GET", "https://272.selfip.net/apps/hlvQ3jZ0kh/collections/users/documents/")
    req.send();
    req.addEventListener("load", function() {
        var listOfPpl = JSON.parse(req.responseText);
    })
}

