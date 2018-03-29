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
            toMinutes      : sec  => Math.floor(sec / 60) + ":" + ((sec % 60 + '').length == 1 ? '0' + sec % 60 : sec % 60),
            toHoursMinutes : sec  => Math.floor(sec / 3600) + ':' + Math.floor(sec / 60) + ":" + ((sec % 60 + '').length == 1 ? '0' + sec % 60 : sec % 60), 
            toLocaleDate   : date => new Date(date).toLocaleDateString(),
        },
        methods : {
            processFavorites(items){
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                items.forEach(i => i.isFavorite = favorites.find(item => item.id === i.id) ? true : false );
                return items;
            },
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
            fetch(rootURL + albumId)
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                this.processFavorites(res.tracks.data);
                this.album   = res;
                console.log(this.album);
            });
        }
    });
//})();