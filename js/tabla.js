function setVelocidad(speed) {
  document.getElementById("velocidad").innerHTML = speed;

  // Aquí se modificaría la rotación del indicador de velocidad
  const arrow = document.querySelector(".arrow");

  // Establecer el ángulo de rotación según la velocidad
  const minAngle = -44.5; // Ángulo mínimo en grados para una velocidad de 0
  const maxAngle = 226 - (226 * 0.205); // Ángulo máximo en grados para una velocidad de 10

  const speedValues = [0, 0.002, 0.005, 0.008, 0.5, 1, 2, 5, 8, 10];
  const angleSteps = (maxAngle - minAngle) / (speedValues.length - 1);
  
  let rotationAngle;

  for (let i = 0; i < speedValues.length; i++) {
    if (speed >= speedValues[i] && speed <= speedValues[i + 1]) {
      let ratio = (speed - speedValues[i]) / (speedValues[i + 1] - speedValues[i]);
      rotationAngle = minAngle + (angleSteps * i) + (angleSteps * ratio);
      break;
    }
  }

  if (speed >= 10) {
    rotationAngle = maxAngle;
  }

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
  