/**
 * RotateBody
 *
 */

var RotateBody = {};

(function(){
	var iw = window.innerWidth, ih = window.innerHeight;

	RotateBody.do = function(){
		var hash_ = location.hash;

		switch(hash_){
		case "#90":
			this.do90_();
			break;
		case "#270":
			this.do270_();
			break;
		default:
			break;
		}
	}

	RotateBody.do90_ = function(){
		$("body").css({
			"-webkit-transform": "rotate(90deg) translate(0px, -"+iw+"px)",
			"-webkit-transform-origin": "0 0",
			"width": ih + "px"
		})
	}

	RotateBody.do270_ = function(){
		$("body").css({
			"-webkit-transform": "rotate(270deg)",
			"-webkit-transform-origin": "0 0",
			"marginTop": ih + "px",
			"width": ih + "px"
		})
	}

}())