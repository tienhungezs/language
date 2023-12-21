; (function () {


    const key_store = 'deeptext_en_pending_word';
    const key_arr = 'deeptext_en_words';

    function eq(a, b) {

        if (a == b) return true;

        if (a && b) return a.toLowerCase().trim() == b.toLowerCase().trim();
        return false;

    }

    function scanJsName(jsname) {
        var a = document.querySelector(`[jsname="${jsname}"]`)

        var v = a && a.innerText ? a.innerText : undefined;
        return v;
    }

    function scan(w, tl) {
        [

            () => {
                var names = {
                    toZopb(value) {
                        w.voice = value
                    },
                    W297wb(value) {
                        if (!w.to || typeof (w.to) != 'object' || Array.isArray(w.to)) w.to = {};
                        if (!w.to[tl]) w.to[tl] = {};
                        w.to[tl]['meaning'] = value
                    }
                };

                Object.keys(names).forEach(key => {

                    var v = scanJsName(key);
                    console.log('scan', key, v, w);
                    v && names[key](v);
                })

            }
        ].forEach(f => {
            f();
        })
    }



    function findWord(word, sl, tl) {


        if (localStorage.getItem(key_store) != word) {

            localStorage.setItem(key_store, word)
            var url = `?sl=${sl}&tl=${tl}&text=${word}&op=translate`;
            window.location = url;
            return;
        }
        //localStorage.removeItem(key_store);

        var arr = [];
        try {
            arr = JSON.parse(localStorage.getItem(key_arr));
        } catch {

        }
        if (!Array.isArray(arr)) arr = [];
        var x = null;
        arr.every(w => {
            if (eq(w.w, word)) {
                x = w;
            }
            return x === null;
        });


        function updateArr() {
            arr.sort((a, b) => {
                return a.w > b.w ? 1 : -1
            })
            localStorage.setItem(key_arr, JSON.stringify(arr));
        }

        function updateWord() {
            if (!x.to) {
                x.to = {};
            }


            //find voice
            scan(w, tl);
            updateArr();
        }

        if (!x) {
            x = {
                w: word,
                to: {

                }
            };
            arr.push(x);
            updateArr();
        }




        setTimeout(() => {
            updateWord();
            setTimeout(() => {
                updateWord();
                setTimeout(() => {
                    updateWord();

                }, 300)
            }, 300)
        }, 300)
        window.w = x;

    }


    function getWords() {
        var url = `https://raw.githubusercontent.com/tienhungezs/language/main/en.3000.json`;
        fetch(url).then(x => x.json()).then(words => {
           // console.log(words);
           localStorage.setItem(key_arr, JSON.stringify(words));
        })
    }

    // findWord('abandon', 'en', 'vi');

})();