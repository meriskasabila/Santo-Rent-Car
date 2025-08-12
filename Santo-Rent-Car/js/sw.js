
self.addEventListener('message', function(e) {
    var data = e.data;
    console.log('Pesan yang diterima di Web Worker:', data);
  
    // Misalnya, lakukan perhitungan dalam loop
    var result = 0;
    for (var i = 0; i < data.iterations; i++) {
      result += i;
    }
  
    // Kirim hasil kembali ke utas induk
    self.postMessage(result);
  }, false);