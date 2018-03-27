//(()=>{
    const artistId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/";
    const app = new Vue({
        el : "#artist",
        data : {
            artist : null,
        },
        filters : {
            toMinutes : sec    => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        }
    });
    fetch(rootURL + artistId)
        .then(res => res.json())
        .then(res => app.artist = res);
//})();