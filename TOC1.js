/* Author : Tushar Sharma, Code Source From Google
*  Add Table of Content TOC - 1
*  TOC with Sort & Filter option  */
var all_entries,entries,all_labels=[],json;function createEntries(a){var b=[];a=a.feed.entry;for(var c=0;c<a.length;c++){var d=a[c],e={};e.id=d.id.$t;e.title=d.title.$t;e.href=getEntryHref(d);e.content=getEntryContent(d);e.labels=getEntryLabels(d);e.published=d.published.$t.substr(0,10);b.push(e)}return b}function getEntryById(a){for(var b=0;b<all_entries.length;b++)if(all_entries[b].id==a)return all_entries[b];return null}function getEntryContent(a){return a.content?a.content.$t:a.summary.$t}
function getEntryHref(a){a=a.link;for(var b=0;b<a.length;b++)if("alternate"==a[b].rel)return a[b].href;return null}function getEntryLabels(a){var b=[];a=a.category;if(!a)return b;for(var c=0;c<a.length;c++){var d=a[c].term;isExists(all_labels,d)||all_labels.push(d);b.push(d)}return b}function getSomeEntries(a){entries=[];for(var b=0;b<all_entries.length;b++){var c=all_entries[b];a(c)&&entries.push(c)}return entries}function isExists(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1}
function onLoadFeed(a){json=a;setTimeout("onLoadFeedTimeout()",100)}function onLoadFeedTimeout(){all_entries=entries=createEntries(json);showHeaderOption();showEntries(entries)}function showEntries(a){for(var b="",c=0;c<a.length;c++)var d=a[c],b=b+"<p>",b=b+titleCode(d),b=b+("<span style='font-size:80%;'>"+footlabel+" "+labelsCode(d)),b=b+(" "+footon+" "+publishedDateCode(d)+"</span>"),b=b+"</p>";document.getElementById("cl_content_list").innerHTML=b}
function showHeaderOption(){var a;a="<table border='0' cellpadding='3'><tr>";a+="<td style='text-align:right;'>"+sortby;a+="<td><select onchange='sortBy(this.value.substr(1), this.value.substr(0,1))' style='width:100%;'>";a+="<option value='0published'>"+timepub+"</option>";a+="<option value='1title'>"+ptitle+"</option>";a+="</select>";a+="<tr>";a+="<td style='text-align:right'>"+labelsort;a+="<td><select onchange='showPostsWLabel(this.value)' id='cl_labels' style='width:100%;'>";a+="<option value='*'>"+
showall+"</option>";for(var b=0;b<all_labels.length;b++){var c=all_labels[b];a+="<option value='"+c+"'>"+c+"</option>"}a+="</select>";a+="<tr>";a+="<td><td><button onclick='showPostsWLabel(\"*\");'>"+showall+"</button>";a+="</table>";document.getElementById("cl_option").innerHTML=a}function shortenContent(a){var b=a.content,b=stripHTML(b);b.length>cl_summlen&&(b=b.substr(0,cl_summlen)," "!=b.charAt(b.length-1)&&(b=b.substr(0,b.lastIndexOf(" ")+1)),b+="...");return a.content=b}
function showHideSummary(a){for(var b=a.nextSibling;"cl_content"!=b.className;)b=b.nextSibling;var c=getEntryById(b.id),c=shortenContent(c);""==b.innerHTML?(b.innerHTML=c+"<br/>",a.innerHTML="&#9660;",a.title=hidesum):(b.innerHTML="",a.innerHTML="&#9658;",a.title=showsum)}function sortBy(a,b){entries.sort(function(c,d){return c[a]==d[a]?0:"1"==b?c[a].toLowerCase()>d[a].toLowerCase():c[a].toLowerCase()<d[a].toLowerCase()});showEntries(entries)}
function stripHTML(a){for(var b,c=!1,d="",e=0;e<a.length;e++)b=a.charAt(e),"<"==b?c=!0:">"==b&&(c=!1),">"==b?d+=" ":c||(d+=b);return d}function labelsCode(a){var b="";if(0==a.labels.length)return" (tidak berlabel) ";for(var c=0;c<a.labels.length;c++)var d=a.labels[c],b=b+("<a href='javascript:showPostsWLabel(\""+d+"\")' "),b=b+("title='"+showlabel+" "+d+"'>"+d+"</a>"),b=b+(c!=a.labels.length-1?", ":"");return b}
function publishedDateCode(a){var b=a.published.substr(0,4),c=a.published.substr(5,2);a=a.published.substr(8,2);var d;d="<a href='javascript:showPostsInDate(\""+b+"\")' title='"+b+"'>"+b+"</a>/"+("<a href='javascript:showPostsInDate(\""+b+"-"+c+"\")' title='"+b+"/"+c+"'>"+c+"</a>/");return d+="<a href='javascript:showPostsInDate(\""+b+"-"+c+"-"+a+"\")'title='"+b+"/"+c+"/"+a+"'>"+a+"</a>"}
function titleCode(a){var b="<span title='"+showsum+"' onclick='showHideSummary(this)' style='cursor:pointer'>&#9658;</span> ",b=b+("<b><a href='"+a.href+"'>"+a.title+"</a></b><br/>");return b+="<span class='cl_content' id='"+a.id+"'></span>"}function showPostsInDate(a){var b=getSomeEntries(function(b){return 0==b.published.indexOf(a)});showEntries(b)}
function showPostsWLabel(a){var b=getSomeEntries(function(b){if("*"==a)return!0;for(var d=0;d<b.labels.length;d++)if(b.labels[d]==a)return!0;return!1});showEntries(b);document.getElementById("cl_labels").value=a};
