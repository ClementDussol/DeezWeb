//(()=>{
    const albumId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/";
    const app = new Vue({
        el : "#album",
        data : {
            album   : null,
            loading : false,
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        },
        created(){
            this.loading = true;
            fetch(rootURL + albumId)
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                this.album   = res;
            });
        }
    });
//})();