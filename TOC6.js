// Blogger Recent Posts Gallery – Script Code 
  var bsrpg_thumbSize = 120; 
  var bsrpg_showTitle = true; 
function bsrpGallery(root) {
    var entries = root.feed.entry || [];
    var html = ['<div class="bsrp-gallery nopin" title="Get this from www.marvelmurugan.com">'];
    for (var i = 0; i < entries.length; ++i) {
        var post = entries[i];
        var postTitle = post.title.$t;
        var orgImgUrl = post.media$thumbnail ? post.media$thumbnail.url : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
        var newImgUrl = orgImgUrl.replace('s72-c', 's' + bsrpg_thumbSize + '-c');
        var links = post.link || [];
        for (var j = 0; j < links.length; ++j) {
            if (links[j].rel == 'alternate') break;
        }
        var postUrl = links[j].href;
        var imgTag = '<img src="' + newImgUrl + '" width="' + bsrpg_thumbSize + '" height="' + bsrpg_thumbSize + '"/>';
        var pTitle = bsrpg_showTitle ? '<span class="ptitle">' + postTitle + '</span>' : '';
        var item = '<a href="' + postUrl + '" target="_blank" title="' + postTitle + '">' + imgTag + pTitle + '</a>';
        html.push('<div class="bs-item">', item, '</div>');
    }
    html.push('</div>');
    document.write(html.join(""));
}