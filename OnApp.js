if (window.app && window.app.$destroy) window.app.$destroy();

document.body.innerHTML = `
<div id="app" class="w-full h-full bg-slate-200">
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
    loading: false

};
var app = new Vue({
    el: document.querySelector('#app'),
    data: data
})