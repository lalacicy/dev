(function() {
	$("<link id='logincss'>")
		.attr({
			rel: "stylesheet",
			type: "text/css",
			href: "css/login.css"
		})
		.appendTo("head");
	$.get('templet/login.md', function(data, status, xhr) {
		if(status == 'success') {
			$('body').append(data);
			$("#create").click(function() {
				register();
				return false;
			});
			$("#login").click(function() {
				login();
				return false;
			});
			$('.message a').click(function() {
				$('form').animate({
					height: 'toggle',
					opacity: 'toggle'
				}, 'slow');
			});
			$('#login_form').click(function(event) {
				event = event || window.event;
				event.stopPropagation();
			});
			$('#wrapper').click(function(e) {
				$('#wrapper').remove();
				$('#logincss').remove();
			});
		}
	});
	var tst=true;
	function register() {
		
		var nickname = $("#r_user_name").val();
		var pass = $("#r_password").val();
		var email = $("#r_email").val();
		if(tst==false)return;
		tst=false;
		$.ajax({
			type: "get",
			url: "http://localhost:3000/register",
			async: true,
			data: {
				nickname: nickname,
				pass: pass,
				email: email
			},
			dataType: "jsonp",
			jsonpCallback: "reg",
			success: function(json) {
				tst=true;
				var btn = '<button>confrin</button>';
				if(json.success == "0") {
					$('#login_form').html(json.info);
					$('#wrapper').unbind('click');
					var t = 600;
					var st = setInterval(function() {
						if(t == 0) {
							clearInterval(st);
							$('#wrapper').remove();
							$('#logincss').remove();
						}
						var tjson=$.getJSON('http://localhost:3000/login');
						if(tjson.success=='3'){
							clearInterval(st);
							$(".nav.navbar-nav li").each(function() {
						if($(this).hasClass('active')) {
							//console.log('true');
							$(this).trigger('click');
						}
					});
							$('#wrapper').remove();
							$('#logincss').remove();
						}
						$('#login_form').html(json.info + '<button class="btn">' + Math.floor(t/60)+':'+t%60 + '</button>');
						t--;
					}, 1000);
				} else {
					confirm(json.info);
					
				}
			},
			error: function(err) {
				tst=true;
				console.log(err);
			}
		});
		
		//		$('#wrapper').remove();
		//		$('#logincss').remove();
	};

	function login() {
		var nickname = $(".login-form #user_name").val();
		var pass = $(".login-form #password").val();
		$.ajax({
			type: "get",
			url: "http://localhost:3000/login",
			async: true,
			data: {
				nickname: nickname,
				password: pass,
			},
			dataType: "jsonp",
			jsonpCallback: "login",
			success: function(json) {
				if(json.success == "0") {
					$('#login_form').html(json.info);
					$('.nav.navbar-nav.navbar-right li').html('<a class="drdropdown-toggle" data-toggle="dropdown"><img href="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png" width="20px" height="20px"></img><span class="caret"></span></a><ul class="dropdown-menu"><li><a href="profile.html">profile</a></li><hr><li><a href="javascript:void(0)" onclick="$.getScript(\'js/logout.js\')">logout</a></li> </ul> ');
					$(".nav.navbar-nav li").each(function() {
						if($(this).hasClass('active')) {
							//console.log('true');
							$(this).trigger('click');
						}
					});
					setTimeout(function() {
						$('#wrapper').trigger('click');
					}, 1000);
				} else {
					$("#login_form").removeClass('shake_effect');
					setTimeout(function() {
						$("#login_form").addClass('shake_effect')
					}, 1);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});

		//		$('#wrapper').remove();
		//		$('#logincss').remove();
	};

}())