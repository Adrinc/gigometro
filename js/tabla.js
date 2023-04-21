function setVelocidad(speed) {
    document.getElementById("velocidad").innerHTML = speed;
  }
  
  function setDescarga(download) {
    document.getElementById("descarga").innerHTML = download.toFixed(1) + " Gsp";
  }
  
  function setSubida(upload) {
    document.getElementById("subida").innerHTML = upload.toFixed(1) + " Gsp";
  }
  
  function setPing(ping) {
    document.getElementById("ping").innerHTML = ping.toFixed(1) + " ms";
  }
  
  function setJitter(jitter) {
    document.getElementById("jitter").innerHTML = jitter + " ms";
  }
  