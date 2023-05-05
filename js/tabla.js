

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
   
    document.getElementById("subida").innerHTML = upload.toFixed(3) + " G";
    document.getElementById("circle-upload-value").innerHTML = upload.toFixed(3) + " G";
    document.getElementById("circle-upload-mbps").innerHTML = (upload * 1000).toFixed(1) + " MB";
      // Mostrar y rotar la flecha azul
      const blueArrow = document.querySelector(".arrow-blue");
      blueArrow.classList.remove("arrow-hidden");
      const uploadCircle = document.querySelector(".circle-upload");
      uploadCircle.classList.add("color-blue");
      upload=upload*1000;
      //upload=83;
  setArrowRotation(blueArrow, upload);
  }
  
  function setDescarga(download) {
  
    document.getElementById("descarga").innerHTML = download.toFixed(3) + " G";
    document.getElementById("circle-download-value").innerHTML = download.toFixed(3) + " G";
    document.getElementById("circle-download-mbps").innerHTML = (download * 1000).toFixed(1) + " MB";
      // Mostrar y rotar la flecha verde
      const greenArrow = document.querySelector(".arrow-green");
      greenArrow.classList.remove("arrow-hidden");
      const downloadCircle = document.querySelector(".circle-download");
      downloadCircle.classList.add("color-green");
      download=download*1000;
      //download=58;
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
  let shouldStopAnimation = false; 
  let carAnimationCompleted = true;
  let puntoOrigen = -1185;
  let radioRotacion = "50% 600%";
  let carrito = document.querySelector(".carrito");
  
  function startCarAnimation() {

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
    disableScroll();
    updateCarAnimationTransformOrigin();
   
  });
  
/*   window.addEventListener("resize", updateCarAnimationTransformOrigin);  */
  window.addEventListener("resize", resetCarAnimation); 
  function resetCarAnimation() {
    updateCarAnimationTransformOrigin();
    if (carAnimation) {
     stopall();
    }
  }

  function updateCarAnimationTransformOrigin() {
  const carritoStyles = window.getComputedStyle(carrito);
  const carritoElements = document.querySelectorAll(".carrito");
/*   const topValue = carritoStyles.getPropertyValue('top');
  const transformValue = carritoStyles.getPropertyValue('transform'); */
/*     gsap.set(carrito, { transformOrigin: '50% 50%' }); */
    //375x667
    if (window.innerWidth <= 375 && window.innerHeight <= 667) {
      puntoOrigen = -1250;
      radioRotacion = "50% 599%";
  
    }
    else if(window.innerWidth <= 667 && window.innerHeight <= 375){
       puntoOrigen = -1120;
      radioRotacion = "50% 542%";
  
    } 
    //-----------------------------------------------------
    //390x844
    else if(window.innerWidth <= 390 && window.innerHeight <= 884){
       puntoOrigen = -1250;
      radioRotacion = "50% 599%";
      carritoElements.forEach((carrito) => {
        carrito.style.top = "-26%"; 
        carrito.style.transform = "translate(-50%, 0) scale(0.10)"; 
      });
    } 
    else if(window.innerWidth <= 884 && window.innerHeight <= 390){
       puntoOrigen = -1120;
      radioRotacion = "50% 542%";
     carritoElements.forEach((carrito) => {
        carrito.style.top = "-32%"; 
        carrito.style.transform = "translate(-50%, 0) scale(0.10)"; 
      });
    } 

    //-----------------------------------------------------
    //414x896
    else if(window.innerWidth <= 414 && window.innerHeight <= 896){ console.log("414x896");
        puntoOrigen = -1278;
      radioRotacion = "50% 630%";
      carritoElements.forEach((carrito) => {
        carrito.style.top = "-16%"; 
        carrito.style.transform = "translate(-50%, 0) scale(0.13)"; 
      });
    
    }
    else if(window.innerWidth <= 896 && window.innerHeight <= 414){ console.log("896x414");
      puntoOrigen = -990;
      radioRotacion = "50% 500%";
      carritoElements.forEach((carrito) => {
        carrito.style.top = "-25%"; 
        carrito.style.transform = "translate(-50%, 0) scale(0.13)"; 
      });
    
    }
    //-----------------------------------------------------
/*     else if (window.innerWidth <= 1) {
      puntoOrigen = -1185;
      radioRotacion = "50% 600%";
      carritoElements.forEach((carrito) => {
        carrito.style.top = "-15%"; 
        carrito.style.transform = "translate(-50%, 0) scale(0.15)"; 
      } );
    } 
 */
/* 
console.log('Top value:', topValue);
console.log('Transform value:', transformValue);
 */


  }
  
  // Deshabilitar el scroll
function disableScroll() {
  document.body.style.overflow = 'hidden';
}
  
  
  