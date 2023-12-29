if (window.app && window.app.$destroy) window.app.$destroy();

document.body.classList.add('bg-slate-200');

const fixedFull = 'top-0 left-0 bottom-0 right-0 fixed';

const fixedRight = 'top-0  bottom-0 right-0 fixed';
const rowLg = 'border-b-[1px] border-salete-100 last:border-0  flex items-center w-full min-h-[88px]';
const rowLg_lb = 'w-[75px] text-[#999] p-5';
const rowLg_lbBlock = `w-full text-[#999]`;
const rowLg_Action = `
ml-[auto] my-[4px] relative min-h-[76px] h-full w-[88px] flex-[0_0_88px]
border-l-[1px] border-slate-100 flex items-center justify-center
group active:bg-blue-500 active:text-white
`;
const action_x = `
before:content-[''] before:w-[70%] before:h-[2px] before:bg-slate-400 
before:absolute before:top-[50%] before:m-[auto] before:rotate-45 before:rounded-lg

after:content-[''] after:w-[70%] after:h-[2px] after:bg-slate-400
after:absolute after:top-[50%] after:m-[auto] after:-rotate-45 after:rounded-lg

active:bg-blue-500 active:before:bg-white active:after:bg-white
`;
const action_qr = `
before:content-[''] before:w-[10px] before:h-[32px] 
before:border-slate-400 before:border-[1px] before:border-r-[0] before:mr-[10px]
group-active:before:border-white

after:content-[''] after:w-[10px] after:h-[32px]
after:border-slate-400 after:border-[1px] after:border-l-[0] after:ml-[10px]
group-active:after:border-white
`;
const textAction = `
underline  underline-offset-4 active:text-blue-500 select-none 
`;

const svg_close = `
<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
</svg>
`;

const pending = `
<div class="h-[24px] rounded-lg w-full u1 bg-slate-200 animate-pulse"></div>
`;

const control = `rounded-lg py-1 px-2 border-[1px] h-[42px] flex items-center border-slate-200 w-full my-2`;




document.body.innerHTML = `
<div id="app" class="w-full h-full  overflow-auto">

    

    <div v-bind:data-show="menuShow" class="flex h-[48px] border-b-[1px] border-slate-200 items-center bg-white data-[show=true]:bg-blue-100">
        <div  class="group h-full w-[48px] flex items-center justify-center relative active:bg-blue-500 "
            v-on:click="menuShow = !menuShow">
            <span class="h-[3px] bg-slate-500 absolute w-[28px] top-[14px] group-active:bg-white"></span>
            <span class="h-[3px] bg-slate-500 absolute w-[28px] top-[22px] group-active:bg-white"></span>
            <span class="h-[3px] bg-slate-500 absolute w-[28px] top-[30px] group-active:bg-white"></span>
        </div>
        <div v-for="(m) in modulesActive()" 
             v-html="m.text" class="grow truncate h-full flex items-center "></div>
        <div v-for="(m) in modulesActive()" 
             v-if="m.filterProps && m.filterProps.length"
             v-on:click=" filterPropsShow = !filterPropsShow"
              class="w-[48px] truncate h-full flex items-center justify-center bg-slate-100">
              FT[{{m.filterProps.filter(z=>z.value).length}}]
        </div>
    </div>

    <!--module active-->
    <div class="h-[calc(100vh_-_48px)] w-full  overflow-auto relative" 
         v-for="(m) in modulesActive()"
         v-on:scroll="scrollItem($event)">
        
        <div v-bind:class="'w-full h-[' + (m.scrollHeight || 0) + 'px]'">
            <div v-for="(x,i) in viewData(m)" 
                v-if="   scrollY1 - wh() <= i* m.itemHeight && i* m.itemHeight <= scrollY2 + wh()"
                v-bind:class="'absolute p-3 pb-0 last:pb-3 w-full h-['+ m.itemHeight   +'px] top-[' + (i* m.itemHeight)+'px]'">
                <div class="py-3 px-5  rounded-lg bg-white data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:drop-shadow" 
                       
                        v-bind:data-active="x == m.itemActive">
                    <span  class="inline-block min-w-[75px] active:bg-yellow-200" v-on:click="m.setActive && m.setActive(x)" v-html="m.getHtml ? m.getHtml(x): ''"></span>
                </div>
            </div>
        </div>
    </div>

    <!--menu show-->
    <div v-if="menuShow" class="z-[9] fixed bg-white/80 top-[48px] left-0 bottom-0 right-0" v-on:click="menuShow = false"></div>
    <div v-if="menuShow" class="z-[10] fixed top-[48px] left-0 bottom-0 w-[80%] drop-shadow-2xl bg-white">
        <div v-for="(m) in modules"
            v-on:click="modulesActive(m); menuShow= false"
            class="py-5 px-[48px] truncate border-b-[1px] border-slate-100 last:border-0 cursor-default"
            v-html="m.text">
        </div>
    </div>

    <!-- word detail -->
    <div v-if="wordActive">
        <div class="${fixedRight} w-[80%] bg-white drop-shadow-2xl overflow-auto" v-for="w in [wordActive]">
            <div class="bg-slate-200 h-[6px] rounded-lg animate-pulse absolute left-3 right-3 top-[10px]" v-if="wordMeaning"></div>
            <div class="${rowLg} data-[head=true]:bg-slate-100 
                        data-[head=true]:text-blank data-[head=true]:font-bold data-[head=true]:border-slate-200 data-[head=true]:border-b-[2px]
                        group"
                 v-for="(p) in wordProps" 
                 v-bind:data-head="p.head" >
                <div class="p-5 grow flex flex-col" v-on:click="p.onClick && p.onClick()">
                    <div v-if="!p.head" class="${rowLg_lbBlock} text-[12px]">{{p.text || p.name}} {{p.textInput ? '[_]':''}}</div>
                    <div v-bind:data-head="p.head" v-if="!p.render"  class="data-[head=true]:text-4xl flex break-all" v-html="p.getValue ? p.getValue(w): w[p.name]"></div>
                    <div v-else="p.render" class="w-full mt-3 max-h-[30vh] overflow-auto" v-html="p.render()"></div>
                </div>
                
                
                
                <div v-if="p.close" v-on:click="p.close()" class="${rowLg_Action}">
                    ${svg_close}
                </div>
            </div>

            <div class="absolute bottom-0 right-0 left-0 bg-white border-t-[1px] p-5 bg-slate-100" 
            v-if="wordPropEdit" v-for="e in [wordPropEdit]">
                <textarea 
                    v-bind:value="wordActive[e.name]" 
                    v-on:change="wordPropEditValue = $event.target.value"
                    class="w-full border-[1px] bg-[#000] text-white rounded-lg p-2"
                    placeholder="input..."
                    >
                </textarea>
                <div class="flex justify-between">
                    <div class="${textAction}" v-on:click="wordPropEdit = null; wordPropEditValue= null">Cancel</div>
                    <div class="${textAction}" v-on:click="wordPropEdit = null;set(wordActive, e.name, wordPropEditValue);wordPropEditValue=null; store()">OK</div>
                </div>
            </div>
        </div>
    </div>

    <!--filterProps-->
    <div v-if="filterPropsShow" class="${fixedFull} z-[9]" v-on:click="filterPropsShow= false"></div>
    <div v-if="filterPropsShow" class="filterProps ${fixedRight} top-[48px] max-w-[80%] w-[300px] bg-white drop-shadow-2xl overflow-auto z-[10]">
        <div v-for="(m) in modulesActive()"
            class="w-full max-h-[calc(100%_-_48px)] min-h-[100px] overflow-auto">
            
            

            <div v-for="(p) in m.filterProps" class="p-3 border-b-[1px] border-slate-200 last:border-0">
                <div>{{p.name}}</div>
                <div v-if="p.type == 'select'">
                    <select class="${control}" v-model="p.value">
                        <option value="">--Chọn--</option>
                        <option v-for="(op) in p.options" v-bind:value="typeof op == 'string' ? op: op.value">{{typeof op == 'string' ? op: op.text}}</option>
                    </select>
                </div>
                <div v-else="">
                    <input type="text" class="${control}" v-bind:placeholder="p.placeholder" v-model="p.value" />
                </div>
            </div>

        </div>
        <div class="h-[48px] border-t-[1px] border-slate-200 flex items-center justify-between px-3">
            <div class="${textAction}" v-on:click="filterPropsReset()">Reset</div>
            <div class="${textAction}" v-on:click="filterPropsSet()">Set</div>
    
        </div>
    </div>
</div>
`;


const _console = window.console;

var console = {
    $el: null,
    n: 3,
    show(arr) {
        var t = this.$el;
        if(!t){
            var x = document.createElement('div');
            document.body.appendChild(x);
            x.className = `fixed bottom-0 z-[99999] left-0 right-0 bg-black text-white text-[11px] max-h-[100px] overflow-auto`;
            this.$el = x;
            t= x;
        }

        var el= document.createElement('div');
        el.className ='my-5 p-3 border-b-[1px] border-sale-200';
        t.prepend(el);
        for(var i=0;i< arr.length;i++){
            var div= document.createElement('div');
            div.innerHTML = JSON.stringify(arr[i]);
            div.className='truncate';
            el.appendChild(div);
        }
        while(t.children.length> this.n)
        {
            t.children[t.children.length-1].remove()
        }


    },
    log() {
        this.show(arguments);
        _console.log.apply(null, arguments);
    },
    error() {
        this.show(arguments);
        _console.error.apply(null, arguments);
    },
    clear() {

        _console.clear.apply(null, arguments);
    },
    info() {
        this.show(arguments);
        _console.info.apply(null, arguments);
    }

};

window.console= console;

// for (var k in _console) {
//     if (typeof _console[k] === 'function') {
//         console.log('fn', k);
//         console[k] = function () {
//             _console[k].apply(null, arguments);
//         }
//     }
// }




function PlaySound(t) {
    var e = document.createElement("audio");
    e.setAttribute("src", t),

        document.body.appendChild(e);
    e.play();

}


function textSubsToHtml(x, opt, deep) {
    var s = '';
    if (Array.isArray(x)) {
        s = '<ul class="pl-5 my-3">';
        var d = deep || 0;

        if (opt) {
            var cls = opt && opt.color ? opt.color : '';
            var step = opt.step || 0;
            if (cls) {
                var arr = cls.split('-');
                var n = arr[arr.length - 1];
                n = parseInt(n);
                if (n) {
                    n = n - d * step;
                    n = Math.max(100, n);
                    arr[arr.length - 1] = n;
                    cls = arr.join('-');
                }

            }
        }




        x.forEach(z => {
            if (z.text) {
                var li = `<li><div class="${cls}">${z.text}</div>`;
                li += textSubsToHtml(z.subs, opt, d + 1);
                li += '</li>';
                s += li;
            }
        });
        s += '</ul>';
    }
    return s;
}

function textStore(name, url) {




    return new Promise((resolve, reject) => {


        fetch(url).then(x => x.text()).then(txt => {
            resolve(txt);
        })


    });
}

function parseJSON(s) {

    var a = 0;
    var b = s.length - 1;
    while (a < s.length) {
        if (s[a] == '[' || s[a] == '}') {
            break;
        }
        a++;
    }
    while (b > 0) {
        if (s[b] == '[' || s[b] == '}') {
            break;
        }
        b--;
    }
    if (a > -1 && b > -1) {
        var s1 = s.substring(a, b);
        return JSON.parse(s1);
    }
    return JSON.parse(s);
}


var data = {

    modules: [
        {
            text: 'Top 3000 words',
            name: 'top3000word_en',
            loading: true,
            data: [
                //{ w: ''}
            ],
            storeKey: 'top3000word_en',
            onLoad() {
                var t = this;

                if (t.loading) {
                    app21.prom('TEXT', {
                        name: t.storeKey
                    }).then(rs => {
                        try {
                            var arr = JSON.parse(rs.data);
                            if (Array.isArray(arr)) {
                                t.data = arr;
                            }
                        } catch {

                        }

                        if (t.data.length == 0) {
                            var url = 'https://raw.githubusercontent.com/tienhungezs/language/main/en.3000.json';

                            app21.prom('DOWNLOAD_URL', url).then(rs => {

                                var contentType = rs.data.contentType.split(';')[0];
                                var s = rs.data.text;
                                try {
                                    var arr = JSON.parse(s);
                                    if (Array.isArray(arr)) {
                                        t.data = arr;
                                        t.scrollHeight = t.data.length * t.itemHeight;
                                        update();
                                    }
                                } catch {

                                }
                                t.loading = false;

                            }).catch(e => {

                            })
                        } else {
                            data.loading = false;
                        }

                    })
                }
            },
            active: true,
            store() {
                app21.prom('TEXT', {
                    name: this.storeKey,
                    content: JSON.stringify(this.data)
                }).then(rs => {
                    //console.log('Da_luu')
                })
            },
            getHtml(x) {
                return x.w;
            },
            setActive(x) {
                data.wordActive = x;
                this.itemActive = x;
            },
            itemActive: null,
            itemHeight: 62,
            filterProps: [
                {
                    name: 'key',
                    value: '',
                    placeholder: 'Begin search, * contain...',
                    onItem(x) {
                        var k = this.value;
                        if (!k) return true;
                        k = k.toLowerCase();
                        if (k.startsWith('*')) {
                            k = k.substring(1);
                            return x.w.indexOf(k) > -1
                        }

                        return x.w.toLowerCase().startsWith(k);
                    }
                }
            ],
            scrollHeight: 0

        },
        {
            text: 'Top 1000 english-phrases(englishspeak.com)',
            name: 'top1000phrases_en',
            loading: true,
            data: [
                //{ phrase: ''}
            ],
            storeKey: 'top1000phrases_en',
            onLoad() {
                var t = this;
                //console.log('load', t.storeKey);
                if (t.loading) {
                    app21.prom('TEXT', {
                        name: t.storeKey
                    }).then(rs => {
                        try {
                            var arr = JSON.parse(rs.data);
                            if (Array.isArray(arr)) {
                                t.data = arr;
                            }
                        } catch {

                        }

                        if (t.data.length == 0) {
                            var url = 'https://raw.githubusercontent.com/tienhungezs/language/main/en.1000.phrases.json';

                            app21.prom('DOWNLOAD_URL', url).then(rs => {

                                var contentType = rs.data.contentType.split(';')[0];
                                var s = rs.data.text;

                                try {
                                    var arr = JSON.parse(s);
                                    if (Array.isArray(arr)) {
                                        t.data = arr;
                                        t.scrollHeight = t.data.length * t.itemHeight;
                                        update();
                                    }
                                } catch {

                                }
                                t.loading = false;

                            }).catch(e => {

                            })
                        } else {
                            data.loading = false;
                        }

                    })
                }
            },
            getHtml(x) {

                return x.phrase;
            },
            setActive(x) {

                this.itemActive = x;
            },
            itemActive: null,
            itemHeight: 75,
            filterProps: [
                {
                    name: 'key',
                    value: '',
                    onItem(x) {
                        return x.phrase.indexOf(this.value) > -1
                    }
                },
                {
                    name: 'type',
                    type: 'select',
                    value: '',
                    options: ['Common expressions', 'Greetings', 'Travel, directions', 'Numbers and money', 'Location', 'Phone/internet/mail', 'Time and dates', 'Accommodations', 'Dining', 'Making friends', 'Entertainment', 'Shopping', 'Communication difficulties', 'Emergency and health', 'Cultural expressions/terms', 'General questions', 'Work', 'Weather', 'Verbs', 'Miscellaneous'],
                    onItem(x) {
                        if (!this.value) return true;
                        return x.category == this.value
                    }
                }
            ],
            scrollHeight: 0
        },

    ],
    modulesActive(ma) {
        if (ma) {
            this.modules.forEach(m => {

                Vue.set(m, 'active', m.text == ma.text);
                if (m.text == ma.text) {
                    document.title = m.text;
                    m.onLoad();
                }
            })
        }
        return this.modules.filter(m => m.active);
    },
    moduleLoad(mName) {
        this.modules.forEach(m => {
            if (m.name == mName) m.onLoad();
        })
    },
    moduleData(mName, fn) {
        this.modules.every(m => {
            if (m.name == mName) {
                fn(m.loading, m.data);
                return false;
            }
            return true;
        })

    },
    menuShow: false,
    wordActive: null,
    wordProps: [
        {
            name: 'w',
            head: true,
            close() {
                data.wordActive = null;
            }
        },
        {

            name: 'voice'
        },
        {
            name: 'audio'
        },
        {

            name: 'meaning',
            render() {
                var x = data.wordActive.meaning;
                var html = textSubsToHtml(x, {
                    color: 'text-gray-900',
                    step: 200
                });

                return html;
            }
        },
        {

            name: 'top_phrases',
            render() {
                var arr = [];
                var any = false;
                if (data.wordActive) {
                    data.moduleData('top1000phrases_en', (loading, _data) => {
                        any = !loading;
                        arr = _data.filter(ph => {

                            var x = data.wordActive.w.toLowerCase();
                            if (x.length < 3) {
                                if (!ph.words) {
                                    ph.words = ph.phrase.toLowerCase().split(' ');

                                }
                                return ph.words.filter(x1 => x1 == x).length
                            }

                            return `${ph.phrase}`.toLowerCase().indexOf(data.wordActive.w) > -1;
                        })
                    })
                }




                if (arr.length > 0) {
                    return arr.map(x => `<div class="p-1">${x.phrase}</div>`).join('')
                }

                if (any) {
                    return '(none)';
                }
                return pending;
            }
        },
        {
            name: 'top_sentences',
            render() {
                return pending;
            }
        }
    ],
    wordPropEdit: null,
    wordPropEditValue: null,
    wordMeaning: true,
    filterPropsShow: false,
    filterPropsReset() {
        this.modules.forEach(m => {
            if (m.active && m.filterProps) {
                m.filterProps.forEach(p => {
                    p.value = '';
                })
            }
        })
    },
    filterPropsSet() {
        this.modules.forEach(m => {
            if (m.active && m.filterProps) {

                var nShow = 0;
                m.data.forEach(x => {
                    delete x.filterShow;

                    var pass = true;
                    m.filterProps.forEach(ft => {
                        pass = ft.onItem(x) ? pass : false;
                    })
                    Vue.set(x, 'filterShow', pass);
                    if (pass) {

                        nShow++;
                    }

                })
                m.scrollHeight = nShow * m.itemHeight;
            }
        })
        this.filterPropsShow = false;
    },
    qrOpen(fn) {
        app21.prom('OPEN_QRCODE').then(rs => {
            var qrCode = rs.data;
            fn && fn(qrCode)

        })
    },
    set(a, b, c, upd) {
        Vue.set(a, b, c);
        if (upd) this.store();
    },
    scrollY1: 0,
    scrollY2: window.innerHeight - 48,
    scrollItem(evt) {
        var x = evt.target.scrollTop;
        var y = x + evt.target.clientHeight;
        this.scrollY1 = x;
        this.scrollY2 = y;
    },
    getModuleItems(m) {
        var h = m.itemHeight || 62;
        var a = this.scrollY1 - window.innerHeight;
        var b = this.scrollY2 + window.innerHeight;
        return m.data.filter((x, i) => {
            if (a <= i * h && i * h <= b) {
                //console.log(i);
                return true;
            };
            return false;
        })
    },
    wh() {
        return window.innerHeight;
    },
    store() {
        this.modules.forEach(m => {
            if (m.active) {
                m.store && m.store();
            }
        })
    },
    getScollHeight(m) {
        if (!m || !Array.isArray(m.data)) return 0;
        var n = m.data.filter(x => {
            return x.filterShow !== false;
        }).length;
        //console.log('n', n, n * m.itemHeight);
        return n * m.itemHeight;

    },
    viewData(m) {
        if (!m || !Array.isArray(m.data)) return [];
        return m.data.filter(x => {
            if (x.filterShow === undefined) return true;
            return x.filterShow === true;
        })
    }

};



var app = new Vue({
    el: document.querySelector('#app'),
    data: data,
    mounted() {
        data.modules.forEach(m => {
            if (m.active) {
                m.onLoad();
            }
        })
    },
    watch: {
        wordActive(w) {
            if (w) {
                data.moduleLoad('top1000phrases_en');
                var x = `en.3000.vi.${w.w[0]}.json`;
                data.wordMeaning = true;
                console.log('vi');
                textStore(x, `https://raw.githubusercontent.com/tienhungezs/language/main/en.3000.vi/${x}`)
                    .then(s => {
                        try {
                            console.log('vi', s)
                            var arr = JSON.parse(s);
                            arr.every(z => {
                                if (z.w == w.w) {
                                    Vue.set(w, 'voice', z.voice);
                                    Vue.set(w, 'meaning', z.vi);
                                    return false;
                                }
                                return true;
                            })
                        } catch (e) {
                            console.log(e);
                        }
                        data.wordMeaning = false;
                    })
            }
        }
    }
})