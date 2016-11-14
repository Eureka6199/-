define(['text!./order.html','css!./order.css'],function(html){
    function render(){
      $('#container').html(html);
       $("footer").css("display","flex");
    }
	
    //ajax
    function getData(){
    	$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php",
			async:true,
			success:function(req){
				var req = JSON.parse(req);
				var str = "";
				
				$.each(req.product,function(i,elem){
					str += "<div>";
					str += "<img src='"+elem.img+"'>";
					str += "<p><b>"+elem.name+"</b>"+"<b>"+elem.specifics+"</b></p>";
					str += "<span>￥<b>"+elem.price+"</b></span>";
					str += "<span><img class='add' src='images/newCustom_img/newCustom2.png'></span></div>";
				})
				$("#order #box").html(str);
				Addevent();
			}
    	})
		
    }
	function Addevent(){
		var Allnum=0;
    	AllnumS();
		$(".add").on("touchstart",function(){
			var news = {
				name:$(this).parent().siblings().eq(1).children().eq(0).html(),
				img:$(this).parent().siblings().eq(0).attr("src"),
				price:$(this).parent().prev().children().html(),
				num:1,
			}
			if(findNum(news.img)!=false){
//				findNum(news.img);
				console.log(localStorage.length);
//				console.log()
//				var a=news.img;
//				localStorage.a.num=localStorage.a.num+1;
			}else{
				localStorage.setItem(news.img,JSON.stringify(news));
				alert(1)
			}
			
			Allnum++;
			if(localStorage.length!=0){
				$(".orderNum").show();
			}
			$(".orderNum").html(Allnum);
			
			
		})
		//检测 是否重复的
		function findNum(img){
			for(var key in localStorage){
				if(img==key){
					var newN=JSON.parse(localStorage.getItem(key));
					newN.num+=1;
					localStorage.setItem(key,JSON.stringify(newN));
					console.log(newN)
					return true;
				}
			}
			return false;
		}
		
		//在下边显示数量
		function AllnumS(){
			for(var key in localStorage){
				var newS=JSON.parse(localStorage.getItem(key));
				Allnum+=newS.num;
			}
			//检测 按钮的值 为0隐藏
			$(".orderNum").html(Allnum)
    		if($(".orderNum").html()==0){
    			$(".orderNum").hide();
    		}else{
    			$(".orderNum").show();
    		}
		}
		
	}
	
    function bindEvent(){
		var oA = document.querySelectorAll("#nav p a");
		var oB = document.querySelector("#nav b span");
		
		for(var i=0;i<oA.length;i++){
			oA[i].addEventListener("touchstart",function(){
				for(var i=0;i<oA.length;i++){
					oA[i].className = "";
				}
				this.className = "line";
				oB.style.marginLeft = this.offsetLeft-6+"px";
				oB.style.transition = "margin-left 0.3s linear"
			})
		}
    	return false
    }

    function swiper(){
      
    }

    return {
      render:render,
      getData:getData,
      bindEvent:bindEvent
    }
})

