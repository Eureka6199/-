define(['text!./shop.html','css!./shop.css'],function(html){
    function render(){
      $('#container').html(html);
       $("footer").css("display","flex");
    }
	
    //ajax
    function getData(){
		$("#left>p").each(function(i,elem){
			
			$(elem).on("touchstart",function(){
				if(i<4){
					var htr = $(this).html();
					var oUl = "http://www.vrserver.applinzi.com/aixianfeng/apicategory.php?category="+htr;
					$.ajax({
						type:"get",
						url:oUl,
						async:true,
						success:function(req){
							var req = JSON.parse(req);
							var str = ""
							$.each(req.data,function(i,elem){
								str += "<dl><dt>";
								str += "<img src='"+elem.img+"'></dt>";
								str += "<dd>"+elem.name+"</dd>"
								str += "<dd><img src='images/hotSell_img/good.png'>"
								if(elem.pm_desc!=""){
									str +="<span>"+elem.pm_desc+"</span>";
								}
								str +="</dd><dd>"+elem.specifics+"</dd>";
								str +="<dd>￥<span>"+elem.price+"</span><del>￥"+elem.market_price+"</del></dd>";
								str += "<dd><span class='reduce'></span><span class='goodsNum'></span><span class='add'></span></dd></dl>"
								
							})
							$("#shop #box").html(str);
							bindEvent();
//							$.each(req.data,function(i,elem){
//								for(var key in localStorage){
//									if(elem.img==key){
//										
//									}
//								}
//							}
						}
					});
				}
					var num = ($(this).index()*1.28125+0.078125)+"rem";
					$("#shop #main #left>span").css("top",num);
					$("#shop #main #left>span").css("transition","top 0.1s linear");
			})
//			

		})
		$("#left>p:first").trigger("touchstart");
    }

    function bindEvent(){
    	//如果localStorage中有数据 则把数量加上
		$.each($("#box>dl"),function(i,elem){
			for(var key in localStorage){
				if($(elem).children("dt").children("img").attr("src")==key){				
					var newNumb=JSON.parse(localStorage.getItem(key));
					$(elem).children("dd").children(".goodsNum").html(newNumb.num);
					$(elem).children("dd").children(".reduce").show();
				}

			}
		
		})
		
		var Allnum=0;
    	AllnumS();
		
		//增加
		$(".add").on("touchstart",function(){
			$(".orderNum").show();
			$(this).siblings(".reduce").show();
			$(this).siblings(".goodsNum").show();
			var news = {
				name:$(this).parent().siblings().eq(1).html(),
				img:$(this).parent().siblings().eq(0).children("img").attr("src"),
				price:$(this).parent().siblings().eq(4).children("span").html(),
				num:1,
			}
			console.log(news);
			if(findNum(news.img,"+")!=false){
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
			
			var newNU=JSON.parse(localStorage.getItem(news.img))
			console.log($(this).siblings(".goodsNum"))
			$(this).siblings(".goodsNum").html(newNU.num);
			
		})
		
		$(".reduce").on("touchstart",function(){

			findNum($(this).parent().siblings().eq(0).children("img").attr("src"),"-");
			var newR = JSON.parse(localStorage.getItem($(this).parent().siblings().eq(0).children("img").attr("src")));
			
			$(this).siblings(".goodsNum").html(newR.num);
			
			//总数的更改
			Allnum--;
			$(".orderNum").html(Allnum);
			
			//减到零 则删除
			if($(this).siblings(".goodsNum").html()==0){
				localStorage.removeItem(newR.img)
				$(this).hide();
				$(this).siblings(".goodsNum").hide();
			}
			if(localStorage.length==0){
				$(".orderNum").hide();
			}
		})
		
		
		//检测 是否重复的
		function findNum(img,f){
			for(var key in localStorage){
				if(img==key){
					var newN=JSON.parse(localStorage.getItem(key));
					if(f=="+"){
						newN.num+=1;
					}else{
						newN.num-=1;
					}
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

    function adaptH(){
      	var main = $("#main");
      	var footer = $("footer");
      	var Op = $("#right>p");
      	
      	var ofTOP = main[0].offsetTop;
      	var Lheight = innerHeight-ofTOP- footer[0].offsetHeight;
      	$("#main").css("height",Lheight+"px");
      	$("#box").css("height",Lheight-Op[0].offsetHeight+"px");
      	
    }

    return {
      render:render,
      getData,getData,
      adaptH:adaptH
    }
})
