function setVelocidad(speed) {
  speed = speed*1000;
  document.getElementById("velocidad").innerHTML = speed;

  // Aquí se modificaría la rotación del indicador de velocidad
  const arrow = document.querySelector(".arrow-red");

  // Establecer el ángulo de rotación según la velocidad
  const minAngle = -44.5; // Ángulo mínimo en grados para una velocidad de 0
  const maxAngle = 226 - (226 * 0.205); // Ángulo máximo en grados para una velocidad de 10

  const speedValues = [0, 20, 50, 80, 100, 500, 1000, 2000, 5000, 8000, 10000];
  const angleSteps = (maxAngle - minAngle) / (speedValues.length - 1);
  
  let rotationAngle;

  for (let i = 0; i < speedValues.length; i++) {
    if (speed >= speedValues[i] && speed <= speedValues[i + 1]) {
      let ratio = (speed - speedValues[i]) / (speedValues[i + 1] - speedValues[i]);
      rotationAngle = minAngle + (angleSteps * i) + (angleSteps * ratio);
      break;
    }
  }

  if (speed >= 10000) {
    rotationAngle = maxAngle;
  }

  arrow.style.setProperty("--rotation", `${rotationAngle}deg`);
}

  function setStatus(status) {
    document.getElementById("estado").innerHTML = status;
  }
  function setSubida(upload) {
   
    document.getElementById("subida").innerHTML = upload.toFixed(3) + " GB";
    document.getElementById("circle-upload-value").innerHTML = upload.toFixed(3) + " GB";
    document.getElementById("circle-upload-mbps").innerHTML = (upload * 1000).toFixed(1) + " MB";
      // Mostrar y rotar la flecha azul
      const blueArrow = document.querySelector(".arrow-blue");
      blueArrow.classList.remove("arrow-hidden");
      const uploadCircle = document.querySelector(".circle-upload");
      uploadCircle.classList.add("color-blue");
      upload=upload*1000;
  setArrowRotation(blueArrow, upload);
  }
  
  function setDescarga(download) {
  
    document.getElementById("descarga").innerHTML = download.toFixed(3) + " GB";
    document.getElementById("circle-download-value").innerHTML = download.toFixed(3) + " GB";
    document.getElementById("circle-download-mbps").innerHTML = (download * 1000).toFixed(1) + " MB";
      // Mostrar y rotar la flecha verde
      const greenArrow = document.querySelector(".arrow-green");
      greenArrow.classList.remove("arrow-hidden");
      const downloadCircle = document.querySelector(".circle-download");
      downloadCircle.classList.add("color-green");
      download=download*1000;
  setArrowRotation(greenArrow, download);
  
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
  

  function setArrowRotation(arrow, speed) {
    const minAngle = -44.5; // Ángulo mínimo en grados para una velocidad de 0
    const maxAngle = 226 - (226 * 0.205); // Ángulo máximo en grados para una velocidad de 10
  
    const speedValues = [0, 20, 50, 80, 100, 500, 1000, 2000, 5000, 8000, 10000];
    const angleSteps = (maxAngle - minAngle) / (speedValues.length - 1);
    
    let rotationAngle;
  
    for (let i = 0; i < speedValues.length; i++) {
      if (speed >= speedValues[i] && speed <= speedValues[i + 1]) {
        let ratio = (speed - speedValues[i]) / (speedValues[i + 1] - speedValues[i]);
        rotationAngle = minAngle + (angleSteps * i) + (angleSteps * ratio);
        break;
      }
    }
  
    if (speed >= 10000) {
      rotationAngle = maxAngle;
    }
  
    arrow.style.setProperty("--rotation", `${rotationAngle}deg`);
  }


  function hideArrows() {
    // Ocultar la flecha verde
    const greenArrow = document.querySelector(".arrow-green");
    greenArrow.classList.add("arrow-hidden");
  
    // Quitar el color de fondo del círculo de descarga
    const downloadCircle = document.querySelector(".circle-download");
    downloadCircle.classList.remove("color-green");
  
    // Ocultar la flecha azul
    const blueArrow = document.querySelector(".arrow-blue");
    blueArrow.classList.add("arrow-hidden");
  
    // Quitar el color de fondo del círculo de subida
    const uploadCircle = document.querySelector(".circle-upload");
    uploadCircle.classList.remove("color-blue");
  }


  //-----------------------------------------------------
  //-----------------------------------------------------
  //-----------------------------------------------------
  //---------------------CARRITO-------------------------
  //-----------------------------------------------------
  //-----------------------------------------------------
  let carAnimation;
  let shouldStopAnimation = false; // Añade esta variable global
  let carAnimationCompleted = true;
  let puntoOrigen = -1185;
  let radioRotacion = "50% 600%";
  function startCarAnimation() {
    const carrito = document.querySelector(".carrito");
    updateCarAnimationTransformOrigin();  
    // Configura la animación GSAP
    carAnimation = gsap.timeline({ defaults: { duration: 2, ease: "Sine.easeOut" } })
      .set(carrito, { y: puntoOrigen }) // Establece la posición vertical del carrito antes de comenzar la animación
      .to(carrito, {
        rotation: "+=360", // Grados de rotación
        transformOrigin: radioRotacion, // Punto de origen de la rotación
      })
      .eventCallback("onStart", () => {
        carAnimationCompleted = false;
      })
      .eventCallback("onComplete", () => {
        if (shouldStopAnimation) {
          carAnimation.progress(1); 
          carAnimation.pause();
          shouldStopAnimation = false;
        } else {
          carAnimation.restart();
        }
        carAnimationCompleted = true;
      });
  }
  document.addEventListener('DOMContentLoaded', () => {
    updateCarAnimationTransformOrigin();
  });
  
  window.addEventListener("resize", updateCarAnimationTransformOrigin); 
  function updateCarAnimationTransformOrigin() {
    const carrito = document.querySelector('.carrito');
    if (window.innerWidth <= 768) {
      puntoOrigen = -1582;
      radioRotacion = "50% 745%";
      gsap.set(carrito, { transformOrigin: '50% 50%' });
    } /* else {
      puntoOrigen = -1185;
      radioRotacion = "50% 600%";
      gsap.set(carrito, { transformOrigin: '50% 50%' });
    } */
  }
  
  
  
  
  