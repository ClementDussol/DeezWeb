//(()=>{
    const trackId = window.location.href.split("id=")[1];
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/";
    const app = new Vue({
        el : "#track",
        data : {
            track : null,
            loading : false,
        },
        filters : {
            toMinutes    : sec   => Math.floor(sec / 60) + "m" + sec % 60 + "s",
            toLocaleDate : date  => new Date(date).toLocaleDateString(), 
        },
        methods : {
            toggleFavorite(item){
                item.isFavorite = !item.isFavorite;
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if(item.isFavorite){
                    favorites.push(item);
                }else{
                    favorites = favorites.filter(otherItem => otherItem.id != item.id);
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
            },
        },
        created(){
            this.loading = true;
            fetch(rootURL + trackId)
            .then(res => res.json())
            .then(res => {
                res.isFavorite = JSON.parse(localStorage.getItem('favorites') || []).find(t => t.id === res.id) ? true : false; 
                this.loading   = false;
                this.track     = res;
            });
        }
    });

//})();