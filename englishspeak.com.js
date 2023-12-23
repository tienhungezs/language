/*
1000 Most Common English Phrases
*/

var tb = document.querySelector('.table')
var body = tb.querySelector('tbody');


function query() {
    var search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

var arr = [];
var category_key = query()['category_key'];
var a = document.querySelector('#category_' + category_key);
var category = a.innerText.trim();
console.log('category:', category);

body.querySelectorAll('tr').forEach(tr => {
    var x = {
        category: category,
        phrase: '',
        audio: ''
    };

    tr.querySelectorAll('td').forEach((td, i) => {
        switch (i) {
            case 0:
                x.phrase = td.innerText.trim();
                break;
            case 1:
                break;
            case 2:
                var onclick = td.querySelector('img').getAttribute('onclick');
                var z = onclick.substring("javascript:PlaySound('".length);
                z = z.substring(0, z.length - 2);
                x.audio = z;

                break;
        }
    })
    arr.push(x);

})

var local = localStorage.getItem('arr');
if (local) {
    try {
        local = JSON.parse(local);

    } catch {

    }
}
if (!Array.isArray(local)) {
    local = [];
}

var n=0;
var m=0;
arr.forEach(x => {
    var any = 0;
    var i = 0;
    while (i < local.length) {
        var z = local[i];
        if (z.phrase == x.phrase) {
            local[i] = x;
            any = true;
            m++;
            break;
        }
        i++;
    }
    if(!any){
        local.push(x);
        n++;
    }

})
localStorage.setItem('arr', JSON.stringify(local));
console.clear();
console.log(`add:${n}; update:${m}`);