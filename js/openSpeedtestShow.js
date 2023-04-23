


// Variable para almacenar el estado del test de velocidad
 var Status;
 // Variable para almacenar el progreso del test de velocidad
 var ProG;
 // Función para ejecutar un callback, si se proporciona y es una función válida
 var Callback = function(callback) {
 if (callback && typeof callback === "function") {
 callback();
 }
 };
 // Clase para seleccionar elementos del DOM por ID y envolverlos en un objeto
 function _(el) {
 if (!(this instanceof _)) {
 return new _(el);
 }
 this.el = document.getElementById(el);

 }
 // Método de la clase para animar la opacidad de un elemento
 _.prototype.fade = function fade(type, ms, callback00) {
   // Definir si el tipo de animación es "in" o "out"
   var isIn = type === "in",
   // Establecer la opacidad inicial según el tipo de animación
   opacity = isIn ? 0 : 1,
   // Establecer el intervalo en milisegundos
   interval = 14,
   // Establecer la duración total de la animación en milisegundos
   duration = ms,
   // Calcular la cantidad de opacidad que cambia por intervalo de tiempo
   gap = interval / duration,
   // Guardar una referencia al objeto actual
   self = this;
   // Comprobar que el elemento existe
   if (self.el) {
     // Si la animación es de entrada, mostrar el elemento y establecer la opacidad inicial
     if (isIn) {
       self.el.style.display = "block";
       self.el.style.opacity = opacity;
     }
     // Función que se ejecutará en cada intervalo de tiempo
     function func() {
       // Incrementar o decrementar la opacidad según el tipo de animación
       opacity = isIn ? opacity + gap : opacity - gap;
       // Establecer la nueva opacidad del elemento
       self.el.style.opacity = opacity;
       // Si la opacidad es menor o igual a 0, ocultar el elemento
       if (opacity <= 0) {
         self.el.style.display = "none";
       }
       // Si la opacidad es menor o igual a 0 o mayor o igual a 1, detener la animación y llamar al callback
       if (opacity <= 0 || opacity >= 1) {
         window.clearInterval(fading, Callback(callback00));
       }
     }
     // Establecer el intervalo de tiempo que ejecutará la función "func"
     var fading = window.setInterval(func, interval);
   } else {
     // Si el elemento no existe, mostrar un error en la consola
     console.error("Elemento no encontrado en el documento.");
   }
 };
 // La función "easeOutQuint" implementa una curva de animación con un cambio gradual y suave en la velocidad.
 
var easeOutQuint = function(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
    };
    

    // La curva comienza lentamente, se acelera y luego se desacelera gradualmente.
    var easeOutCubic = function(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
    };



var openSpeedtestShow = function() {
    // Elementos SVG
    this.YourIP = _("YourIP");
    this.ipDesk = _("ipDesk");
    this.ipMob = _("ipMob");
    this.downSymbolDesk = _("downSymbolDesk");
    this.upSymbolDesk = _("upSymbolDesk");
    this.upSymbolMob = _("upSymbolMob");
    this.downSymbolMob = _("downSymbolMob");

    this.settingsDesk = _("settingsDesk");
    this.oDoLiveStatus = _("oDoLiveStatus");
    this.ConnectErrorMob = _("ConnectErrorMob");
    this.ConnectErrorDesk = _("ConnectErrorDesk");
    this.downResult = _("downResult");
    this.upRestxt = _("upRestxt");
    this.pingResult = _("pingResult");
    this.jitterDesk = _("jitterDesk");
    this.pingMobres = _("pingMobres");
    this.JitterResultMon = _("JitterResultMon");
    this.JitterResultms = _("JitterResultms");
    this.UI_Desk = _("UI-Desk");
    this.UI_Mob = _("UI-Mob");


    this.startButtonDesk = _("startButtonDesk");
    this.intro_Desk = _("intro-Desk");

    this.loader = _("loading_app");
    this.OpenSpeedtest = _("OpenSpeedtest");
    this.mainGaugebg_Desk = _("mainGaugebg-Desk");

    this.mainGaugeWhite_Desk = _("mainGaugeWhite-Desk");
    this.mainGaugebg_Mob = _("mainGaugebg-Mob");

    this.mainGaugeWhite_Mob = _("mainGaugeWhite-Mob");
    this.oDoLiveSpeed = _("oDoLiveSpeed");


    this.text = _("text");


    
    
    // Configuraciones para la gráfica
    this.scale = [{degree:680, value:0}, {degree:570, value:0.5}, {degree:460, value:1}, {degree:337, value:10}, {degree:220, value:100}, {degree:115, value:500}, {degree:0, value:1000},];
    this.element = "";
    this.chart = "";
    this.polygon = "";
    this.width = 200;
    this.height = 50;
    this.maxValue = 0;
    this.values = [];
    this.points = [];
    this.vSteps = 5;
    this.measurements = [];
    this.points = [];
  };
  //Resetea las configuraciones de la gráfica
  openSpeedtestShow.prototype.reset = function() {
    this.element = "";
    this.chart = "";
    this.polygon = "";
    this.width = 200;
    this.height = 50;
    this.maxValue = 0;
    this.values = [];
    this.points = [];
    this.vSteps = 5;
    this.measurements = [];
    this.points = [];
  };
// Esta función alterna la visibilidad de dos elementos que muestran la dirección IP del usuario.
openSpeedtestShow.prototype.ip = function() {
  var Self = this;
  if (Self.ipDesk.el.style.display === "block") {
      Self.ipDesk.el.style.display = "none";
      Self.ipMob.el.style.display = "none";
  } else {
      Self.ipDesk.el.style.display = "block";
      Self.ipMob.el.style.display = "block";
  }
};
// Esta función inicia una animación de carga antes de la prueba de ping.
openSpeedtestShow.prototype.prePing = function() {
  this.loader.fade("out", 500);
  this.OpenSpeedtest.fade("in", 1);
};
// Esta función inicia una animación de carga antes de la prueba de carga.
openSpeedtestShow.prototype.app = function() {
  this.loader.fade("out", 500, this.ShowAppIntro());
};
// Esta función muestra la introducción a la prueba de carga.
openSpeedtestShow.prototype.ShowAppIntro = function() {
  this.OpenSpeedtest.fade("in", 500);
};
// Esta función muestra la interfaz de usuario de la prueba de velocidad.
openSpeedtestShow.prototype.userInterface = function() {
  var Self = this;
  this.intro_Desk.fade("out", 500);

  this.ShowUI();
};
// Esta función muestra la interfaz de usuario de la prueba de velocidad una vez que se ha cargado.
openSpeedtestShow.prototype.ShowUI = function() {
  this.UI_Desk.fade("in", 500);
  this.UI_Mob.fade("in", 500, uiLoaded);
  
  // Esta función anónima se llama cuando se ha cargado la interfaz de usuario.
  function uiLoaded(argument) {
      Status = "Loaded"; // Establece el estado de la prueba en "Loaded"
      console.log("Developed by Vishnu. Email --\x3e me@vishnu.pro"); // Muestra un mensaje en la consola
  }
};

  //-----------------------------------------------------------------------------------------
// Función para mostrar u ocultar los símbolos de subida y bajada
openSpeedtestShow.prototype.Symbol = function(dir) {
  if (dir == 0) {
    // Mostrar símbolos de bajada y ocultar símbolos de subida
    this.downSymbolMob.el.style.display = "block";
    this.downSymbolDesk.el.style.display = "block";
    this.upSymbolMob.el.style.display = "none";
    this.upSymbolDesk.el.style.display = "none";
  }
  if (dir == 1) {
    // Mostrar símbolos de subida y ocultar símbolos de bajada
    this.downSymbolMob.el.style.display = "none";
    this.downSymbolDesk.el.style.display = "none";
    this.upSymbolMob.el.style.display = "block";
    this.upSymbolDesk.el.style.display = "block";
  }
  if (dir == 2) {
    // Ocultar todos los símbolos
    this.downSymbolMob.el.style.display = "none";
    this.downSymbolDesk.el.style.display = "none";
    this.upSymbolMob.el.style.display = "none";
    this.upSymbolDesk.el.style.display = "none";
  }
};


  // Función para animar la barra de progreso
openSpeedtestShow.prototype.progress = function(Switch, duration) {
  // Se definen variables y se inicializan
  var Self = this;
  var Stop = duration;
  var Stage = Switch;
  var currTime = Date.now();
  var chan2 = 0 - 400;
  
  // Se define un intervalo para actualizar la barra de progreso
  var interval = setInterval(function() {
    // Se calcula el tiempo actual
    var timeNow = (Date.now() - currTime) / 1000;
    
    // Se calculan las posiciones de la barra de progreso
    var toLeft = easeOutCubic(timeNow, 400, 400, Stop);
    var toRight = easeOutCubic(timeNow, 400, chan2, Stop);
    
    // Se actualiza la barra de progreso según el estado actual
    /* La propiedad "strokeDashoffset" se está estableciendo con un valor calculado dinámicamente. 
    Dependiendo del valor de la variable "Stage", se establece el valor de "strokeDashoffset" 
    en uno de los dos valores calculados,"toLeft" o "toRight".
    Si "Stage" es verdadero, los elementos "progressStatus_Desk" y "progressStatus_Mob" 
    se animan desde la izquierda hacia la derecha 
    con el valor "toLeft", de lo contrario se animan 
    desde la derecha hacia la izquierda con el valor "toRight". */
    if (Stage) {

     
    } else {

     
    }
    
    // Cuando se alcanza la duración se detiene el intervalo
    if (timeNow >= Stop) {
      clearInterval(interval);
      ProG = "done";


    }
  }, 14); //el 14 representa el tiempo en milisegundos que se actualiza el intervalo
};

  // Función para actualizar el progreso del indicador principal
  openSpeedtestShow.prototype.mainGaugeProgress = function(currentSpeed) {
    var Self = this;
    var speed = currentSpeed;
    
    if (speed < 0) {
      speed = 0;
    }

  var colorScale = d3.scaleLinear()
    .domain([0, 2.5, 5, 7.5, 10])
    .range(["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#008000"])
    .interpolate(d3.interpolateRgb);
  var color = colorScale(speed);

  // Calcular el porcentaje de llenado actual del indicador
  var fillPercentage = speed;
  
  // Obtener el color para el porcentaje de llenado actual
  var color = colorScale(fillPercentage);
    // Se obtiene el valor del offset del indicador principal en función de la velocidad
    var mainGaugeOffset = Self.getNonlinearDegree(speed);
    
    // Si la velocidad actual es mayor que 0 se establece la opacidad de los indicadores principal
    if (currentSpeed > 0) {

      this.mainGaugeWhite_Desk.el.style.strokeOpacity = 1;

      this.mainGaugeWhite_Mob.el.style.strokeOpacity = 1;
  
      // Se establece el color del indicador principal en función de la velocidad

  
      // Se establece el offset de los indicadores principal en función del valor de mainGaugeOffset

      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
  
      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
    }
  
    // Si el valor de mainGaugeOffset es 0 y la velocidad es mayor que 1000, se ajustan los indicadores principal
    if (mainGaugeOffset == 0 && speed > 1000) {

      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;

    }
    // Si el valor de mainGaugeOffset es 0 y la velocidad es menor o igual que 0, se ajustan los indicadores principal
    else if (mainGaugeOffset == 0 && speed <= 0) {

      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = 0.1;
      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = 0.1;

    }
  };
  
  

  // Función para mostrar el estado de la conexión en la interfaz
openSpeedtestShow.prototype.showStatus = function(e) {
  this.oDoLiveStatus.el.textContent = e;
};

// Función para mostrar un mensaje de error de conexión en la interfaz
openSpeedtestShow.prototype.ConnectionError = function() {
  this.ConnectErrorMob.el.style.display = "block";
  this.ConnectErrorDesk.el.style.display = "block";
};
// Función para mostrar el resultado de la velocidad de subida en la interfaz
openSpeedtestShow.prototype.uploadResult = function(upload) {
  // Si la velocidad de subida es menor a 1 Mbps
  setSubida(upload);
  if (upload < 1) {
    this.upRestxt.el.textContent = upload.toFixed(3); // Mostrar con 3 decimales
  }
  // Si la velocidad de subida está entre 1 y 9999 Kbps
  if (upload >= 1 && upload < 9999) {
    this.upRestxt.el.textContent = upload.toFixed(1); // Mostrar con 1 decimal
  }
  // Si la velocidad de subida está entre 10000 y 99999 Kbps
  if (upload >= 10000 && upload < 99999) {
    this.upRestxt.el.textContent = upload.toFixed(1); // Mostrar con 1 decimal
    this.upRestxt.el.style.fontSize = "20px"; // Aumentar el tamaño de fuente a 20px
  }
  // Si la velocidad de subida es mayor o igual a 100000 Kbps
  if (upload >= 100000) {
    this.upRestxt.el.textContent = upload.toFixed(1); // Mostrar con 1 decimal
    this.upRestxt.el.style.fontSize = "18px"; // Disminuir el tamaño de fuente a 18px
  }
};
// Actualiza la visualización de los resultados del ping en la interfaz gráfica
openSpeedtestShow.prototype.pingResults = function(data, Display) {
  setPing(data);
  var ShowData = data;
  // Si Display es "Ping"
  if (Display === "Ping") {
    // Si el valor del ping está entre 1 y 9999, muestra el valor redondeado
    if (ShowData >= 1 && ShowData < 10000) {
      this.pingResult.el.textContent = Math.floor(ShowData);
      this.pingMobres.el.textContent = Math.floor(ShowData);
    } 
    // Si el valor del ping está entre 0 y 1, muestra el valor directamente
    else if (ShowData >= 0 && ShowData < 1) {
      if (ShowData == 0) {
        ShowData = 0;
      }
      this.pingResult.el.textContent = ShowData;
      this.pingMobres.el.textContent = ShowData;
    }
  }
  // Si Display es "Error", actualiza el texto de la velocidad en vivo
  if (Display === "Error") {
    this.oDoLiveSpeed.el.textContent = ShowData;
  }
};

// Actualiza la visualización de los resultados de la descarga en la interfaz gráfica
openSpeedtestShow.prototype.downloadResult = function(download) {
  // Si el valor de la descarga es menor que 1, muestra el valor redondeado a 3 decimales

  setDescarga(download);
  if (download < 1) {
    this.downResult.el.textContent = download.toFixed(3);
  } 
  // Si el valor de la descarga está entre 1 y 9999, muestra el valor redondeado a 1 decimal
  if (download >= 1 && download < 9999) {
    this.downResult.el.textContent = download.toFixed(1);
  }
  // Si el valor de la descarga está entre 10000 y 99999, muestra el valor redondeado a 1 decimal y aumenta el tamaño de la fuente
  if (download >= 10000 && download < 99999) {
    this.downResult.el.textContent = download.toFixed(1);
    this.downResult.el.style.fontSize = "20px";
  }
  // Si el valor de la descarga es mayor o igual a 100000, muestra el valor redondeado a 1 decimal y reduce el tamaño de la fuente
  if (download >= 100000) {
    this.downResult.el.textContent = download.toFixed(1);
    this.downResult.el.style.fontSize = "18px";
  }
};

/**

Función que muestra el resultado del jitter obtenido durante el test de velocidad.
@param {number} data - El valor del jitter obtenido.
@param {string} Display - El tipo de resultado a mostrar.
*/
openSpeedtestShow.prototype.jitterResult = function(data, Display) {

  var ShowData = data;
  if (Display === "Jitter") {
  if (ShowData >= 1 && ShowData < 10000) {
  // Muestra el resultado del jitter en el panel de escritorio y en el panel móvil.
  this.jitterDesk.el.textContent = Math.floor(ShowData);
  if (ShowData >= 1 && ShowData < 100) {
  this.JitterResultMon.el.textContent = Math.floor(ShowData);
  }
  if (ShowData >= 100) {
  // Si el valor del jitter es mayor o igual a 100, se muestra en formato k (kilos).
  var kData = (ShowData / 1000).toFixed(1);
  this.JitterResultMon.el.textContent = kData + "k";
  }
  } else if (ShowData >= 0 && ShowData < 1) {
  if (ShowData == 0) {
  ShowData = 0;
  }
  // Muestra el resultado del jitter en el panel de escritorio y en el panel móvil.
  this.jitterDesk.el.textContent = ShowData;
  this.JitterResultMon.el.textContent = ShowData;
  setJitter(ShowData);
  }
  }
  };
// Esta función muestra el resultado de la velocidad en tiempo real
openSpeedtestShow.prototype.LiveSpeed = function(data, Display) {
/*   if(data <= 0){
    data=0;
    setVelocidad(data);
  }
  setVelocidad(data); */
  var ShowData = data;
  // Si el parámetro "Display" es "countDown", se muestra la velocidad en tiempo real
  if (Display === "countDown") {
    var speed = ShowData.toFixed(0);
    this.oDoLiveSpeed.el.textContent = speed;
    setVelocidad(speed);
    return;
  }
  // Si el parámetro "Display" es "speedToZero", se muestra la velocidad como cero
  if (Display === "speedToZero") {
    if (typeof ShowData == "number") {
      ShowData = ShowData.toFixed(1);
    }
    if (ShowData <= 0) {
      ShowData = 0;
    }

 
    setVelocidad(ShowData);
    return;
  }
  // Si el parámetro "Display" es "Ping", se muestra el resultado de ping
  if (Display === "Ping") {
    if (ShowData >= 1 && ShowData < 10000) {
      this.oDoLiveSpeed.el.textContent = Math.floor(ShowData);
    } else if (ShowData >= 0 && ShowData < 1) {
      if (ShowData == 0) {
        ShowData = 0;
      }
      this.oDoLiveSpeed.el.textContent = ShowData;
    }
  } else {
    // En cualquier otro caso, se muestra la velocidad con una precisión específica
    if (ShowData == 0) {
      var speed = ShowData.toFixed(0);
      this.oDoLiveSpeed.el.textContent = speed;  setVelocidad(speed);
    }
    if (ShowData <= 1 && ShowData > 0) {
      var speed = ShowData.toFixed(3);
      this.oDoLiveSpeed.el.textContent = speed;  setVelocidad(speed);
    }
    if (ShowData > 1) {
      var speed = ShowData.toFixed(1);
      this.oDoLiveSpeed.el.textContent = speed;  setVelocidad(speed);
    }
    // Si la velocidad es menor o igual a 1000, se muestra "10Gb+" como la velocidad máxima
    if (ShowData <= 1000) {

      setVelocidad(ShowData);
    }
    // Si la velocidad es mayor que 1010, se muestra el resultado como Gbps
    if (ShowData >= 1010) {

      setVelocidad((Math.floor(ShowData / 1010) * 1000)/100 );
    }
  }
};

// Animar el indicador principal de la prueba de velocidad hasta cero
openSpeedtestShow.prototype.GaugeProgresstoZero = function(currentSpeed, status) {
  var speed = currentSpeed; // Velocidad actual
  var Self = this; // Referencia a la instancia actual
  var duration = 3; // Duración de la animación en segundos
  if (speed >= 0) { // Solo si la velocidad es positiva o cero
    var time = Date.now(); // Tiempo actual
    var SpeedtoZero = 0 - speed; // Velocidad necesaria para llegar a cero
    var interval = setInterval(function() { // Intervalo de tiempo para la animación
      var timeNow = (Date.now() - time) / 1000; // Tiempo transcurrido desde el inicio de la animación
      var speedToZero = easeOutQuint(timeNow, speed, SpeedtoZero, duration); // Velocidad actualizada con una animación suave
      Self.LiveSpeed(speedToZero, "speedToZero"); // Actualizar el elemento de velocidad en vivo con la velocidad actualizada
      Self.mainGaugeProgress(speedToZero); // Actualizar el indicador principal con la velocidad actualizada
      if (timeNow >= duration || speedToZero <= 0) { // Si se ha completado la animación o la velocidad ha llegado a cero
        clearInterval(interval); // Detener el intervalo de tiempo
        Self.LiveSpeed(1, "speedToZero"); // Actualizar el elemento de velocidad en vivo con cero
        Self.mainGaugeProgress(0.001); // Actualizar el indicador principal con 0.001 valor que evita que desaparezca el indicador si este es cero
        Status = status; // Establecer el estado de la prueba en el valor especificado
      }
    }, 16); // Actualizar cada 16 milisegundos
  }
};

// Calcular el offset del indicador principal en función de la velocidad actual
openSpeedtestShow.prototype.getNonlinearDegree = function(mega_bps) {
  var i = 0; // Índice de la escala de velocidad
  if (0 == mega_bps || mega_bps <= 0 || isNaN(mega_bps)) { // Si la velocidad es menor o igual a cero o no es un número
    return 0; // Devolver cero como offset
  }
  while (i < this.scale.length) { // Recorrer la escala de velocidad
    if (mega_bps > this.scale[i].value) { // Si la velocidad actual es mayor que el valor actual de la escala de velocidad
      i++; // Moverse al siguiente valor de la escala de velocidad
    } else { // Si la velocidad actual está dentro del rango del valor de la escala de velocidad
      return this.scale[i - 1].degree + (mega_bps - this.scale[i - 1].value) * (this.scale[i].degree - this.scale[i - 1].degree) / (this.scale[i].value - this.scale[i - 1].value); // Calcular el offset utilizando una fórmula matemática
    }
  }
  return this.scale[this.scale.length - 1].degree; // Si la velocidad es mayor que el último valor de la escala de velocidad, devolver el último grado de offset
};