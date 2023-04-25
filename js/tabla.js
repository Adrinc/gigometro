function setVelocidad(speed) {
  document.getElementById("velocidad").innerHTML = speed;

  // Aquí se modificaría la rotación del indicador de velocidad
  const arrow = document.querySelector(".arrow");

  // Establecer el ángulo de rotación según la velocidad
  const minAngle = -52; // Ángulo mínimo en grados para una velocidad de 0
  const maxAngle = 230; // Ángulo máximo en grados para una velocidad de 10
  const maxSpeed = 10;

  let rotationAngle;

  if (speed >= maxSpeed) {
    rotationAngle = maxAngle;
  } else {
    rotationAngle = ((speed / maxSpeed) * (maxAngle - minAngle)) + minAngle;
  }

  // Aplicar la rotación
  arrow.style.setProperty("--rotation", `${rotationAngle}deg`);
}

  
  function setStatus(status) {
    document.getElementById("estado").innerHTML = status;
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
  function setError(error) {
    document.getElementById("error").innerHTML = error;
  }
  