import js.Browser.*;
import js.html.DivElement;
import js.html.MediaStreamTrack;
import js.html.SelectElement;
import js.html.VideoElement;



class Main {

    var views : {
        sources : SelectElement,
        video : VideoElement,
        stage : DivElement
    };

    var videoSources:Array<MediaStreamTrack>;

    function new(){
        views = {
            stage : document.createDivElement(),
            video : document.createVideoElement(),
            sources : document.createSelectElement()
        };

        var _stage = views.stage;
        untyped views.stage["requestFullscreen"] = __js__('_stage.requestFullscreen || _stage.webkitRequestFullScreen || _stage.mozRequestFullScreen');
            
        views.stage.className = "stage";
        views.sources.className = "sources";

        document.body.onclick = function(){
            views.stage.requestFullscreen();
        }

        views.video.autoplay = true;

        views.stage.appendChild(views.video);
        views.stage.appendChild(views.sources);
        document.body.appendChild(views.stage);

        UserMedia.getSources(function(sources){
            onSources(sources);
            selectUserMedia(videoSources[0].id);
        });
    }

    function onSources(sources){
        views.sources.innerHTML = '';

        videoSources = sources.filter(function(s){
            return s.kind == 'video';
        });

        for( s in videoSources ) {
            var o = document.createOptionElement();
            o.innerHTML = s.label;
            o.value = s.id;
            o.selected = s.enabled;
            o.onselect = function(e:js.html.Event){
                e.preventDefault();
                selectUserMedia(o.value);
            };
            views.sources.appendChild( o );
        }

        
    }

    function selectUserMedia(id:String){
        var opt = {
            video:true,
            optional:[
                {
                    sourceId:id
                }
            ]
        };

        UserMedia.get(opt, onUserMedia , onUserMediaError );
    }
    function onUserMedia(stream){

        trace("got stream",stream);
        var streamURL = untyped __js__('window.URL').createObjectURL(stream);
        trace("stream url",streamURL);
        views.video.src = streamURL;

        onSources(videoSources);
        
        //trace("AAAAA");
        //trace(stream);
    }
    function onUserMediaError(e){
        window.alert("Fuck");
    }

    static function main(){
        new Main();
    }
}