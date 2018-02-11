$(function() {
    var $content = $('#insights .grid');
    var data = {
        rss_url: 'https://insights.singinggrass.com/feed'
    };
    
    $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
    if (response.status == 'ok') {
        var output = '';
        $.each(response.items, function(k, item) {
            output += '<div>';
            //output += '<h3><a href="' + item.link + '" >' + item.title + '</h3></a>';
            output += '<h3>' + item.title + '</h3>';
            //output += '<p>' + item.description + '</p>';

            var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
var src = item.description.substring(srcStart, srcEnd); // Extract just the URL

            output += '<img style="max-width:100%;" src="' + src + '" />';
            output += '</div>';

            console.log(item);
        });
        $content.html(output);
    }
    });
});