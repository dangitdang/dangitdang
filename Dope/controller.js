var curSelection;

$(function() {
    var lib = Library();
    $('.menu .item').tab();
    var page = 1;
    var maxResults = 10;
    var track;
    $('.search-options').dropdown();
    var color = function() {
        var i = 0
        var colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown'];
        color = function() {
            i += 1;
            return colors[i];
        }
        return colors[i];
    }
    var colorsHex = {
        'red': '#DD241E',
        'orange': '#F47100',
        'yellow': '#FDBE00',
        'olive': '#B5CE00',
        'green': '#0DBC3D',
        'teal': '#00AFA8',
        'blue': '#1683D3',
        'violet': '#642CCC',
        'purple': '#A428CB',
        'pink': '#E23398',
        'brown': '#A6673B'
    }
    var getResults = function(filter, query, index, callback) {
        var url = 'http://hackathon.indabamusic.com/samples?' + filter + '=' + query + '&page=' + index + '&per_page=' + maxResults;
        console.log(url);
        $.get(url).success(function(data) {
            callback(data);
        });
    }
    var bindPlay = function() {
        $('.play-sample').click(function() {
            console.log('hello');
            var link = 'https://d34x6xks9kc6p2.cloudfront.net/' + $(this).attr('data-mp3');
            console.log(link);
            if (!track) {
                track = Track(1, {
                    path: link
                }, function() {
                    track.play();
                });
            } else {
                track.changeSample({
                    path: link
                }, function() {
                    if (track.isPlaying()) {
                        track.stop();
                    }
                    track.play();
                });
            }
        });
    }
    var bindAddToLibrary = function() {
        $('.add-library').click(function(evt) {
            console.log('hello');
            var item = $(this).parents('.item');
            var sample = {
                name: item.attr('data-name'),
                artist: item.attr('data-artist'),
                path: item.attr('data-path'),
                inUse: false
            }
            lib.addSample(sample);
            var item = $('<div>').addClass('item');
            var trackColor = color();
            item.attr({
                'data-path': sample.path,
                'data-color': trackColor
            });
            item.html("<div class='right floated content'> <button class='red small ui button remove-sample'>remove</button> </div> <div class='left floated content'> <div class='ui " + trackColor + " empty massive circular label'></div> </div> <div class='content'> <div class='header'>" + sample.name + " </div> " + sample.artist + " </div>");
            $('.library').append(item);
            bindSelection();
            $('.remove-sample').click(function(evt){
                console.log('hello');
                evt.stopPropagation();
                var item = $(this).parents('.item');
                item.remove();
            });
        });
    }
    var bindSelection = function() {
        $('.library .item').click(function(evt) {
            curSelection = {
                path:'https://d34x6xks9kc6p2.cloudfront.net/' + $(this).attr('data-path'),
                color: colorsHex[$(this).attr('data-color')]
            }
        });
    }
    var displayResult = function(data) {
        $('.results').html('');
        var items = $('<div>');
        items.addClass('ui list divided');
        data.forEach(function(i) {
            var name = i.name;
            var artist = i.artist;
            var s3_key = i.s3_key.slice(0, -3) + "mp3";
            var item = $('<div>').addClass('item').attr({
                'data-name': name,
                'data-artist': artist,
                'data-path': s3_key
            });
            // item.append($('<a>').append($('<i>').addClass)
            item.html("<div class='right floated content'><button class='ui small green button add-library'>Add to Library</button></div><div class='left floated content'><button class='circular ui icon button play-sample' data-mp3=" + "'" + s3_key + "'" + "><i class='middle aligned play icon'></i></button></div>" + "<div class='content'><div class='header'>" + name + "</div>" + "<div class=description>" + artist + "</div></div>")
            console.log(item);
            items.append(item);
        });
        $('.results').append(items);
        bindPlay();
        bindAddToLibrary();
    }
    var addPagingButtons = function(index) {
        $('.paging').html("<div class='ui buttons'><button class='ui button page-button' data-dir='prev'>Prev</button><button class='ui button page-button' data-dir='next'=>Next</button></div>");
        $('.page-button').click(function(evt) {
            var type = $(".search-options option:selected").val(),
                query = $('.search-query').val();
            var dir = $(this).attr('data-dir');
            if (dir === 'prev') {
                getResults(type, query, --page, displayResult);
            } else {
                getResults(type, query, ++page, displayResult);
            }
        });
    }
    $('.search-button').click(function(evt) {
        page = 1;
        var type = $(".search-options option:selected").val(),
            query = $('.search-query').val();
        console.log(type, query);
        getResults(type, query, page, displayResult);
        addPagingButtons(page);
    });
});
