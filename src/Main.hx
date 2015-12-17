import js.Browser.*;



class Main {

    function new(){
        UserMedia.get({video:true}, onUserMedia , onUserMediaError );
    }
    function onUserMedia(stream){
        trace("got stream",stream);
        var video = document.createVideoElement();
        var streamURL = untyped __js__('window.URL').createObjectURL(stream);
        trace("stream url",streamURL);
        video.src = streamURL;
        document.body.appendChild(video);
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