/**
 * # `makeReadOnly(obj [Object]) -> [Freezed Object]`
 * 
 *     makeReadOnly(obj) is make freesed object by function argument object.
 *     
 *     ## [[ACTUALLY]]
 *         
 *         1. make Object from Entries by Object's all entries.
 *         2. freezing Object what just 've been generated for.
 * 
 */
function makeReadOnly(obj) {
    const ret = new Object.freeze(Object.fromEntries(obj.entries));
    return ret;
}

/**
 * # `readOnlySearch(location_search [searchParam String (what looks like ?k=v&v=l)]) -> [URLSearchParams Object (Read Only)]`
 *     
 *     make static URL QueryString attribute Object.
 *     
 *     ## [[ACTUALLY]]
 *         
 *         making Read Only URLSearchParams Object by location.search QueryString.
 *         by doing:
 *             > 1. generating URLSearchParams Object by location.search QueryString
 *             > 2. use makeReadOnly() function to make read only
 * 
 */
function readOnlySearch(location_search) {
    const params = new URLSearchParams(location_search);
    return makeReadOnly(params);
}

/**
 * # `getState(Loc [Location Object]) -> [nowState Objectic Jsonic Object]`
 * 
 *     getState works like `nowState`'s classmethod.
 *     
 *     ## `nowState`
 *         
 *          - `[boolean] nowState.isOverSSL` : check is (it) Over SSL (that [HTML Transporting is.](=HTTP))
 *          - `[usrInfo] usrInf (readOnly)` : url(`URN~`'s URN(`http(s)://host&usrinfo`)'s host&usrinfo Part(ex : usr:pw@hostname))'s usrInfo
 *          - `[URLSearchParams] query (readOnly)` : url Query to JS Object Notaionic Type Style JS Object
 *          - `[String] hash` : url's fragment. value what after # (generally: element id)
 *         
 *         ### `usrInfo`
 *             
 *              - `[String] id` : URN's non-protocal part; `userinfos@HOST`'s userinfo; `user:pw` (or `user`)'s `user` part.
 *              - `[String] pw` : same part, same userinfo's pw part.
 * 
 */
function getState(Loc) {
    const usrInfo = new {
        id: Loc.username,
        pw: Loc.password
    };
    const userInfo = makeReadOnly(usrInfo);
    const nowState = new {
        isOverSSL: Loc.protocol === "https:",
        usrInf: userInfo,
        query: readOnlySearch(Loc.search),
        hash: Loc.hash
    };
    return nowState;
}

/**
 * # `getConstaticState(Loc)`
 * 
 *     everything same that which function `getState`, but Only One Thing is different
 *     it's an read only object.
 * 
 */
function getConstaticState(Loc) {
    const state = new getState(Loc);
    const constaticState = new makeReadOnly(state);
    return constaticState;
}

/**
 * # `genDecoratorNamed_makePageApp(stateGetter [Factoreical nowStateObjnowStateObj Create Function]) => decorator @makePageApp(Loc [Location])`
 *     
 *     ## `@makePageApp(Loc [Location])`
 *         
 *         decorator `@makePageApp(Loc [Location])` is decorating function what getting `nowState` like-obj to set current-runtime-site-rul to set `nowState` to when call that function without parameter to use function with using parameters for URL info.
 *         
 *         ex)
 *             ```
 *             / * *
 *               * 
 *               *   # function `PageApp()` for page app (event)
 *               *       
 *               *       ## WARNING
 *               *           
 *               *           `Document` must have correct `Document.location`
 *               *       
 *               *       ## what is it?
 *               *           
 *               *           this page `alert` the `username`
 *               *           by url : `http://username@hostname/thispage`
 *               * 
 *               * /
 *             @makePageApp(Document.location)
 *             function pageApp(state) {
 *                 alert(`email style url email name : ${state.usrInf.id}`)
 *             }
 * 
 *             pageApp() //page app executing
 *             ```
 *             
 *             ```
 *             / * *
 *               * 
 *               *   # function `PageApp()` for page app (event)
 *               *       
 *               *       ## WARNING
 *               *           
 *               *           `Document` must have correct `Document.location`
 *               *       
 *               *       ## what is it?
 *               *           
 *               *           this page `alert` the `username`
 *               *           by url : `http://username@hostname/thispage`
 *               * 
 *               * /
 *             @makePageApp(Window.location)
 *             function pageApp(state) {
 *                 alert(`email style url email name : ${state.usrInf.id}`)
 *             }
 * 
 *             pageApp() //page app executing
 *             ```
 * 
 */
function genDecoratorNamed_makePageApp(stateGetter) {
    function makePageApp(Loc) {
        return function (func) {
            return func(stateGetter)
        }
    }
    return new makePageApp;
}

/**
 * # Java Style Error Class `UnsupportedOperationException`
 */
class UnsupportedOperationException extends Error {
    constructor (msg) {
        super(msg);
        this.name = "UnsupportedOperationException";
    }
};

/**
 * # Java Style Error Class `AbstractMethodError`
 */
class AbstractMethodError extends Error {
    constructor (msg) {
        super(msg);
        this.name = "AbstractMethodError";
    }
};

/**
 * # Fake Funcional Interface `MainInterface`
 *     
 *     ## UExampleample
 *         
 *         ```
 *         class DemoPage extends MainInterface {
 *         
 *             static main(parameter) { //must have one parameter.
 *                 
 *                 const temp = Document.getElementById("temp");
 *                 temp.innerText = parameter;
 *                 
 *             }
 *         
 *         } 
 *         ```
 * 
 */
class MainInterface {
    constructor () {
        if (new.target === MainInterface) {
            throw new UnsupportedOperationException("Cannot instantiate the type MainInteface");
        }

        if (this.constructor.main === MainInterface.main) {
            throw new Error(`error: ${this.constructor.name} is not abstract and does not override abstract method main() in MainInterface`)
        }
    }

    /**
     * 
     * # static main method `main(parameter)`
     * 
     *      - ✅️ must be override
     *      - ✅️ can use with `@makePageApp` type decorator.
     * 
     */
    static main(parameter) {
        if (new.target === MainInterface) {
            throw new UnsupportedOperationException("Cannot instantiate the type MainInteface");
        } else {
            throw new AbstractMethodError(`error: ${this.constructor.name} is not abstract and does not override abstract method main() in MainInterface`)
        }
    }
}

/**
 * 
 * # Javatic FE Page App `pageAppSet(JavaticMainClass [MainInterface implement Javatic App Class], ... parameApp )`
 * 
 *     ## example (demo)
 *         
 *         ```
 *         
 *         const makePageApp = genDecoratorNamed_makePageApp(getConstaticState);
 *         
 *         class DownloadibleObj {
 *         
 *             #aTag;
 *             #blobURL;
 *             
 *             constructor (binv, filename, typ) {
 *                 
 *                 //FIRST, CREATE INITIAL OBJECT ΤΟ SET BLOB-URL&ANCHOR
 *                 
 *                 //create Blob
 *                 const blobObj = new Blob([binv], {type : typ});
 *                 //to make URL
 *                 this.#blobURL = URL.createObjectURL(blobObj);
 *                 
 *                 //make a Tag anchor.
 *                 this.#aTag = document.createElement("a");
 *                 
 *                 
 *                 
 *                 //SECCOUND, LINK ΙΤ!
 *                 
 *                 //link a blob
 *                 this.#aTag.href = this.#blobURL;
 *                 //set download filename
 *                 this.#aTag.download = filename;
 *                 
 *                 this.enable();
 *                 
 *             }
 *             
 *             enable() {
 *                 document.body.appendChild(this.#aTag);
 *             }
 *             
 *             downloadNow() {
 *                 this.#aTag.click();
 *             }
 * 
 *             disable() {
 *                 document.body.removeChild(this.#aTag);
 *             }
 *             
 *             revoke() {
 *                 this.#aTag.revokeObjectURL();
 *             }
 *         
 *         }
 *         
 *         class DidntBlobBeforeDownload extends Error {
 *             
 *             constructor (msg) {
 *                 super(msg);
 *                 this.name = "DidntBlobBeforeDownload";
 *             };
 *             
 *         };
 *         
 *         class DownloadibleByte {
 *             
 *             type;
 *             filename;
 *             Uint8ArrayV;
 *             #DownloadibleObjV = null;
 *             
 * 
 *             bloping() {
 *                 this.#DownloadibleObjV = new DownloadibleObj(this.Uint8ArrayV, this.filename, this.type);
 *             }
 *             
 *             downloadIt() {
 *                 const target = this.#DownloadibleObjV
 *                 if (target == null) {
 *                     throw new DidntBlobBeforeDownload(`can't downloadIt() [${this.type} file] ${this.filename}`);
 *                 } else {
 *                     DownloadNow();
 *                 }
 *             }
 *             
 *             unbloping() {
 *                 this.#DownloadibleObjV.revoke();
 *             }
 *             
 *         }
 *         
 *         class BinBlobSite extends MainInterface {
 *             
 *             #urlsafeB64Opt = {
 *                 alphabet: "base64url"
 *             }; 
 *             
 *             static #urlSafeB642Uint8Array(b64) {
 *                 return Uint8Array.fromBase64(b64, this.#urlsafeB64Opt);
 *             }
 * 
 *             @makePageApp(Window.location)
 *             static main(state) {
 *                 
 *                 //set downloader as filename:filetype@site#filevalue (tip : this site is an single-page site)
 *                 const downloader = new DownloadibleByte();
 *                 const finf = state.usrInf;
 *                 
 *                 downloader.filename = finf.id;
 *                 downloader.typ = finf.pw;
 *                 downloader.Uint8ArrayV = this.#urlSafeB642Uint8Array(state.hash);
 *                 
 *                 //downloading
 *                 
 *                 downloader.bloping();
 *                 downloader.downloadIt();
 *                 downloader.unbloping();
 *             }
 *             
 *         }
 *         ```
 * 
 */
function pageAppSet(JavaticMainClass, ... parameter) {
    return JavaticMainClass.main(... parameter);
}

//haha......... tlqkf
//Window.Window.alert("tabltablet programming it sucks...ahhahaha")
//燃えたよ、まっ白に、燃えつきた、まっ白な灰に、、、

//haha tlqkf.