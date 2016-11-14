define(['text!./home.html','css!./home.css','css!./swiper-3.3.1.min.css'],function(html){
    function render(){
      $('#container').html(html);
      $("footer").css("display","flex");
    }

    //ajax
    function getData(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
			async:true,
			success:function(req){
				var req = JSON.parse(req);
				var strL = ""
				strL+= "<div class='swiper-container'><div class='swiper-wrapper'>";
				$.each(req.data.slide,function(i,elem){
					strL+= "<img class='swiper-slide' src='"+elem.activity.img+"'>"
				})
				strL+= "</div><div class='swiper-pagination'></div></div>"
		
				$("#home #banner").html(strL);
				//nav下的图片
				
				var str = "";
				str += "<div>"
				$.each(req.data.menu,function(i,elem){
					if(i<4){
						if(i==1){
							str+= "<a href='#crazy'>";
						}
						str += "<dl><dt><img src='";
						str += elem.activity.img+"'></dt><dd>";
						str += elem.activity.name+"</dd></dl>";
						if(i==1){
							str+= "</a>"
						}
					}
					
				})
				str += "</div><div>"
				$.each(req.data.menu,function(i,elem){
					if(i>=4){
						str += "<dl><dt><img src='";
						str += elem.activity.img+"'></dt><dd>"
						str += elem.activity.name+"</dd></dl>"
					}
				})
				str += "</div>"
				$("#home #nav").html(str);
				//启动swiper
				swiper();
				
			}
		});
			
		//买一赠一
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
			async:true,
			success:function(req){
				var req = JSON.parse(req);
				var str ="";
				$.each(req.data,function(i,elem){
					if(i==0||i%3==0){
						str +="<div>"
					}
					str+="<dl><dt>";
					str +="<img src='"+elem.img+"'>";
					str +="</dt><dd>"+elem.name+"</dd><dd>";
					str +="<img src='images/index_img/priority_fruits_main4.png'>";
					if(elem.pm_desc!=""){
						str +="<span>"+elem.pm_desc+"</span>";
					}
					str +="</dd><dd><span>"+elem.specifics+"</span>/盒</dd>";
					str +="<dd>￥<span>"+elem.price+"</span><del>￥"+elem.market_price+"</del></dd>";
					str +="<dd><img src='images/index_img/priority_fruits_main6.png' class='add'></dd></dl>";
					if((i+1)%3==0){
						str +="</div>";
					}
					
				})
				$(".priority_fruits_main").html(str);
				if(req.data.length%3!=0){
					$(".priority_fruits_main dl:last").css("border-right","2px solid #e0e0e0");
				}
				bindEvent()
			}
		});
	
    }
    
    
    

	function swiper(){
      	var mySwiper = new Swiper ('.swiper-container', {
			autoplay: 2000,
			autoplayDisableOnInteraction:false,
			loop: true,
			pagination: '.swiper-pagination'
	  	})     
    }
	
    function bindEvent(){
//  	localStorage.clear()
    	var Allnum=0;
    	AllnumS();
    	
    	
		$(".add").on("touchstart",function(){
			
			var news = {
				name:$(this).parent().siblings().eq(1).html(),
				img:$(this).parent().siblings().eq(0).children("img").attr("src"),
				price:$(this).parent().siblings().eq(4).children("span").html(),
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

    

    return {
      render:render,
      getData:getData,
    }
})
