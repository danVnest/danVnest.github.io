$(document).ready(function(){function t(t){t?c.height(5*f):c.height(f),d.height(f)}function a(){if(C>1)for(i=k;i<w;i+=k)$("#list .item").slice(i-k,i).wrapAll('<div class="column"></div>');$("#list .item").slice((C-1)*k).wrapAll('<div class="column"></div>');var t=$(window).innerWidth();T=Math.floor(t/$("#list .column").outerWidth()),0==T&&($("#list .column").wrap('<div class="scroller"></div>'),$("#list .scroller").width(t)),$("#list .column").each(function(t){$(this).attr("data-column",t),t%(0!=T?T:1)==0&&$("#list .controls ol").append('<li data-column="'+t+'"></li>')}),$("#list .controls li").click(function(t){t.preventDefault(),$("#list .scroller .column:not(.active)").parents(".scroller").scrollLeft(0),$("#list .active").removeClass("active"),$('#list [data-column="'+$(this).data("column")+'"]').addClass("active"),$("#list .carousel").animate({left:-$("#list .column.active").position().left})}),$("#list .column").first().addClass("active"),$("#list .controls li").first().addClass("active"),$("#list .carousel").animate({left:-$("#list .column.active").position().left}),$("#list .carousel").width($("#list .column").outerWidth()*C).css("margin",(g-k*p)/2+"px 0")}function e(){g=f-$("#list .intro").outerHeight()-$("#list .controls").outerHeight();var t=g-$("#list .carousel").height(),i=T-Math.floor($(window).innerWidth()/$("#list .column").outerWidth());t>=0&&p>=t&&0==i?$("#list .carousel").css("margin",(g-k*p)/2+"px 0"):(k=Math.floor(g/p),C=Math.ceil(w/k),k>0&&($("#list .scroller").contents().unwrap(),$("#list .column").contents().unwrap(),$("#list .controls li").remove(),a()))}function o(){$(window).innerWidth()<582?($("#circle-arrow").attr("d","m0,50 l"+.2*-s.width()+","+.1*f+" 0,50"),$("#switch-arrow").attr("d","m50,125 l0,"+.3*f+" "+.05*-s.width()+","+.1*f),$("#intro-underline-arrow").attr("d","m"+.35*s.width()+",15 l"+.3*s.width()+",0 "+.05*s.width()+",30")):($("#circle-arrow").attr("d","m0,50 l"+(2*$("header .controls").width()-.5*s.width())+","+.4*f+" "+.5*-$("header .controls").width()+",0"),$("#switch-arrow").attr("d","m50,15 l0,"+.5*f+" "+.05*-s.width()+","+.1*f),$("#intro-underline-arrow").attr("d","m"+.35*s.width()+",15 l"+.3*s.width()+",0 "+.05*s.width()+",30"))}function l(){for(;M.outerWidth()<y.width()&&parseInt(M.css("font-size"))<W;)M.css({"font-size":parseInt(M.css("font-size"))+1,padding:parseFloat(M.css("padding"))-.5});for(;M.outerWidth()>y.width();)M.css({"font-size":parseInt(M.css("font-size"))-1,padding:parseFloat(M.css("padding"))+.5})}function r(){$("header .controls .active").removeClass("active");var t=$("header .items .active").animate({opacity:"0"},u),i=t.data("item")+1;0==$('header [data-item="'+i+'"]').length&&(i=0),++m>h&&(m=1),$(".text-colour, .link-colour, .stroke-colour, .background-colour").attr("data-colour-id",m),D=setTimeout(function(){t.removeClass("active"),$('header [data-item="'+i+'"]').addClass("active").filter(".item").animate({opacity:"1"},u)},u),H=setTimeout(r,1e3*$('header [data-item="'+i+'"]').data("duration"))}var s=$("html, body"),c=$("header"),n=$("nav"),d=$("#list"),u=1e3,h=7,m=Math.round(Math.random()*(h-1))+1;$(".text-colour, .link-colour, .stroke-colour, .background-colour").attr("data-colour-id",m);var v="/images/backgrounds/bg"+(Math.round(8*Math.random())+1)+".jpg";$('<img src="'+v+'" />').load(function(){c.css("background",'url("'+v+'") center/cover no-repeat fixed'),$("header .background-overlay").addClass("background-transition").removeClass("solid"),setTimeout(function(){$("header .background-overlay").removeClass("background-transition")},1e3)});var f=$(window).innerHeight()-n.height();t(!0);var w=$("#list .item").last().data("item")+1,p=140,g=f-$("#list .intro").outerHeight()-$("#list .controls").outerHeight(),k=Math.floor(g/p),C=Math.ceil(w/k),T=0;a();var b=0;$(window).scroll(function(){$(window).scrollTop()<c.height()?0!=b&&($("#switch svg").attr("class","stroke-colour"),b=0):1!=b&&($("#switch svg").attr("class","stroke-colour up"),b=1)}),o();var y=$("#notice"),M=$("#notice h1"),W=parseInt(M.css("font-size"));$("#notice .close").click(function(t){t.preventDefault(),y.animate({opacity:0},u/2,function(){$(this).addClass("inactive")})}),l();var z="daniel.vogelnest",x="me.com";$(".email").attr("href","mailto:"+z+"@"+x).text(z+"@"+x),c.animate({height:f},u),setTimeout(function(){$('header [data-item="0"]').addClass("active").filter(".item").animate({opacity:"1"},u)},u);var D,H=setTimeout(r(),1e3*$('header [data-time="0"]').data("duration"));$("header .controls li").click(function(t){if(t.preventDefault(),!$(this).hasClass("active")){clearTimeout(H),clearTimeout(D),$("header .controls .active").removeClass("active"),$(this).addClass("active");var i=$("header .items .active").animate({opacity:"0"},u),a=$('header [data-item="'+$(this).data("item")+'"]');D=setTimeout(function(){i.removeClass("active"),a.addClass("active").filter(".item").animate({opacity:"1"},u)},u),H=setTimeout(r,1e3*a.data("duration"))}}),$("#switch").click(function(t){t.preventDefault(),1==b?s.animate({scrollTop:0},500):s.animate({scrollTop:c.height()},500)});var I=!1,L=!1;$("#list .control-arrow.left").click(function(t){t.preventDefault(),$("#list .scroller .column:not(.active)").parents(".scroller").scrollLeft(0);var i=$("#list .active").removeClass("active"),a=i.data("column")-1;0==$('#list [data-column="'+a+'"]').length&&(a=C-1),$('#list [data-column="'+a+'"]').addClass("active"),$("#list .carousel").animate({left:-$("#list .column.active").position().left}),I?$("#list .control-arrow.left svg").attr("class","stroke-colour"):$("#list .control-arrow.left svg").attr("class","stroke-colour flipped"),I^=1}),$("#list .control-arrow.right").click(function(t){t.preventDefault(),$("#list .scroller .column:not(.active)").parents(".scroller").scrollLeft(0);var i=$("#list .active").removeClass("active"),a=i.data("column")+1;0==$('#list [data-column="'+a+'"]').length&&(a=0),$('#list [data-column="'+a+'"]').addClass("active"),$("#list .carousel").animate({left:-$("#list .column.active").position().left}),L?$("#list .control-arrow.right svg").attr("class","stroke-colour"):$("#list .control-arrow.right svg").attr("class","stroke-colour flipped"),L^=1}),$(window).resize(function(){f=$(window).innerHeight()-n.height(),t(!1),o(),l(),e(),$(window).scrollTop(f*b)})}),$(window).on("beforeunload",function(){$(window).scrollTop(0)});