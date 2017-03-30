(function() {
	var right = $("#content #right");
	var left = $("#content #left");
	right.html("");
	left.html("");

//	var zero_list = $.getJSON("moni/huiyi.json", function(data) {
//		var items = [];
//		$.each(data, function(key, val) {
//			items.push('<li class="list-group-item" id="' + key + '">' + val + '</li>');
//		});
//		var div = '<div id="_0list" class="list-group">' + items.join("") + '</div>'
//		left.html(div);
//		$("#_0list li").click(show);
//	});
	$.ajax({
		type: "get",
		url: "http://localhost:3000/huiyif",
		async: true,
		data: {
			date: new Date()
		},
		dataType: "jsonp",
		jsonpCallback: "huiyif",
		success : function(json){
			var items = [];
			$.each(json, function(key, val) {
				items.push('<li class="list-group-item" id="' + key + '">' + val + '</li>');
			});
			var div = '<div id="_0list" class="list-group">' + items.join("") + '</div>'
			left.html(div);
			$("#_0list li").click(show);
			$("#_0list li").first().trigger("click");
		}
	});




	function show() {
		$("#_0list li").attr("class", "list-group-item");
		$(this).addClass("active")

		var str = "_0/" + $(this).index() + ".js";
		$.getScript(str)
			.fail(function() {
				right.html("");
				right.html("建设中");
			});
	}

}())