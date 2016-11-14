define(['text!./car.html','css!./car.css'],function(html){
    function render(){
      $('#container').html(html);
       $("footer").css("display","flex");
    }

    //ajax
    function getData(){
		
    }
	function swiper(){
      
    }
    function bindEvent(){
    	var Allnum=0;
    	AllnumS();
    	var strM = "";
    	for(var key in localStorage){
    		var news = JSON.parse(localStorage.getItem(key));
 
    		strM += "<div><span class='checkedS'></span>";
    		strM += "<img src='"+news.img+"'>";
    		strM += "<p>"+news.name+"</p>";
    		strM += "<p>￥<span>"+news.price+"</span></p>";
    		strM += "<p><span class='reduce'></span>";
    		strM += "<span class='goodsNum'>"+news.num+"</span>";
    		strM += "<span class='add'></span></p></div>";
    	}
    	$("#car #box").html(strM);
    	
		var reduce = $(".reduce");
		var add = $(".add");
		var isRight = $("#box>div>span");
		var all = $("#boxAll .all");
		var total_prices = $(".total_prices");
		// console.log(all)
		var isTrue = true;
			
		//全选
		all[0].addEventListener("touchstart",function(){
			if (isTrue){
				$(".checkedS").removeClass("checkedS");
				isTrue = false;
			}else{
				$(isRight).addClass("checkedS");
				$(all).children("span:first").addClass("checkedS");
				isTrue = true;
			}
			AllPrice();
		})
		
		
		//单选
		$(isRight).on("touchstart",function(){
			
			if ($(this).hasClass("checkedS")){
				$(this).removeClass("checkedS");
			}else{
				$(this).addClass("checkedS");
			}
			test();
			AllPrice();
		})
		
		function test(){
			if($("#box .checkedS").length!=$(isRight).length){
				$(all).children("span:first").removeClass("checkedS");
			};
			if($("#box .checkedS").length==$(isRight).length){
				$(all).children("span:first").addClass("checkedS");
			};
		}
		
		//增加商品
		
		$(add).on("touchstart",function(){
			if ($(this).parents("p").siblings().hasClass("checkedS")) {
				var news = {
					name:$(this).parent().siblings().eq(2).html(),
					img:$(this).parent().siblings().eq(1).attr("src"),
					price:$(this).parent().siblings().eq(3).children("span").html(),
					num:1,
				}
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
				AllPrice();
			};
		});
		
		$(reduce).on("touchstart",function(){
			if ($(this).parents("p").siblings().hasClass("checkedS")) {
//				if (num==0) {
//					
//					return;
//				}
				findNum($(this).parent().siblings().eq(1).attr("src"),"-");
				var newR = JSON.parse(localStorage.getItem($(this).parent().siblings().eq(1).attr("src")));
				
				$(this).siblings(".goodsNum").html(newR.num);
				
				//总数的更改
				Allnum--;
				$(".orderNum").html(Allnum);
				
				//减到零 则删除
				if($(this).siblings(".goodsNum").html()==0){
					localStorage.removeItem(newR.img)
					$(this).parent().parent().remove();
				}
				if(localStorage.length==0){
					$(".orderNum").hide();
					$(".total_prices").html(0);
				}
				AllPrice();
				
			};
		});
		
		
		//算钱
		AllPrice();
		function AllPrice(){
			var money = 0;
			$("#car #box>div").each(function(i,elem){

				if($(elem).children().eq(0).hasClass("checkedS")){
					var news = JSON.parse(localStorage.getItem($(elem).children().eq(1).attr("src")));
    				money+=news.price*news.num;
				}

				money = Math.round(money*100)/100;
				$(".total_prices").html(money);
				
			})
		}	
		
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

    

    return {
      render:render,
      bindEvent:bindEvent
    }
})
