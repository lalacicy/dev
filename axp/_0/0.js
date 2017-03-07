//会议室状态查询
(function(){
	var right=$("#content #right");
	right.html("");
	var sta='<div class="row">';
//'<div class="col-sm-6"><img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png"><br/><br/></div>'
	for(var i=0;i<hystat.all.length;i++){
		sta+='<div style="border: 6px solid ABCDE; margin: 6px;" class="col-sm-5">'
		+'<p>'+hystat.all[i].id+'&nbsp&nbsp大小：'+hystat.all[i].size+'</p>'
		+'<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png"><br/><br/>';
		var temp=[17];
		for(var j=0;j<17;j++){
			temp[j]=1;
		}
		for(var j=0;j<hystat.all[i].details.length;j++){
			var dd=hystat.all[i].details[j].date;
//			console.log(dd);
			dd=dd.substr(8,2);
//			var col=today.getDay()-(today.getDate()-dd)+1;
			var shh=hystat.all[i].details[j].begintime.substr(0,2)-9;
			var smm=hystat.all[i].details[j].begintime.substr(3,2)=="30"?1:0;
			var ehh=hystat.all[i].details[j].endtime.substr(0,2)-9;
			var emm=hystat.all[i].details[j].endtime.substr(3,2)=="30"?1:0;
//			console.log(shh+""+smm+""+ehh+""+emm);
			for(var row=shh*2+smm+1;row<2*ehh+emm+1;row++){
//				console.log(row+""+col);
//				$("tr:eq("+row+") td:nth-child("+col+")").css("background-color","red");
				temp[row-1]=2;
			}
		}
		sta+='<div class="progress">';
		console.log(temp);
		for(var j=0;j<17;j++){
			if(temp[j]==1){
				sta+='<div class="progress-bar progress-bar-success" role="progressbar" style="width:5.882%"></div>'
			}else{
				sta+='<div class="progress-bar progress-bar-danger" role="progressbar" style="width:5.882%"></div>'
			}
		}
		var thh=today.getHours()-9;
		var tmm=today.getMinutes()>30?1:0;
		if(temp[2*thh+tmm]==1){
			sta=sta.replace("ABCDE","green");
		}else{
			sta=sta.replace("ABCDE","red");
		}
		sta+='</div></div>';
		//处理当前分钟状态
	}
	sta+='</div>';
	right.append(sta);
}())
