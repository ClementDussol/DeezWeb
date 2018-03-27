//(()=>{
    const trackId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/";
    const app = new Vue({
        el : "#track",
        data : {
            track : null,
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        }
    });
    fetch(rootURL + trackId)
        .then(res => res.json())
        .then(res => app.track = res);
//})();