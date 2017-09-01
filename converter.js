/**
 * Created by ntutikyan on 28.06.2017.
 */
//initialize
let ANSI = new Array ();
let UNICODE = new Array ();

for(let i = 178; i <= 252; i+=2){
    ANSI.push(i); //mecatar ANSI
    UNICODE.push(1328 + (i-176)/2); //mecatar Unicode
    ANSI.push(i+1); //poqratar ANSI
    UNICODE.push(1376 + (i-176)/2); //poqratar Unicode
}
ANSI.push(168);		UNICODE.push(0x587); //ev

ANSI.push(183);		UNICODE.push(8226);	//poqratar g-n (bullet)
ANSI.push(8226);	UNICODE.push(1379);	//poqratar g-n (bullet)

ANSI.push(39);		UNICODE.push(0x55A); //apostrophe
ANSI.push(176);		UNICODE.push(0x55B); //shesht
ANSI.push(175);		UNICODE.push(0x55C); //bacakanchakan
ANSI.push(170);		UNICODE.push(0x55D); //but
ANSI.push(177);		UNICODE.push(0x55E); //harcakan
ANSI.push(163);		UNICODE.push(0x589); //verjaket
ANSI.push(173);		UNICODE.push(0x58A); //hyphen
ANSI.push(167);		UNICODE.push(0xAB); //bacvogh chakert
ANSI.push(166);		UNICODE.push(0xBB); //pakvogh chakert
ANSI.push(171);		UNICODE.push(0x2C); //storaket
ANSI.push(169);		UNICODE.push(0x2E); //mijaket
ANSI.push(174);		UNICODE.push(0x2026); //bazmaket

ANSI.push(0,0);		UNICODE.push(0,0); //2 hat CUSTOM :)
// end

let ANSIbackup = ANSI.slice(0);	//XEROX!
let UNICODEbackup = UNICODE.slice(0);

function convert(from, to, A2U){// from-n u to-n textareaneri IDnern en
    let arrFrom = A2U ? ANSI : UNICODE;
    let arrTo = A2U ? UNICODE : ANSI;

    let ekac = from;
    let gnacogh = "";
    let len = ekac.length;
    let tar;
    let current; //boolean

    for(let i=0; i<len; i++){
        tar = ekac.charCodeAt(i);
        //console.info(String.fromCharCode(tar));
        let FromumKa=false;
        for(let j=0; j<arrFrom.length; j++){
            if(tar===arrFrom[j]){
                if(arrTo[j]==="") {FromumKa=true; break;}
                gnacogh += String.fromCharCode(arrTo[j]);
                FromumKa = true;
                break;
            }
        }
        if(!FromumKa) {
            gnacogh += String.fromCharCode(tar);
        }
    }
    return gnacogh;
}

function U2A(e){
    console.info("U2A");
    let t1 = CKEDITOR.instances.unicodeextended;
    let t2 = CKEDITOR.instances.ansiextended;
    if(typeof t!='undefined')
        clearTimeout(t);
    t=setTimeout(function(){
        console.info("  U2A");
        $('#unicodeextended').val(t1.getData());
        convert('unicodeextended','ansiextended', false);
        t2.setData($('#ansiextended').val());
    },50);
}
function A2U(e){
    console.info("A2U");
    let t1 = CKEDITOR.instances.unicodeextended;
    let t2 = CKEDITOR.instances.ansiextended;
    if(!t2.checkDirty()) return;
    t2.resetDirty();
    if(typeof tt!='undefined')
        clearTimeout(tt);
    tt=setTimeout(function(){
        console.info("  A2U");
        $('#ansiextended').val(t2.getData());
        convert('ansiextended','unicodeextended',true);
        t1.setData($('#unicodeextended').val());
    },100);
}
function isChanged(i){
    return ANSI[i]!=ANSIbackup[i] || UNICODE[i]!=UNICODEbackup[i];
}
function createMap(){
    let $table = $('<table><tbody></tbody></table>').appendTo($('#tableContainer'));
    let $tr,$lastTd;
    for(let i = 0; i<ANSI.length; i++){
        $tr = $('<tr>').appendTo($table).attr('hamar',i).click(function(){showForm($(this).attr('hamar'));});
        $('<td class="ansi"><span>'+String.fromCharCode(ANSI[i])+'</span></td>').appendTo($tr);
        $('<td class="unicode"><span>'+String.fromCharCode(UNICODE[i])+'</span></td>').appendTo($tr);
        $lastTd = $('<td></td>').appendTo($tr);
        $('<a href="#" class="OK"></a>').attr('hamar',i).click(function(e){e.stopPropagation();changeMap($(this).attr('hamar'));return false}).appendTo($lastTd).hide();
        $('<a href="#" class="reset"></a>').attr('hamar',i).click(function(){resetMap($(this).attr('hamar'));return false}).appendTo($lastTd).hide();
        if(LS)//guini harc@
            if(isChanged(i))
                $tr.addClass('changed').find('.reset').css('display', 'block');
    }
}
function updateMapRow(i){
    let $tr = getMapRow(i).click(function(){showForm($(this).attr('hamar'));});
    $tr.find('td:nth-child(1)').html( String.fromCharCode(ANSI[i]) );
    $tr.find('td:nth-child(2)').html( String.fromCharCode(UNICODE[i]) );

    if(isChanged(i))
        $tr.addClass('changed').find('.reset').css('display', 'block');
    else
        $tr.removeClass('changed').find('.reset').hide();
}
function changeMap(i){
    let $tr = getMapRow(i);
    $tr.find('.reset').css('display', 'block');
    $tr.find('.OK').hide();
    ANSI[i] = parseInt($tr.find('td:nth-child(1) input').val());
    UNICODE[i] = parseInt($tr.find('td:nth-child(2) input').val());
    updateMapRow(i);

    if(LS)
        $('#storage').click(function(){LSsaveMap();return false}).css('display', 'block');
}
function resetMap(i){
    ANSI[i] = ANSIbackup[i];
    UNICODE[i] = UNICODEbackup[i];
    updateMapRow(i);
}
function getMapRow(hamar){
    return $('#tableContainer tbody tr:nth-child('+(parseInt(hamar)+1)+')');
}
function showForm(hamar){
    let $tr = getMapRow(hamar).unbind('click'); //vor el onclicki jamanak ban chani
    $tr.find('td:nth-child(1)').html('<input type="text" value="'+ANSI[hamar]+'"/>');
    $tr.find('td:nth-child(2)').html('<input type="text" value="'+UNICODE[hamar]+'"/>');
    $tr.find('.reset').hide();
    $tr.find('.OK').css('display', 'block');
    addTooltip("#map input","#tInputs");
}

let LS = typeof localStorage!='undefined';
if(LS)
    LSloadMap();
function LSsaveMap(){
    for(let i=0;i<ANSI.length;i++){
        if(!isChanged(i)){
            localStorage.removeItem('mapAnsi'+i);
            localStorage.removeItem('mapUnicode'+i);
        }else{
            localStorage.setItem('mapAnsi'+i, ANSI[i]);
            localStorage.setItem('mapUnicode'+i, UNICODE[i]);
        }
    }
    $('#storage').hide();
}
function LSloadMap(){
    let x;
    for(let i=0;i<ANSI.length;i++){
        x = localStorage.getItem('mapAnsi'+i);
        if(x){
            ANSI[i]=x;
            UNICODE[i]=localStorage.getItem('mapUnicode'+i);
            updateMapRow(i);
        }
    }
}

isExtended = false;
neverExtended = true;
$(function(){
    $('#ansi').click(function(){this.select()})
        .keydown(function(){if(typeof t!='undefined')clearTimeout(t);t=setTimeout(function(){convert('ansi','unicode', true);},50);});
    $('#unicode').click(function(){this.select();})
        .keydown(function(){if(typeof t!='undefined')clearTimeout(t);t=setTimeout(function(){convert('unicode','ansi', false);},50);});

    $('.tabs a').click(function(){toggleExtended();return false});
    function toggleExtended(){
        $('.tabs a').toggleClass('tabActive');
        $('.extended').toggle();
        $('.simple').toggle();
        isExtended=!isExtended;
        if(neverExtended){
            neverExtended=false;
            let config={toolbarLocation : 'none', removePlugins: 'elementspath', resize_enabled:false,skin:'v2',height:158,entities:false};
            let CKEa = CKEDITOR.replace( 'ansiextended', config);
            CKEa.on("instanceReady", function(){this.document.on("keydown", A2U);});
            CKEa.on("instanceReady", function(){this.document.on("paste", A2U);});
            let CKEu = CKEDITOR.replace( 'unicodeextended', config );
            CKEu.on("instanceReady", function(){this.document.on("keydown", U2A);});
            CKEu.on("instanceReady", function(){this.document.on("paste", U2A);});
        }
    }
    $('#mapButton').click(function(){$('#map').toggle();return false});
    createMap();
});
