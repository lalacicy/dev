(function() {
	var right = $("#content #right");
	var left = $("#content #left");
	right.html("");
	left.html("");

	var zero_list = $.getJSON("moni/huiyi.json", function(data) {
		var items = [];
		$.each(data, function(key, val) {
			items.push('<li class="list-group-item" id="' + key + '">' + val + '</li>');
		});
		var div = '<div id="_0list" class="list-group">' + items.join("") + '</div>'
		left.html(div);
		$("#_0list li").click(show);
	});
	//得到会议室json数据，没有错误处理。
	
	 $.getJSON("moni/huiyishi.json", function(result) {
		console.log("huiyishi_all_info_get");
		infoall=result;
//		console.log(infoall);
	});
	
	 $.getJSON("moni/huitoday.json", function(result) {
		console.log("huiyishi_all_get");
		hystat=result;
		$("#_0list li").first().trigger("click");
	});
	
	function show() {
		$("#_0list li").attr("class", "list-group-item");
		$(this).addClass("active")

		var str = "_0/" + $(this).index() + ".js";
		$.getScript(str)
			.done(suss)
			.fail(function() {
				right.html("");
				right.html("建设中");
			});
	}

}())