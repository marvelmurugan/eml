/* Author : Tushar Sharma , Source : Google
*  TOC 3 - Tab option
*  Table of content with Tab Navigation
*/
var tabbedTOC_defaults={blogUrl:"http://www.marvelmurugan.com",containerId:"tabbed-toc",activeTab:1,showDates:!1,showSummaries:!1,numChars:200,showThumbnails:!1,thumbSize:40,noThumb:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",monthNames:"Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember".split(" "),newTabLink:!0,maxResults:99999,preload:0,sortAlphabetically:!0,showNew:!1,
newText:" - <em style='color:red;'>Baru!</em>"},i;for(i in tabbedTOC_defaults)tabbedTOC_defaults[i]=void 0!==typeof tabbedTOC[i]&&"undefined"!==typeof tabbedTOC[i]?tabbedTOC[i]:tabbedTOC_defaults[i];
function clickTab(c){for(var e=document.getElementById(tabbedTOC_defaults.containerId),b=e.getElementsByTagName("ol"),e=e.getElementsByTagName("ul")[0].getElementsByTagName("a"),f=0;f<b.length;f++)b[f].style.display="none",b[parseInt(c,10)].style.display="block";for(b=0;b<e.length;b++)e[b].className="",e[parseInt(c,10)].className="active-tab"}
function showTabs(c){var e=parseInt(c.feed.openSearch$totalResults.$t,10),b=tabbedTOC_defaults,f=c.feed.entry;c=c.feed.category;for(var a="",a=0;a<(!0===b.showNew?5:b.showNew)&&a!=f.length;a++)f[a].title.$t+=!1!==b.showNew?b.newText:"";f=b.sortAlphabetically?f.sort(function(a,b){return a.title.$t.localeCompare(b.title.$t)}):f;c=b.sortAlphabetically?c.sort(function(a,b){return a.term.localeCompare(b.term)}):c;for(var a='<span class="divider-layer"></span><ul class="toc-tabs">',g=0,m=c.length;g<m;g++)a+=
'<li class="toc-tab-item-'+g+'"><a href="javascript:clickTab('+g+');">'+c[g].term+"</a></li>";a+='</ul><div class="toc-content">';g=0;for(m=c.length;g<m;g++){for(var a=a+('<ol class="panel" data-category="'+c[g].term+'"'),a=a+(g!=b.activeTab-1?' style="display:none;"':""),a=a+">",l=0;l<e&&l!=f.length;l++){var p,d=f[l],k=d.published.$t,h=b.monthNames,q=d.title.$t,r="summary"in d&&!0===b.showSummaries?d.summary.$t.replace(/<br ?\/?>/g," ").replace(/<.*?>/g,"").replace(/[<>]/g,"").substring(0,b.numChars)+
"&hellip;":"",s="media$thumbnail"in d&&!0===b.showThumbnails?'<img class="thumbnail" style="width:'+b.thumbSize+"px;height:"+b.thumbSize+'px;" alt="" src="'+d.media$thumbnail.url.replace(/\/s72(\-c)?\//,"/s"+b.thumbSize+"-c/")+'"/>':'<img class="thumbnail" style="width:'+b.thumbSize+"px;height:"+b.thumbSize+'px;" alt="" src="'+b.noThumb.replace(/\/s72(\-c)?\//,"/s"+b.thumbSize+"-c/")+'"/>',n=d.category?d.category:[],k=b.showDates?'<time datetime="'+k+'" title="'+k+'">'+k.substring(8,10)+" "+h[parseInt(k.substring(5,
7),10)-1]+" "+k.substring(0,4)+"</time>":"",h=0;for(;h<d.link.length;h++)if("alternate"==d.link[h].rel){p=d.link[h].href;break}d=0;for(h=n.length;d<h;d++){var t=b.newTabLink?' target="_blank"':"";n[d].term==c[g].term&&(a+='<li title="'+n[d].term+'"',a+=b.showSummaries?' class="bold"':"",a+='><a href="'+p+'"'+t+">"+q+k+"</a>",a+=b.showSummaries?'<span class="summary">'+s+r+'<span style="display:block;clear:both;"></span></span>':"",a+="</li>")}}a+="</ol>"}a+="</div>";a+='<div style="clear:both;"></div>';
document.getElementById(b.containerId).innerHTML=a;clickTab(b.activeTab-1)}(function(){var c=document.getElementsByTagName("head")[0],e=document.createElement("script");e.type="text/javascript";e.src=tabbedTOC_defaults.blogUrl+"/feeds/posts/summary?alt=json-in-script&max-results="+tabbedTOC_defaults.maxResults+"&orderby=published&callback=showTabs";"onload"!==tabbedTOC_defaults.preload?setTimeout(function(){c.appendChild(e)},tabbedTOC_defaults.preload):window.onload=function(){c.appendChild(e)}})();