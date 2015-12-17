import js.Browser.*;
import js.html.MediaStreamTrack;
import js.html.SelectElement;
import js.html.VideoElement;



class Main {

    var views : {
        sources : SelectElement,
        video : VideoElement
    };

    var videoSources:Array<MediaStreamTrack>;
    var selectedSource:MediaStreamTrack;

    function new(){
        views = {
            video : document.createVideoElement(),
            sources : document.createSelectElement()
        };
        views.video.autoplay = true;
        document.body.appendChild(views.video);

        document.body.appendChild(views.sources);

        UserMedia.getSources(function(sources){
            onSources(sources);
            selectUserMedia(videoSources[0]);
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
                selectUserMedia(s);
            };
            views.sources.appendChild( o );
        }

        
    }

    function selectUserMedia(source:MediaStreamTrack){
        selectedSource = source;
        var opt = {
            video:true,
            optional:[
                {
                    sourceId:source.id
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