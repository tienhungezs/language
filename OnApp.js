if (window.app && window.app.$destroy) window.app.$destroy();

document.body.classList.add('bg-slate-200');

const fixedFull = 'top-0 left-0 bottom-0 right-0 fixed';

const fixedRight = 'top-0  bottom-0 right-0 fixed';
const rowLg = 'border-b-[1px] border-salete-100 last:border-0  flex items-center w-full min-h-[88px]';
const rowLg_lb = 'w-[75px] text-[#999] p-5';
const rowLg_lbBlock = `w-full text-[#999]`;
const rowLg_Action = `
ml-[auto] my-[4px] relative min-h-[76px] h-full w-[88px] 
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
    </div>

    <!--module active-->
    <div class="h-[calc(100vh_-_48px)] w-full  overflow-auto relative" 
         v-for="(m) in modulesActive()"
         v-on:scroll="scrollItem($event)">
        
        <div v-bind:class="'w-full h-[' + (m.data.length * m.itemHeight) + 'px]'">
            <div v-for="(x,i) in m.data" 
                v-if=" scrollY1 - wh() <= i* m.itemHeight && i* m.itemHeight <= scrollY2 + wh()"
                v-bind:class="'absolute p-3 pb-0 last:pb-3 w-full h-['+ m.itemHeight   +'px] top-[' + (i* m.itemHeight)+'px]'">
                <div class="py-3 px-5  rounded-lg bg-white data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:drop-shadow" 
                        v-on:click="m.setActive && m.setActive(x)"
                        v-bind:data-active="x == m.itemActive">
                    <div v-html="m.getHtml ? m.getHtml(x): ''"></div>
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
        <div class="${fixedRight} w-[80%] bg-white drop-shadow-2xl" v-for="w in [wordActive]">
            <div class="${rowLg} data-[head=true]:bg-slate-100 
                        data-[head=true]:text-blank data-[head=true]:font-bold data-[head=true]:border-slate-200 data-[head=true]:border-b-[2px]
                        group"
                 v-for="(p) in wordProps" 
                 v-bind:data-head="p.head" >
                <div class="p-5" v-on:click="p.onClick && p.onClick()">
                    <div v-if="!p.head" class="${rowLg_lbBlock} text-[12px]">{{p.text || p.name}} {{p.textInput ? '[_]':''}}</div>
                    <div v-bind:data-head="p.head"  class="data-[head=true]:text-4xl " v-html="p.getValue ? p.getValue(w): w[p.name]"></div>
                </div>
                
                
                <div v-if="p.qrInput" v-on:click=" qrOpen(v=> set(wordActive,p.name, v))" class="${rowLg_Action}  ${action_qr}"></div>

                <div v-if="p.close" v-on:click="p.close()" class="${rowLg_Action} ${action_x}"></div>
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
                    <div class="${textAction}" v-on:click="wordPropEdit = null;set(wordActive, e.name, wordPropEditValue);wordPropEditValue=null">OK</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

var data = {

    modules: [
        {
            text: 'Top 3000 words',
            name: 'top1000en',
            loading: true,
            data: [],
            storeKey: 'top1000en',
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
                    console.log('Da_luu')
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
            itemHeight: 62

        },
        {
            text: 'Top 1000 english-phrases',
            loading: true,
            data: [],
            onLoad() {

            },
            itemActive: null,
            itemHeight: 62
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

            name: 'voice',
            qrInput: true
        },
        {
            name: 'audio',
            qrInput: true
        },
        {

            name: 'meaning',
            qrInput: true,
            textInput: true,
            onClick() {
                data.wordPropEdit = this;
            }
        },
        {

            name: 'top_phrases',

        },
        {
            name: 'top_sentences',

        }
    ],
    wordPropEdit: null,
    wordPropEditValue: null,
    qrOpen(fn) {
        app21.prom('OPEN_QRCODE').then(rs => {
            var qrCode = rs.data;
            fn && fn(qrCode)

        })
    },
    set(a, b, c) {
        Vue.set(a, b, c)
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
        //console.log([a, b]);
        return m.data.filter((x, i) => {
            if (a <= i * h && i * h <= b) {
                console.log(i);
                return true;
            };
            return false;
        })
    },
    wh(){
        return window.innerHeight;
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
    }
})