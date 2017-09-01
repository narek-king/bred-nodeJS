/**
 * Created by ntutikyan on 27.06.2017.
 */
const cheerio = require('cheerio')
const Client = require('node-rest-client').Client;
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const url = 'mongodb://127.0.0.1:27017/bread';
let client = new Client();
let page = '';

/*fs.readFile('message.json', (err, data) => {
    if(err){
        console.error(err);
    }
    MongoClient.connect(url,(err, db) => {
        // assert.equal(null, err);
        console.log("Connected successfully to server");
        let press = JSON.parse(data.toString())



        db.collection('loafs').insertMany(press, (err, r) => {
            assert.equal(null, err);
            assert.equal(press.length, r.insertedCount);


            db.close();
    });

});
});*/

MongoClient.connect(url, (err, db) => {
    // assert.equal(null, err);
    console.log("Connected successfully to server");
    let collection = db.collection('loafs');
    collection.find().toArray(function(err, docs) {
        assert.equal(null, err);
        console.log(docs.length)
    });


     db.close();
    });



//initialize
let ANSI = new Array ([]);
let UNICODE = new Array ([]);

for(let i = 178; i <= 252; i+=2){
    ANSI.push(i); //mecatar ANSI
    UNICODE.push(1328 + (i-176)/2); //mecatar Unicode
    ANSI.push(i+1); //poqratar ANSI
    UNICODE.push(1376 + (i-176)/2); //poqratar Unicode
}
ANSI.push(168);		UNICODE.push(0x587); //ev
ANSI.push(183);		UNICODE.push(8226);	//poqratar g-n (bullet)
ANSI.push(8226);	UNICODE.push(1379);	//poqratar g-n (bullet)
ANSI.push(39);      UNICODE.push(0x55A); //apostrophe
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


let loaf = {
    text: '',
    date: '',
    title: '',
    bQuot: '',
    bInYear: '',
    sQuot: ''
};

let convert = (from, A2U) => {// from-n u to-n textareaneri IDnern en
    let arrFrom = A2U ? ANSI : UNICODE;
    let arrTo = A2U ? UNICODE : ANSI;

    let ekac = from;
    let gnacogh = '';
    let len = ekac.length;
    let tar;
    let current; //boolean

    for(let i=0; i<len; i++){
        tar = ekac.charCodeAt(i);
        //console.info(String.fromCharCode(tar));
        let FromumKa=false;
        for(let j=0; j<arrFrom.length; j++){
            if(tar===arrFrom[j]){
                if(arrTo[j]==='') {FromumKa=true; break;}
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

let filterText = (text) => {
    let newLines = new RegExp(/\r?\n|\r/);
    let dashes = new RegExp(String.fromCharCode(173));
    let finalRegExp = new RegExp(dashes.source + '|' + newLines.source, 'g');
    text = text.replace(finalRegExp,'');
    //spaces must be filtered separately
    text = text.replace(/ +(?= )/g,'');

    return text;
}

let toLoaf = (data) => {
    page = data.toString();
    let $ = cheerio.load(page);
    for (let i = 1; i < 10; i++) {
        let text = $('.box' + i).text();
        text = filterText(text);
        let converted = convert(text, true);
        switch (i) {
            case 1:
                loaf.text = converted;
                break;
            case 3:
                loaf.date = converted;
                break;
            case 4:
                loaf.title = converted;
                break;
            case 5:
                loaf.bQuot = converted;
                break;
            case 6:
                loaf.bInYear = converted;
                break;
            case 8:
                loaf.sQuot = converted;
                break;
        }// console.log('Box '+ i + '>>> ' + converted);
    }
    return loaf;
};

let bread = new Array([]);
let readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            let loaf = toLoaf(data);
            (err) ? reject(err) : resolve(loaf)
        });
    });
};

let dirReader = (dir) => {
    return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) =>
        (err) ? reject(err) : resolve(files)
    )
    })
};

let p = () => {
    dirReader('./html').then(files => files.forEach(file => {
        readFile(`./html/${file}`).then(result => {
            fs.appendFileSync('./message.json', JSON.stringify(result));
            fs.appendFileSync('./message.json', ',\n');
        })
    }))
};
// p();

// for (let i =2; i < 6; i++){
//     let carr;
//     readFile('./html/'+2+'.htm').then(result => console.log(result))
//     bread.push(carr)
// }
// console.log(dirReader('./html'));

/*
client.get('http://parse.amaa.am/index.php?name=anun+azganun', function (data, response) {
    // parsed response body as js object
    page = data.toString();
    let $ = cheerio.load(page);
    console.log($('tr').eq(1).find('td').first().text());
    // console.log($.html());
    // raw response


    // console.log(response);
});

*/
