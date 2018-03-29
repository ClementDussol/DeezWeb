// manage favorites
const getFavorites = () => JSON.parse(localStorage.getItem("favorites") || []);
const saveFavorites = favorites => localStorage.setItem('favorites', JSON.stringify(favorites));
const processFavorites = items => {
    let favorites = getFavorites();
    items.forEach(i => i.isFavorite = favorites.find(f => f.id === i.id) ? true : false);
}
const toggleFavorite = item => {
    let favorites = getFavorites();
    item.isFavorite = !item.isFavorite;
    favorites = item.isFavorite ? favorites.concat([item]) : favorites.filter(otherItem => otherItem.id != item.id);
    saveFavorites(favorites);
}

const methods = { getFavorites, saveFavorites, processFavorites, toggleFavorite };

// time and dates
const toMinutes      = sec => Math.floor(sec / 60)   + ":" + ((sec % 60 + '').length == 1 ? '0' + sec % 60 : sec % 60);
const toHoursMinutes = sec => Math.floor(sec / 3600) + ':' + toMinutes(sec % 3600);
const toLocaleDate   = str => new Date(str).toLocaleDateString();

const filters = { toMinutes, toHoursMinutes, toLocaleDate };

// requests
const createCallbackHash = () => 'r' + Math.floor(Math.random() * 1000) + Date.now();
const createUrl = (root, params) => {
    let hasParams = root.indexOf('?') >= 0 ? true : false;
    for(let key in params){
        if(!params[key]) continue;
        root += hasParams ? '&' : '?';
        root += key + '=' + params[key];
        hasParams = true;
    }
    return root;
}
const fetchJSONP = url => new Promise((resolve, reject) => {
    let callbackHash     = createCallbackHash()
    window[callbackHash] = resolve;
    let script           = document.createElement('script');
        script.src       = createUrl(url, { output : 'jsonp', callback : callbackHash });
        console.log(script.src);
        script.async     = true;
        script.type      = 'application/javascript';
        script.onerror   = reject;
        script.onload    = () => document.body.removeChild(script);
    
    document.body.appendChild(script);
});

