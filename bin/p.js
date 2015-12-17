(function (console, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
	this.views.sources.className = "sources";
	window.document.body.onclick = function() {
		_g.views.stage.requestFullscreen();
	};
	this.views.video.autoplay = true;
	this.views.stage.appendChild(this.views.video);
	this.views.stage.appendChild(this.views.sources);
	window.document.body.appendChild(this.views.stage);
	UserMedia.getSources(function(sources) {
		_g.onSources(sources);
		_g.selectUserMedia(_g.videoSources[0].id);
	});
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	onSources: function(sources) {
		var _g = this;
		this.views.sources.innerHTML = "";
		this.videoSources = sources.filter(function(s) {
			return s.kind == "video";
		});
		var o;
		var _this = window.document;
		o = _this.createElement("option");
		o.innerHTML = "sources";
		this.views.sources.appendChild(o);
		var _g1 = 0;
		var _g11 = this.videoSources;
		while(_g1 < _g11.length) {
			var s1 = _g11[_g1];
			++_g1;
			var o1;
			var _this1 = window.document;
			o1 = _this1.createElement("option");
			o1.innerHTML = s1.label;
			o1.value = s1.id;
			o1.selected = this.selectedSource == s1.id;
			this.views.sources.appendChild(o1);
		}
		this.views.sources.onchange = function(e) {
			var _g12 = 0;
			var _g2 = _g.views.sources.getElementsByTagName("option");
			while(_g12 < _g2.length) {
				var o2 = _g2[_g12];
				++_g12;
				if((js_Boot.__cast(o2 , HTMLOptionElement)).value != null && (js_Boot.__cast(o2 , HTMLOptionElement)).selected) {
					window.alert((js_Boot.__cast(o2 , HTMLOptionElement)).value);
					_g.selectUserMedia((js_Boot.__cast(o2 , HTMLOptionElement)).value);
					return;
				}
			}
			e.preventDefault();
		};
	}
	,selectUserMedia: function(id) {
		var opt = { video : true, sourceId : id};
		this.selectedSource = id;
		UserMedia.get(opt,$bind(this,this.onUserMedia),$bind(this,this.onUserMediaError));
	}
	,onUserMedia: function(stream) {
		haxe_Log.trace("got stream",{ fileName : "Main.hx", lineNumber : 100, className : "Main", methodName : "onUserMedia", customParams : [stream]});
		var streamURL = window.URL.createObjectURL(stream);
		haxe_Log.trace("stream url",{ fileName : "Main.hx", lineNumber : 102, className : "Main", methodName : "onUserMedia", customParams : [streamURL]});
		this.views.video.src = streamURL;
		this.views.video.play();
		this.onSources(this.videoSources);
	}
	,onUserMediaError: function(e) {
		window.alert("Fuck");
	}
	,__class__: Main
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
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
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
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
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
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
			if (e instanceof js__$Boot_HaxeError) e = e.val;
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
window.navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
js_Boot.__toStr = {}.toString;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
