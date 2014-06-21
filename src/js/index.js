$ = require('jquery');

$(function(){
	var $window = $(window);
	var $body = $('body');
	$window.scroll( function( e ){
		var scrollHeight = $body.prop('scrollHeight');
		var scrollTop = $body.prop('scrollTop');
		var height = $window.height();
		var scrollRatio = ( scrollTop ) / scrollHeight;
		var blurAmount = ( scrollRatio * 10 ) +'px';
		$body.css({
			'-webkit-filter': 'blur('+ blurAmount +')'
		});
		console.log('aaaaaagh!!!!', blurAmount);
	});
});