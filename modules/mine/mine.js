define(['text!./mine.html','css!./mine.css'],function(html){
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
		
    }

  
    return {
      render:render,
      
    }
})
