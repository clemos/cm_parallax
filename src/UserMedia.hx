
import js.Browser.*;
import js.Error;
import js.html.GetUserMediaRequest;
import js.html.MediaStream;

class UserMedia {

    static function __init__(){
        untyped untyped navigator.getUserMedia = __js__("(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)");
    }
    
    public static function get( request : {}, onSuccess : MediaStream -> Void, onError: Error -> Void ) :Void {
        return untyped navigator.getUserMedia( request, onSuccess, onError );
    }
}