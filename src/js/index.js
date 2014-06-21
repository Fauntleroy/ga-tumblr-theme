var $ = require('jquery');

$(function(){
	$(window).on( 'scroll', function( e ){
		console.log('scrolling',e);
	});
});