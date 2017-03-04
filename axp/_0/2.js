(function() {
	var right = $("#content #right");
	right.html("");
	function showrili(){
		var width=$("#content #right").width()-1;
		var height=window.innerHeight-$("#content #right").offset().top-15;
		right.html('<canvas id="rili" width="'+width+'" height="'+height+' onSelectStart="return false""></canvas>');
		var canvas=document.getElementById("rili");
		var ctx=canvas.getContext("2d");
		var ftsize=height*0.03;
		ctx.font=""+ftsize+"px Terminal";
		ctx.fillStyle="black";
		ctx.textAlign="center";
		ctx.textBaseline="bottom"
		ctx.fillText(""+today.getFullYear()+"年"+(today.getMonth()+1)+"月",width/2,height*0.03);
		ctx.moveTo(0,height*0.03);
		ctx.lineTo(width,height*0.03);
		ctx.stroke();
		var wk=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		ftsize=height*0.01;
		ctx.font=""+ftsize+"px Terminal";
		for(var i=0;i<7;i++){
			ctx.fillText(wk[i],width/7*(i+1)-width/12,height*0.06);
		}
		ctx.moveTo(0,height*0.06+2);
		ctx.lineTo(width,height*0.06+2);
		ctx.stroke();
		for(var i=0;i<8;i++){
			ctx.moveTo(width/7*i,height*0.03);
			ctx.lineTo(width/7*i,height*0.06+2+0.15*height*6);
			ctx.stroke();
		}
		for(var i=0;i<7;i++){
			ctx.moveTo(0,height*0.06+2+0.15*height*i);
			ctx.lineTo(width,height*0.06+2+0.15*height*i);
			ctx.stroke();
		}
		ctx.textAlign="start";
		ctx.textBaseline="top";
		ftsize=height*0.02+1;
		ctx.font=""+ftsize+"px Terminal";
		var time=today.getTime()-today.getDate()*1000*60*24*60;
		ctx.translate(0,height*0.06+2);
		for(var i=0;i<42;i++){
			var startTime=time+(i-today.getDay())*1000*60*24*60;
			var startDate=new Date(startTime).getDate();
			if(new Date(startTime).getMonth()!=new Date(time).getMonth()+1){
				ctx.fillStyle="#EDF2F6"
				ctx.fillRect((i%7)*width/7,Math.floor(i/7)*0.15*height,width/7-2,height*0.15-2);
				ctx.fillStyle="black"
				ctx.fillText(startDate,(i%7)*width/7+2,Math.floor(i/7)*0.15*height);
			}else{
				ctx.fillText(startDate,(i%7)*width/7+2,Math.floor(i/7)*0.15*height);	
			}
			
		}
	}
	showrili();
//	var canvase=document.getElementById("rili");
//	canvase.addEventListener("click",function(event){
//		test(event);
//	});
//	function test(event){
//		ctx=canvase.getContext("2d");
//		ctx.beginPath();
//		var x=event.clientX-$("#content #right").offset().left-14;
//		var y=event.clientY-$("#content #right").offset().top-height*0.06;
//		ctx.arc(x,y,11,0*Math.PI,2*Math.PI);
////		ctx.moveTo(0,0);
////		ctx.lineTo(x,y);
//		ctx.stroke();
///df as/dsf/a/sdf/as/false
////		alert("jfie");
//	}
	window.onresize=function(){
		showrili();
	}
}())