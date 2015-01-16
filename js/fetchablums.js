function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function getAlbums(){
    var raw = httpGet("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=dangitdang&period=7day&limit=9&api_key=1c21e494edcb40ec472dec0105ec38fa&format=json");
    raw = JSON.parse(raw);
    var albumAmount = 8;
    var albums = raw["topalbums"].album;
    console.log(albums);
    for (var i =0; i < albumAmount ; i++){
        $("#nowplaying").append($("<a>",{
            href: albums[i].url,
            html: $("<img>", {src: albums[i].image[3]["#text"]})
        }));
    }
}
