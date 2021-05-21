/*-----------------------------------------------------------------------------------
/* Styles Switcher
-----------------------------------------------------------------------------------*/

window.console = window.console || (function(){
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
	return c;
})();


jQuery(document).ready(function($) {
	
		// Color Changer		
		
		$(".blue" ).click(function(){
			$("#colors" ).attr("href", "css/skins/blue.css" );
			return false;
		});
		
		$(".blueaqua" ).click(function(){
			$("#colors" ).attr("href", "css/skins/blueaqua.css" );
			return false;
		});
		
		$(".bluecadet" ).click(function(){
			$("#colors" ).attr("href", "css/skins/bluecadet.css" );
			return false;
		});

		$(".bluedark" ).click(function(){
			$("#colors" ).attr("href", "css/skins/bluedark.css" );
			return false;
		});
		
		$(".bluegreen" ).click(function(){
			$("#colors" ).attr("href", "css/skins/bluegreen.css" );
			return false;
		});

		$(".bluelight" ).click(function(){
			$("#colors" ).attr("href", "css/skins/bluelight.css" );
			return false;
		});
		
		$(".brown" ).click(function(){
			$("#colors" ).attr("href", "css/skins/brown.css" );
			return false;
		});
		
		$(".brown2" ).click(function(){
			$("#colors" ).attr("href", "css/skins/brown2.css" );
			return false;
		});
				
		$(".green" ).click(function(){
			$("#colors" ).attr("href", "css/skins/green.css" );
			return false;
		});
		
		$(".grey" ).click(function(){
			$("#colors" ).attr("href", "css/skins/grey.css" );
			return false;
		});
		
		$(".khaki" ).click(function(){
			$("#colors" ).attr("href", "css/skins/khaki.css" );
			return false;
		});
		
		$(".magenta" ).click(function(){
			$("#colors" ).attr("href", "css/skins/magenta.css" );
			return false;
		});
		
		$(".grey" ).click(function(){
			$("#colors" ).attr("href", "css/skins/grey.css" );
			return false;
		});

		$(".orange" ).click(function(){
			$("#colors" ).attr("href", "css/skins/orange.css" );
			return false;
		});
		
		$(".purple" ).click(function(){
			$("#colors" ).attr("href", "css/skins/purple.css" );
			return false;
		});
		
		$(".red" ).click(function(){
			$("#colors" ).attr("href", "css/skins/red.css" );
			return false;
		});
		
		$(".red2" ).click(function(){
			$("#colors" ).attr("href", "css/skins/red2.css" );
			return false;
		});
		
		$(".redbrown" ).click(function(){
			$("#colors" ).attr("href", "css/skins/redbrown.css" );
			return false;
		});
		
		$(".yellow" ).click(function(){
			$("#colors" ).attr("href", "css/skins/yellow.css" );
			return false;
		});
			

		$("#style-switcher h2 a").click(function(e){
			e.preventDefault();
			var div = $("#style-switcher");
			console.log(div.css("left"));
			if (div.css("left") === "-185px") {
				$("#style-switcher").animate({
					left: "0px"
				}); 
			} else {
				$("#style-switcher").animate({
					left: "-185px"
				});
			}
		})
		
		// Layout Style Switcher
	    $("#layout-style").change(function(e){
			if( $(this).val() == 1){
				$("body").removeClass("boxed");
				$("body").addClass("wide");
				$(".bgr").addClass("hide"); 
				       
			} else if( $(this).val() == 2){
				$("body").addClass("boxed");
				$("body").removeClass("wide");
				$(".bgr").removeClass("hide");      
			}
		})

		$(".colors li a").click(function(e){
			e.preventDefault();
			$(this).parent().parent().find("a").removeClass("active");
			$(this).addClass("active");
		})
		
		$(".bg li a").click(function(e){
			e.preventDefault();
			$(this).parent().parent().find("a").removeClass("active");
			$(this).addClass("active");
			var bg = $(this).css("backgroundImage");
			$("body").css("backgroundImage",bg)
		})

		$("#reset a").click(function(e){
			var bg = $(this).css("backgroundImage");
			$("body").css("backgroundImage","url(http://www.themepush.com/demo-zolix/wp-content/themes/zolix/img/bg/6.jpg)");
			$("body").removeClass("boxed").addClass("wide");
			$(".bgr").addClass("hide");
		})
			

	});