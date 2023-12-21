if (window.app && window.app.$destroy) window.app.$destroy();

document.body.classList.add('bg-slate-200');
document.body.innerHTML = `
<div id="app" class="w-full h-full ">
    <div v-if="loading" class="py-3 px-5 m-3 rounded-lg bg-white flex items-center justify-center">Đang tải</div>
    <div v-else>
        <div class="py-3 px-5 m-3 rounded-lg bg-white" v-for="(x,i) in words">
            <div v-html="x.w"></div>
        </div>
    </div>
</div>
`;

var data = {
    words: [
        {
            w: 'hi'
        },
        {
            w: 'ba'
        }
    ],
    loading: true

};
data.words.length =0;
const storeKey = 'Words_En';

function update(){
    app21.prom('TEXT', {
        name: storeKey,
        content: JSON.stringify(data.words)
    }).then(rs => {
        console.log('Đã lưu')
    })
}

function getGitWords(fn) {
    app21.prom('DOWNLOAD_URL', url).then(rs => {

        var contentType = rs.data.contentType.split(';')[0];
        var s = rs.data.text;

        console.log('DOWNLOAD_URL', url, s);

        try {
            var arr = JSON.parse(s);
            if (Array.isArray(arr)) {
                data.words = arr;
                update();
            }
        } catch {

        }
        fn && fn();

    }).catch(e=>{
        fn && fn();
    })
}

var app = new Vue({
    el: document.querySelector('#app'),
    data: data,
    mounted() {
        app21.prom('TEXT', {
            name: storeKey
        }).then(rs => {
            try {
                var arr = JSON.parse(rs.data);
                if (Array.isArray(arr)) {
                    data.words = arr;
                }
            } catch {

            }

            if (data.words.length == 0) {
                getGitWords(()=>{
                    data.loading = false;
                })
            }else{
                data.loading = false;
            }

        })
    }
})