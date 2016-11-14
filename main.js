require.config({
	paths:{
		"jquery":"lib/jquery",
		"backbone":"lib/backbone",
		"underscore":"lib/underscore",
		"text":"lib/text",
		"css":"lib/css",
		"swiper":"js/swiper-3.3.1.min",
		"common":"js/common",
	},
	
	shim:{
		common:{
			init:function(){
				return {
//					findNum:findNum,
//					AllnumS:AllnumS,
				}
			}
		}
	}
});

require(["jquery","backbone","swiper","common"],function($,Backbone,swiper,common){
	var Router = Backbone.Router.extend({

		routes:{
			"home":"homeFn",
			"shop":"shopFn",
			"order":"orderFn",
			"car":"carFn",
			"mine":"mineFn",
			"crazy":"crazyFn",
			"*actions":"defaultAction"
		},

		homeFn:function(){
			require(["./modules/home/home.js"],function(home){
				home.render();
				home.getData();
			})
		},
		shopFn:function(){
			require(["./modules/shop/shop.js"],function(shop){
				shop.render();
				shop.getData();
				shop.adaptH()
			})
		},
		orderFn:function(){
			require(["./modules/order/order.js"],function(order){
				order.render();
				order.getData();
				order.bindEvent();
			})
		},
		carFn:function(){
			require(["./modules/car/car.js"],function(car){
				car.render();
				car.bindEvent();
			})
		},
		mineFn:function(){
			require(["./modules/mine/mine.js"],function(mine){
				mine.render();
			})
		},
		crazyFn:function(){
        	require(["./modules/crazy/crazy.js"],function(crazy){
				crazy.render();
				crazy.getData();
			})
     	},
		defaultAction:function(){
        	location.hash = 'home'
     	}
	});
	//路由搭建
	var router = new Router();
	//启动路由
	Backbone.history.start();

});
