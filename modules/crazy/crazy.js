define(['text!./crazy.html','css!./crazy.css'],function(html){
    function render(){
      	$('#container').html(html);
		$("footer").css("display","none");
    }

    //ajax
    function getData(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php",
			async:true,
			success:function(req){
				var req = JSON.parse(req);
				var str = ""
				$.each(req.product,function(i,elem){
					str += "<div><h3>";
					str += "<img src='"+elem.img+"'></h3>";
					str += "<p>"+elem.name+"</p><p>"+elem.specifics+"</p>";
					str += "<p><b>￥<span>"+elem.price+"</span></b><span>原价:"+elem.market_price+"元</span></p>";
					str += "<span>"+elem.price+"元抢购</span></div>";
					
				})
				
				$("#main").html(str);
				 
			}
		});
    }

    function bindEvent(){

    }

    function swiper(){
      
    }

    return {
      render:render,
      getData:getData
    }
})
