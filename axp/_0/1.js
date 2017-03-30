//会议室预定
(function(){
$.ajax({
	type:"get",
	url:"http://localhost:3000/inquire",
	async: true,
	data: {
		date:new Date()
	},
	dataType: "jsonp",
	jsonpCallback: "inquire",
	success:function(infoall) {
		var right = $("#content #right");
		right.html("");
		var btngop = '<button class="btn btn-success disabled">会议室</button>&nbsp<div id="hybtn" class="btn-group">';
		for(var i = 0; i < hystat.all.length; i++) {
			btngop += '<button type="button" class="btn btn-primary">' + hystat.all[i].id + '</button>';
		}
		btngop += '</div><br/><br/>';
		//append 更好
		//right.html(btngop);
		right.append(btngop);
		$("#hybtn button").click(hyclick);

		var table = '<div id="grdf" class="row"><div class="col-xs-1"><canvas id="cav"></canvas></div><div id="father" class="col-xs-11"><table class="table table-bordered" onSelectStart="return false"><thead><tr>'
		var time = today.getTime();
		var wk = ["日", "一", "二", "三", "四", "五", "六"]
		for(var i = 0; i < 7; i++) {
			var startTime = time + (i - today.getDay()) * 1000 * 60 * 24 * 60;
			var startDate = new Date(startTime).getDate();
			table += '<th width="14.28%" height="5.88%">' + startDate + wk[i] + '</th>';
		}
		table += '</tr></thead><tbody>'
		for(var i = 0; i < 17; i++) {
			table += '<tr>';
			for(var j = 0; j < 7; j++) {
				table += '<td></td>';
			}
			table += '</tr>'
		}
		table += '</tbody></table></div><div class="col-sm-12"><button id="submit" style="float:right;margin-right:16px" class="btn btn-info">提交</button><button id="flush" style="float:right;margin-right:16px" class="btn btn-info">撤销</button></div></div>';
		right.append(table);
		right.append('<div id="confirm" style="position: absolute;top: 50%;left: 50%;width:10px;height:10px"></div>');
		//处理canvas
		var cav = document.getElementById("cav");
		var ctx = cav.getContext("2d");
		//数组记录标记--周视图 red=2;green=1
		//记录选定的格子
		var redgreen = [7];
		for(var i = 0; i < 7; i++) {
			redgreen[i] = new Array(17)
			for(var j = 0; j < 17; j++) {
				redgreen[i][j] = 0;
			}
		}
		//让canvase 大小合理
		document.getElementById("cav").height = $("#father").height();
		document.getElementById("cav").width = $("#father").width() * 1.1;
		window.onresize = function() {
			document.getElementById("cav").height = $("#father").height();
			document.getElementById("cav").width = $("#father").width() * 1.1;
			drawcav();
			drawcolor();
		}

		function showInfo(hid) {
			var i = 0;
			for(i = 0; i < infoall.all.length; i++) {
				if(infoall.all[i].id != hid) {
					continue;
				}
				//		console.log(i);
				for(var j = 0; j < infoall.all[i].details.length; j++) {
					var dd = infoall.all[i].details[j].date;
					//			console.log(dd);
					//			dd=dd.substr(8,2);
					var temp = new Date(dd);
					var col = temp.getDay();
					var shh = infoall.all[i].details[j].begintime.substr(0, 2) - 9;
					var smm = infoall.all[i].details[j].begintime.substr(3, 2) == "30" ? 1 : 0;
					var ehh = infoall.all[i].details[j].endtime.substr(0, 2) - 9;
					var emm = infoall.all[i].details[j].endtime.substr(3, 2) == "30" ? 1 : 0;
					//				console.log(shh + "" + smm + "" + ehh + "" + emm);
					for(var row = shh * 2 + smm + 1; row < 2 * ehh + emm + 1; row++) {
						//				console.log(row+""+col);
						$("tr:eq(" + row + ") td:nth-child(" + (col + 1) + ")").webuiPopover({
							title: infoall.all[i].details[j].email,
							content: infoall.all[i].details[j].beizhu,
							trigger: 'hover' //values:  click,hover,manual
						});
						//				console.log("---"+col);
						redgreen[col][row - 1] = 2;

					}
				}
				drawcolor();
				break;
			}
			if(i == infoall.all.length) drawcolor();
		}
		var poi = null;

		function hyclick() {
			$("#hybtn button").css("background-color", "");
			$(this).css("background-color", "#5CB85C");
			poi = $(this).html();
			for(var t = 0; t < 7; t++) {
				for(var s = 0; s < 17; s++) {
					//			console.log(redgreen[t][s]);
					redgreen[t][s] = 0;

				}
			}
			showInfo($(this).text());
		}

		//画数字
		function drawcav() {
			//		console.log(cav.width + "" + cav.height);
			var x = $("#father").position().left;
			var y = $("td").position().top;
			var height = $("tr:eq(2) td").position().top - y;
			var width = $("tr:eq(2) td:nth-child(2)").position().left - x;
			//	console.log("-----"+height+""+width);	
			//绘制数字
			var ftsize = height / 2;
			ctx.font = "" + ftsize + "px Terminal";
			ctx.fillStyle = "black";
			ctx.textAlign = "end";
			ctx.textBaseline = "middle";
			for(var i = 0; i < 18; i++) {
				var ts = "";
				if(i == 0 || i == 1) {
					ts = "09"
				} else {
					ts = "" + (Math.floor(i / 2) + 9)
				}
				var mm = i % 2 == 0 ? ":00" : ":30";
				ctx.fillText(ts + mm, x, y + height * i);
			}
			//移动坐标点
			ctx.translate(x, y);
		}
		drawcav();
		var div = document.getElementById("grdf");
		div.addEventListener("mousedown", function(event) {
			choose(event);
		});
		div.addEventListener("mousemove", function(event) {
			slide(event);
		});
		div.addEventListener("mouseup", function(event) {
			up(event);
		});
		//div.addEventListener("mouseover",function(event){help(event);});
		//鼠标指数记录变量
		var tid = 1;
		var tempx;

		function choose(event) {
			//	cav.addEventListener("mousemove",function(ev){mchoose(ev)});
			tid = 0;
			var x = $("#father").position().left;
			var y = $("td").position().top;
			var height = $("tr:eq(2) td").position().top - y;
			var width = $("tr:eq(2) td:nth-child(3)").position().left - $("tr:eq(2) td:nth-child(2)").position().left;
			var xx = $("td").offset().left;
			var yy = $("td").offset().top;

			var e = event || window.event;
			var mx = e.clientX - xx;
			var my = e.clientY - yy;

			var grd = ctx.createLinearGradient(0, 0, 0, 300);
			grd.addColorStop(0, "green");
			grd.addColorStop(1, "white");
			ctx.fillStyle = grd;
			//只影响按下的那列
			tempx = Math.floor(mx / width) * width;
			var tempy = Math.floor(my / height) * height;
			if(tempx < 0 || tempy < 0) return false;
			if(Math.floor(mx / width) > 6 || Math.floor(my / height) > 16) return false;
			if(redgreen[Math.floor(mx / width)][Math.floor(my / height)] == 2) return false;
			ctx.fillRect(tempx, tempy, width, height);
			redgreen[Math.floor(mx / width)][Math.floor(my / height)] = 1
				//	console.log("jfiejfeijfiej");
		}

		function slide(event) {
			if(tid != 0) return false;
			var x = $("#father").position().left;
			var y = $("td").position().top;
			var height = $("tr:eq(2) td").position().top - y;
			var width = $("tr:eq(2) td:nth-child(3)").position().left - $("tr:eq(2) td:nth-child(2)").position().left;
			var xx = $("td").offset().left;
			var yy = $("td").offset().top;

			var e = event || window.event;
			var mx = e.clientX - xx;
			var my = e.clientY - yy;
			//	var tempx=Math.floor(mx/width)*width;
			var tempy = Math.floor(my / height) * height;

			var grd = ctx.createLinearGradient(0, 0, 0, 300);
			grd.addColorStop(0, "green");
			grd.addColorStop(1, "white");
			ctx.fillStyle = grd;
			if(tempx < 0 || tempy < 0) return false;
			if(Math.floor(mx / width) > 6 || Math.floor(my / height) > 16) return false;
			if(redgreen[Math.floor(tempx / width)][Math.floor(my / height)] == 2) return false;
			ctx.fillRect(tempx, tempy, width, height);
			redgreen[Math.floor(tempx / width)][Math.floor(my / height)] = 1;
		}

		function up(event) {
			tid = 1;
		}
		//function help(event){
		//
		//}
		function drawcolor() {
			var x = $("#father").position().left;
			var y = $("td").position().top;
			var height = $("tr:eq(2) td").position().top - y;
			var width = $("tr:eq(2) td:nth-child(3)").position().left - $("tr:eq(2) td:nth-child(2)").position().left;
			var xx = $("td").offset().left;
			var yy = $("td").offset().top;

			var grdGreen = ctx.createLinearGradient(0, 0, 0, 300);
			grdGreen.addColorStop(0, "green");
			grdGreen.addColorStop(1, "white");
			var grdRed = ctx.createLinearGradient(0, 0, 0, 300);
			grdRed.addColorStop(0, "Red");
			grdRed.addColorStop(1, "white");

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width * 7, height * 17);
			for(var i = 0; i < 7; i++) {
				for(var j = 0; j < 17; j++) {
					if(redgreen[i][j] == 2) {
						ctx.fillStyle = grdRed;
						ctx.fillRect(i * width, j * height, width, height);
					} else if(redgreen[i][j] == 1) {
						ctx.fillStyle = grdGreen;
						ctx.fillRect(i * width, j * height, width, height);
					}
				}
			}

		}
		$("#hybtn button").first().trigger("click");
		$("#flush").click(function() {
			for(var t = 0; t < 7; t++) {
				for(var s = 0; s < 17; s++) {
					//				console.log(redgreen[t][s]);
					if(redgreen[t][s] == 1) redgreen[t][s] = 0;

				}
			}
			drawcolor();
		});
		$('#confirm').webuiPopover({
				arrow: false,
				placement: 'left',
				closeable: true,
				title: 'confirm info',
				content: '<label>时间</label>&nbsp<textarea height="300px" id="infohb"></textarea><br><label>备注</label>&nbsp<input id="beizhu" type="text"></input><br><button id="submitconfirm" class="btn btn-info">确认</button>',
				trigger: 'manual' //values:  click,hover,manual
			});
		$("#submit").unbind('click');
		$("#submit").click(function() {
//			console.log(pingjie());
//			alert('test');
			$('#confirm').webuiPopover('show');
			$("#infohb").val(pingjie());
//			console.log(pingjie());
			$("#submitconfirm").unbind('click');
			$("#submitconfirm").click(function() {
				$('#confirm').webuiPopover('hide');
				$.ajax({
					type: 'get',
					url: 'http://localhost:3000/reservation',
					async: 'true',
					data: {
						arrays:JSON.stringify(redgreen),
						beizhu:$("#beizhu").val(),
						mid:poi
					},
					dataType: "jsonp",
					jsonpCallback: "login",
					success: function(json) {
						if(json.success == '0') {
							for(var t = 0; t < 7; t++) {
								for(var s = 0; s < 17; s++) {
									//								console.log(redgreen[t][s]);
									if(redgreen[t][s] == 1) {
										redgreen[t][s] = 2;
										$("tr:eq(" + (s + 1) + ") td:nth-child(" + (t + 1) + ")").webuiPopover({
											title: $.cookie('email'),
											content: $("#beizhu").val(),
											trigger: 'hover' //values:  click,hover,manual
										});
									}

								}
							}
							drawcolor();
							$("#beizhu").val('');
						} else {
							$("#hybtn button").each(function() {
								if($(this).html() == poi) {
									//console.log('true');
									$(this).trigger('click');
								}
							});
						}
					},
					error: function(err) {
						
						$("#hybtn button").each(function() {
							if($(this).html() == poi) {
								//console.log('true');
								$(this).trigger('click');
							}
						});
						console.log(err);
					}

				});
				$("#submitconfirm").unbind('click');
			});
			
		});

		function pingjie() {
			var result = '';
			var begin = null;
			var end = null;
			for(var t = 0; t < 7; t++) {
				var befor = null;
				for(var s = 0; s < 17; s++) {
					//				console.log(redgreen[t][s]);
					if(redgreen[t][s] == 1 && (befor == 0 || befor == null)) {
							var ts = "";
							if(s == 0 || s == 1) {
								ts = "09"
							} else {
								ts = "" + (Math.floor(s / 2) + 9)
							}
							var mm = s % 2 == 0 ? ":00" : ":30";
							begin = ts + mm;
						}
						if(((redgreen[t][s] == 0||redgreen[t][s] == 2) && befor == 1 )) {
							var ts = "";
							if(s == 0 || s == 1) {
								ts = "09"
							} else {
								ts = "" + (Math.floor(s / 2) + 9)
							}
							var mm = s % 2 == 0 ? ":00" : ":30";
							end = ts + mm;
							var startTime = time + (t - today.getDay()) * 1000 * 60 * 24 * 60;
							var startDate = new Date(startTime).getDate();
							result+=(startDate+'日'+begin+'-'+end+'\n');
							begin=null;
							end=null;
						}
						if(s==16&&redgreen[t][s]==1){
							var startTime = time + (t - today.getDay()) * 1000 * 60 * 24 * 60;
							var startDate = new Date(startTime).getDate();
							result+=(startDate+'日'+begin+'-17:30\n');
							begin=null;
							end=null;
						}
					befor=redgreen[t][s]==1?1:0;
					}
				}
			
			return result;
			}

		}
});
}())	