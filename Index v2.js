/*   Script code To Create an index page */

var numposts = 100;
var showpostthumbnails = true;
var indexWidth = 4;
var thumbWidth = "120px";
var thumbHeight = "90px";
var titleWidth = "100px";
var titleHeight = "90px";
var cellPad = 20;
var tableWidth = 100;
var cellWidth = 120;
var cellHeight = 90;

function lblshow(json) {
    document.write('<style type="text/css">');
    document.write('.sitemap-container {width: 100%;}');
    document.write('.sitemap-container:hover {background-color:#fafafa;}');
    document.write('.thumbnail {width: ' + thumbWidth + '; height: ' + thumbHeight + '; float: center; top:0px;}');
    document.write('.posttitle {padding-top: 1px; vertical-align: top; font-size: small;}');
    document.write('</style>');
    
    document.write('');
    
    var n = 1;
    for (var i = 0; i < numposts; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                var commenttext = entry.link[k].title;
                var commenturl = entry.link[k].href;
            }
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
            }
        }
        var thumburl;
        try {
            thumburl = entry.media.url;
        } catch (error)

        {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl = d;
            } else thumburl = 'http://2.bp.blogspot.com/-fyukB_HLG_w/UbManI7ySAI/AAAAAAAADsM/brwpVvFPtOM/s1600/nothumb.jpg';
        }

        if (showpostthumbnails == true)
          if ( i < json.feed.entry.length - 1 ) {
            if (i == 0){
              document.write('<table width="' + tableWidth + '%" cellpadding="' + cellPad + '">' + '<tbody>' + '<tr>' + '<td width=' + cellWidth + ' height=' + cellHeight + '>'+'<div class="thumbnail">' + '<a href="' + posturl + '"><img id="postimg" src="' + thumburl + '" title="' + posttitle + '" alt="' + posttitle + '" style="width:' + thumbWidth + ';height:' + thumbHeight + ';"/></a>' + '</div>');
              document.write('<div class="posttitle">' + '<a href="' + posturl + '">' + posttitle + '</a>' + '</div>');
              document.write('</td>');
              n = 2;
            } else if (n == 1) {
              document.write('<tr>' + '<td width=' + cellWidth + ' height=' + cellHeight + '>' + '<div class="thumbnail">' + '<a href="' + posturl + '"><img id="postimg" src="' + thumburl + '" title="' + posttitle + '" alt="' + posttitle + '" style="width:' + thumbWidth + ';height:' + thumbHeight + ';"/></a>' + '</div>');
              document.write('<div class="posttitle">' + '<a href="' + posturl + '">' + posttitle + '</a>' + '</div>');
              document.write('</td>');
              n += 1;
            } else if (n > 1 && n < indexWidth) {
              document.write('<td width=' + cellWidth + ' height=' + cellHeight + '>'+'<div class="thumbnail">' + '<a href="' + posturl + '"><img id="postimg" src="' + thumburl + '" title="' + posttitle + '" alt="' + posttitle + '" style="width:' + thumbWidth + ';height:' + thumbHeight + ';"/></a>' + '</div>');
              document.write('<div class="posttitle">' + '<a href="' + posturl + '">' + posttitle + '</a>' + '</div>');
              document.write('</td>');
              n += 1;
            } else if (n == indexWidth){
              document.write('<td width=' + cellWidth + ' height=' + cellHeight + '>' + '<div class="thumbnail">' + '<a href="' + posturl + '"><img id="postimg" src="' + thumburl + '" title="' + posttitle + '" alt="' + posttitle + '" style="width:' + thumbWidth + ';height:' + thumbHeight + ';"/></a>' + '</div>');
              document.write('<div class="posttitle">' + '<a href="' + posturl + '">' + posttitle + '</a>' + '</div>');
              document.write('</td>' + '</tr>');
              n = 1;
            }
          } else {
              document.write('<td width=' + cellWidth + ' height=' + cellHeight + '>' + '<div class="thumbnail">' + '<a href="' + posturl + '"><img id="postimg" src="' + thumburl + '" title="' + posttitle + '" alt="' + posttitle + '" style="width:' + thumbWidth + ';height:' + thumbHeight + ';"/></a>' + '</div>');
              document.write('<div class="posttitle">' + '<a href="' + posturl + '">' + posttitle + '</a>' + '</div>');
              document.write('</td>' + '</tr>' + '</tbody>' + '</table>');
          }

        var towrite = '';
        var flag = 0;

        document.write('<div class="fix"></div>');
        //if (displayseparator == true)
        //    if (i != (numposts - 1))
        //        document.write('');
    }
}