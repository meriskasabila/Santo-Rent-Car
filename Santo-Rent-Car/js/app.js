(function(doc, wd) {
    'use strict';

    let gid = doc.getElementById.bind(doc),
    el = doc.querySelector.bind(doc),
    ell = doc.querySelector.bind(doc);
    let clock = el(".clock");

    function indoTime() {
        let dt = new Date();
        let timeNow = dt.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).replaceAll('.', ':').replace(' pukul', ',');
        return timeNow;
    }

    clock.textContent = indoTime();

    let interval = setInterval(() => {
        clock.textContent = indoTime();
    }, 1000);

    async function getClientInfo() {
        // let userInfo = await fetch(url).then(info=> info.json());
        // return userInfo;

        const url1 = 'https://api.bigdatacloud.net/data/client-info';
        const url2 = 'https://ipinfo.io/json';
        
        // Fetch ke dua API
        let result = Promise.all( [fetch(url1), fetch(url2)] )
        .then(responses => {
            // Memeriksa apakah kedua permintaan berhasil
            if(!responses[0].ok || !responses[1].ok) {
                // console.log('API 1 GAGAL!', responses[0].status, responses[1].status);
                return false;
            }else{
                return Promise.all(responses.map(response => response.json()));
            }
        })
        .then(data => { 
            if(data === false) {
                return false;
            }else{
                return Object.assign(data[0], {"country" : data[1].country} )
            }
        }).catch(error => {
            console.warn('Ada masalah saat melakukan fetch ke kedua API:', error);
        });
        console.log("RESULT", await result);

    }

//    wd.addEventListener("load", async function(e) {
//        await getClientInfo()
//    })
    wd.addEventListener("load", function(e) {
        getClientInfo()
    })
})(document, typeof window === "undefined"? this:window);

