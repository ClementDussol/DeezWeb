//(()=>{
    const artistId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/";
    const app = new Vue({
        el : "#artist",
        data : {
            artist : null,
            loading : false,
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        },
        created(){
            this.loading = true;
            fetch(rootURL + artistId)
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                this.artist  = res; 
                console.log(res);
            });
        }
    });
//})();