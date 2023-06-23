if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../serviceWorker.js').then((message)=> {

        console.log('Service Worker esta funcionando');
    }) } else {
        alert('Este browser no soporta Service Worker');
    }
