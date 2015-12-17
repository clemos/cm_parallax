import js.Browser.*;
import js.html.DivElement;
import js.html.MediaStream;
import js.html.MediaStreamTrack;
import js.html.OptionElement;
import js.html.SelectElement;
import js.html.VideoElement;



class Main {

    var views : {
        sources : SelectElement,
        video : VideoElement,
        stage : DivElement
    };

    var videoSources:Array<MediaStreamTrack>;
    var selectedSource : String;
    var currentStream : Dynamic;

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

        var o = document.createOptionElement();
        o.innerHTML = "sources";
        //o.disabled = true;
        views.sources.appendChild( o );

        for( s in videoSources ) {
            var o = document.createOptionElement();
            o.innerHTML = s.label;
            o.value = s.id;
            o.selected = selectedSource == s.id;
            
            views.sources.appendChild( o );
        }

        views.sources.onchange = function(e:js.html.Event){
            
            for( o in views.sources.getElementsByTagName('option') ) {

                if( cast(o,OptionElement).value != null && cast(o,OptionElement).selected ) {
                    selectUserMedia(cast(o,OptionElement).value);
                    return;
                }
            }
            
            e.preventDefault();
        };

        
    }

    function selectUserMedia(id:String){
        var opt = {
            video: {
                optional:[{
                    sourceId:id
                }],
                mandatory:{
                    minWidth: window.screen.availWidth / 2,
                    minHeight: window.screen.availHeight / 2,
                }
            }
        };

        if( currentStream != null ) {
            currentStream.stop();
        }

        views.video.src = null;

        selectedSource = id;

        UserMedia.get(opt, onUserMedia , onUserMediaError );
    }
    function onUserMedia(stream){



        trace("got stream",stream);
        var streamURL = untyped __js__('window.URL').createObjectURL(stream);
        trace("stream url",streamURL);
        views.video.src = streamURL;
        views.video.play();

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