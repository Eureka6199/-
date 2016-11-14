

var inputTex = document.querySelector("input[type='text']")
var inputSub = document.querySelector("input[type='submit']");
var historyBox = document.querySelector("#history");
var clear = document.querySelector("#clear");

inputSub.addEventListener("click",save);
function save(e){
	if (inputTex.value.trim().length==0) {
		e.preventDefault();
		return;
	}
	var news = {
		info:inputTex.value,
		dates:(new Date()).toLocaleString()
	}
	localStorage.setItem(news.dates,JSON.stringify(news));
	historyBox.appendChild(addA(news));
	inputTex.value="";
}

function addA(obj){
	var a = document.createElement("a");
	a.innerHTML=obj.info;
	a.index = obj.dates;
	return a;
}

function readHistory(){
	for(var key in localStorage){
		var news = JSON.parse(localStorage.getItem(key));
		historyBox.appendChild(addA(news));
	}
}
readHistory();


clear.addEventListener("touchstart",function(){
	localStorage.clear();
	historyBox.innerHTML = "";
});


