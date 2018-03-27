//(()=>{
    const albumId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/";
    const app = new Vue({
        el : "#album",
        data : {
            album : null,
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        }
    });
    fetch(rootURL + albumId)
        .then(res => res.json())
        .then(res => app.album = res);
//})();