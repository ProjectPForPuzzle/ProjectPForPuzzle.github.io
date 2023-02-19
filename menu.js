var audio = new Audio('menu.mp3')
var username = "";

document.body.addEventListener("mousemove", function () {
    audio.play()
})

function saveUser() {
    audio.pause();
    username = $("#hi").val(); 
}
