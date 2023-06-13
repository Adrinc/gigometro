

function setVelocidad(speed) {
  speed = speed*1000;
 /*  document.getElementById("velocidad").innerHTML = speed; */

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
 /*    document.getElementById("estado").innerHTML = status; */
  }
  function setSubida(upload) {
   
  /*   document.getElementById("subida").innerHTML = upload.toFixed(3) + " G"; */
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
  
/*     document.getElementById("descarga").innerHTML = download.toFixed(3) + " G"; */
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
    /* document.getElementById("ping").innerHTML = ping.toFixed(1) + " ms"; */
  }
  
  function setJitter(jitter) {
 /*    document.getElementById("jitter").innerHTML = jitter + " ms"; */
  }
  function setError(error) {
    /* document.getElementById("error").innerHTML = error; */
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

  const r = new rive.Rive({
    src: "assets/images/loadingcar.riv",
    canvas: document.getElementById("canvas"),
    autoplay: false,
    stateMachines: "State Machine 1",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
     
    },
  });

  function initTest() {
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            const buttonText = document.getElementById("startButtonDesk").innerHTML;

     /*        console.log(data.ip);
            console.log(buttonText); */
            const postData = {
                "apikey": "svsvs54sef5se4fsv",
                "action": "configuratorTracking",
                "transaction": data.ip,
                "page": "main",
                "button": buttonText,
               
            };
            
            fetch('https://cblsrvr1.rtatel.com/planbuilder/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(postData),
            })
            .then(response => response.json())
            .then(data => {
             /*  console.log("testeo con api verdadera");
                console.log('Success:', data); */
                runTasks();
                r.play();
                document.getElementById("startButtonDesk").disabled = true;
                document.getElementById("startButtonDesk").classList.add("disabled");
                document.getElementById("secondButtonDesk").disabled = false;
                document.getElementById("secondButtonDesk").classList.remove("disabled");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        })
        .catch(error => console.error('Error:', error));
}


  
  function resetCarAnimation() {
    if(shouldStopAnimation) {
    r.reset({
      stateMachines: "State Machine 1",
      autoplay: false,
      });
    }

  }

  // Deshabilitar el scroll
/* function disableScroll() {
  document.body.style.overflow = 'hidden';
}
  
document.addEventListener('DOMContentLoaded', () => {
  disableScroll();
}); */