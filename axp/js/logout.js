(function() {
	$.ajax({
		type: "get",
		url: "http://localhost:3000/logout",
		async: true,
		dataType: "jsonp",
		jsonpCallback: "logout",
		success: function(json) {
			if(json.success == '0') {
				$('.nav.navbar-nav.navbar-right li').html('<a href="javascript:void(0)" onclick="$.getScript(\'js/login.js\')">sing&nbsp;in</a>');
				$(".nav.navbar-nav li").each(function() {
						if($(this).hasClass('active')) {
							//console.log('true');
							$(this).trigger('click');
						}
					});
			}else{
				cosole.log('error');
			}
		}
	});

}())