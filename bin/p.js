(function (console) { "use strict";
var Main = function() {
	var _g = this;
	this.views = { stage : (function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("div");
		return $r;
	}(this)), video : (function($this) {
		var $r;
		var _this1 = window.document;
		$r = _this1.createElement("video");
		return $r;
	}(this)), sources : (function($this) {
		var $r;
		var _this2 = window.document;
		$r = _this2.createElement("select");
		return $r;
	}(this))};
	var _stage = this.views.stage;
	this.views.stage.requestFullscreen = _stage.requestFullscreen || _stage.webkitRequestFullScreen || _stage.mozRequestFullScreen;
	this.views.stage.className = "stage";
	window.document.body.onclick = function() {
		_g.views.stage.requestFullscreen();
	};
	this.views.video.autoplay = true;
	this.views.stage.appendChild(this.views.video);
	this.views.stage.appendChild(this.views.sources);
	window.document.body.appendChild(this.views.stage);
	UserMedia.getSources(function(sources) {
		_g.onSources(sources);
		_g.selectUserMedia(_g.videoSources[0]);
	});
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	onSources: function(sources) {
		var _g2 = this;
		this.views.sources.innerHTML = "";
		this.videoSources = sources.filter(function(s) {
			return s.kind == "video";
		});
		var _g = 0;
		var _g1 = this.videoSources;
		while(_g < _g1.length) {
			var s1 = [_g1[_g]];
			++_g;
			var o;
			var _this = window.document;
			o = _this.createElement("option");
			o.innerHTML = s1[0].label;
			o.value = s1[0].id;
			o.selected = s1[0].enabled;
			o.onselect = (function(s1) {
				return function(e) {
					e.preventDefault();
					_g2.selectUserMedia(s1[0]);
				};
			})(s1);
			this.views.sources.appendChild(o);
		}
	}
	,selectUserMedia: function(source) {
		this.selectedSource = source;
		var opt = { video : true, optional : [{ sourceId : source.id}]};
		UserMedia.get(opt,$bind(this,this.onUserMedia),$bind(this,this.onUserMediaError));
	}
	,onUserMedia: function(stream) {
		haxe_Log.trace("got stream",{ fileName : "Main.hx", lineNumber : 85, className : "Main", methodName : "onUserMedia", customParams : [stream]});
		var streamURL = window.URL.createObjectURL(stream);
		haxe_Log.trace("stream url",{ fileName : "Main.hx", lineNumber : 87, className : "Main", methodName : "onUserMedia", customParams : [streamURL]});
		this.views.video.src = streamURL;
		this.onSources(this.videoSources);
	}
	,onUserMediaError: function(e) {
		window.alert("Fuck");
	}
};
Math.__name__ = true;
var UserMedia = function() { };
UserMedia.__name__ = true;
UserMedia.get = function(request,onSuccess,onError) {
	window.navigator.getUserMedia(request,onSuccess,onError);
	return;
};
UserMedia.getSources = function(cb) {
	MediaStreamTrack.getSources(cb);
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
window.navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
