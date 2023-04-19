
window.onload = function() {
  //Obtiene la referencia al elemento appSVG por su ID y lo reemplaza por su contenido
  var appSVG = document.getElementById("OpenSpeedTest-UI");
  appSVG.parentNode.replaceChild(appSVG.contentDocument.documentElement, appSVG);
  //Llama a la función ostOnload que se encarga de inicializar la interfaz de usuario
  ostOnload();
  //Inicia la prueba de velocidad en el objeto OpenSpeedTest
  OpenSpeedTest.Start();
};

(function(OpenSpeedTest) {
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
// La curva comienza lentamente, se acelera y luego se desacelera gradualmente.
  var easeOutQuint = function(t, b, c, d) {
  t /= d;
  t--;
  return c * (t * t * t * t * t + 1) + b;
  };
  
  // La función "easeOutCubic" implementa una curva de animación con un cambio gradual y suave en la velocidad.
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
    this.settingsMob = _("settingsMob");
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
    this.oDoTopSpeed = _("oDoTopSpeed");
    this.startButtonMob = _("startButtonMob");
    this.startButtonDesk = _("startButtonDesk");
    this.intro_Desk = _("intro-Desk");
    this.intro_Mob = _("intro-Mob");
    this.loader = _("loading_app");
    this.OpenSpeedtest = _("OpenSpeedtest");
    this.mainGaugebg_Desk = _("mainGaugebg-Desk");
    this.mainGaugeBlue_Desk = _("mainGaugeBlue-Desk");
    this.mainGaugeWhite_Desk = _("mainGaugeWhite-Desk");
    this.mainGaugebg_Mob = _("mainGaugebg-Mob");
    this.mainGaugeBlue_Mob = _("mainGaugeBlue-Mob");
    this.mainGaugeWhite_Mob = _("mainGaugeWhite-Mob");
    this.oDoLiveSpeed = _("oDoLiveSpeed");
    this.progressStatus_Mob = _("progressStatus-Mob");
    this.progressStatus_Desk = _("progressStatus-Desk");
    this.graphc1 = _("graphc1");
    this.graphc2 = _("graphc2");
    this.graphMob2 = _("graphMob2");
    this.graphMob1 = _("graphMob1");
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
  this.intro_Mob.fade("out", 500, this.ShowUI());
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

// Función para crear el gráfico de velocidad
openSpeedtestShow.prototype.Graph = function(speed, select) {
  // Polyfill para el método remove de Element
  if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
  var Self = this;
  var Remove;
  if (select === 0) {
    // Gráfico para la velocidad de bajada
    var Graphelement = this.graphc1.el;
    Remove = "line";
    this.graphMob2.el.style.display = "none";
    this.graphMob1.el.style.display = "block";
  } else {
    // Gráfico para la velocidad de subida
    Graphelement = this.graphc2.el;
    Remove = "line2";
    this.graphMob1.el.style.display = "none";
    this.graphMob2.el.style.display = "block";
  }
  if (!isNaN(speed)) {
    // Agregar la velocidad al arreglo de valores
    this.values.push(speed);
  } else {
    // Agregar un valor vacío si no se puede obtener la velocidad
    this.values.push("");
  }

// Función para calcular el valor máximo del gráfico
function calcMaxValue() {
  Self.maxValue = 0;
  // Recorre los valores y encuentra el valor máximo
  for (x = 0; x < Self.values.length; x++) {
  if (Self.values[x] > Self.maxValue) {
  Self.maxValue = Self.values[x];
  }
  }
  // Redondea el valor máximo hacia arriba
  Self.maxValue = Math.ceil(Self.maxValue);
  }
  
  // Función para calcular los puntos del gráfico
  function calcPoints() {
  if (Self.values.length > 1) {
  // Crea la cadena de puntos con los valores y la altura
  var points = "0," + Self.height + " ";
  for (x = 0; x < Self.values.length; x++) {
  var perc = Self.values[x] / Self.maxValue;
  var steps = 130 / (Self.values.length - 1);
  var point = (steps * x).toFixed(2) + "," + (Self.height - Self.height * perc).toFixed(2) + " ";
  points += point;
  }
  points += "130," + Self.height;
  Self.points = points;
  }
  }
  
  // Función para calcular las medidas del gráfico
  function calcMeasure() {
  // Recorre las medidas y las agrega al array
  for (x = 0; x < Self.vSteps; x++) {
  var measurement = Math.ceil(Self.maxValue / Self.vSteps * (x + 1));
  Self.measurements.push(measurement);
  }
  // Invierte el array de medidas
  Self.measurements.reverse();
  }
  
  // Función para crear el gráfico
  function createChart(element, values) {
  // Calcula el valor máximo, los puntos y las medidas
  calcMaxValue();
  calcPoints();
  calcMeasure();
  // Elimina cualquier línea anterior en el gráfico
  var removeLine = document.getElementsByClassName(Remove);
  while (removeLine.length > 0) {
  removeLine[0].remove();
  }
  // Crea un nuevo polígono con los puntos calculados
  Self.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  Self.polygon.setAttribute("points", Self.points);
  Self.polygon.setAttribute("class", Remove);
  // Agrega el polígono al elemento SVG
  if (Self.values.length > 1) {
  Graphelement.appendChild(Self.polygon);
  }
  }
  
  // Comprueba si hay velocidad y crea el gráfico si la hay
  if (speed > 0) {
  createChart(Graphelement, speed);
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
      Self.progressStatus_Desk.el.style.strokeDashoffset = toLeft;
      Self.progressStatus_Mob.el.style.strokeDashoffset = toLeft;
    } else {
      Self.progressStatus_Desk.el.style.strokeDashoffset = toRight;
      Self.progressStatus_Mob.el.style.strokeDashoffset = toRight;
    }
    
    // Cuando se alcanza la duración se detiene el intervalo
    if (timeNow >= Stop) {
      clearInterval(interval);
      ProG = "done";
      Self.progressStatus_Desk.el.style.strokeDashoffset = 800;
      Self.progressStatus_Mob.el.style.strokeDashoffset = 800;
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
    .range(["#B20000", "#ff8000", "#ffff00", "#00ff00", "#00ffff"])
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
      this.mainGaugeBlue_Desk.el.style.strokeOpacity = 1;
      this.mainGaugeWhite_Desk.el.style.strokeOpacity = 1;
      this.mainGaugeBlue_Mob.el.style.strokeOpacity = 1;
      this.mainGaugeWhite_Mob.el.style.strokeOpacity = 1;
  
      // Se establece el color del indicador principal en función de la velocidad
      this.mainGaugeBlue_Desk.el.style.stroke = color;
  
      // Se establece el offset de los indicadores principal en función del valor de mainGaugeOffset
      this.mainGaugeBlue_Desk.el.style.strokeDashoffset = mainGaugeOffset;
      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
      this.mainGaugeBlue_Mob.el.style.strokeDashoffset = mainGaugeOffset;
      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
    }
  
    // Si el valor de mainGaugeOffset es 0 y la velocidad es mayor que 1000, se ajustan los indicadores principal
    if (mainGaugeOffset == 0 && speed > 1000) {
      this.mainGaugeBlue_Mob.el.style.strokeDashoffset = mainGaugeOffset >= 681 ? 680 : mainGaugeOffset;
      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = mainGaugeOffset == 0 ? 1 : mainGaugeOffset + 1;
      this.mainGaugeBlue_Desk.el.style.strokeDashoffset = mainGaugeOffset >= 681 ? 680 : mainGaugeOffset;
    }
    // Si el valor de mainGaugeOffset es 0 y la velocidad es menor o igual que 0, se ajustan los indicadores principal
    else if (mainGaugeOffset == 0 && speed <= 0) {
      this.mainGaugeBlue_Mob.el.style.strokeDashoffset = 681.1;
      this.mainGaugeWhite_Mob.el.style.strokeDashoffset = 0.1;
      this.mainGaugeWhite_Desk.el.style.strokeDashoffset = 0.1;
      this.mainGaugeBlue_Desk.el.style.strokeDashoffset = 681.1;
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
  }
  }
  };
// Esta función muestra el resultado de la velocidad en tiempo real
openSpeedtestShow.prototype.LiveSpeed = function(data, Display) {
  var ShowData = data;
  // Si el parámetro "Display" es "countDown", se muestra la velocidad en tiempo real
  if (Display === "countDown") {
    var speed = ShowData.toFixed(0);
    this.oDoLiveSpeed.el.textContent = speed;
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
    this.oDoLiveSpeed.el.textContent = ShowData;
    this.oDoTopSpeed.el.textContent = "10G+";
    this.oDoTopSpeed.el.style.fontSize = "15px";
    this.oDoTopSpeed.el.style.fill = "gray";
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
      this.oDoLiveSpeed.el.textContent = speed;
    }
    if (ShowData <= 1 && ShowData > 0) {
      var speed = ShowData.toFixed(3);
      this.oDoLiveSpeed.el.textContent = speed;
    }
    if (ShowData > 1) {
      var speed = ShowData.toFixed(1);
      this.oDoLiveSpeed.el.textContent = speed;
    }
    // Si la velocidad es menor o igual a 1000, se muestra "10Gb+" como la velocidad máxima
    if (ShowData <= 1000) {
      this.oDoTopSpeed.el.textContent = "10Gb+";
      this.oDoTopSpeed.el.style.fontSize = "15px";
      this.oDoTopSpeed.el.style.fill = "gray";
    }
    // Si la velocidad es mayor que 1010, se muestra el resultado como Gbps
    if (ShowData >= 1010) {
      this.oDoTopSpeed.el.textContent = (Math.floor(ShowData / 1010) * 1000)/100 + "Gb+";
      this.oDoTopSpeed.el.style.fill = "#1e569b";
      this.oDoTopSpeed.el.style.fontSize = "17.2px";
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

// Definición de una clase openSpeedtestGet que se utiliza para manejar datos y cálculos de velocidad
var openSpeedtestGet = function() {
  // Variable que almacena el tiempo total promedio para el cálculo de velocidad
  this.OverAllTimeAvg = window.performance.now();
  // Arreglo que almacena las muestras de velocidad obtenidas
  this.SpeedSamples = [];
  // Velocidad final obtenida
  this.FinalSpeed;
};

// Función que se utiliza para reiniciar los valores de las variables del objeto openSpeedtestGet
openSpeedtestGet.prototype.reset = function() {
  // Reinicio del valor de OverAllTimeAvg
  this.OverAllTimeAvg = window.performance.now();
  // Reinicio del arreglo de muestras de velocidad
  this.SpeedSamples = [];
  // Reinicio de la velocidad final
  this.FinalSpeed = 0;
};

// Función que se utiliza para calcular la suma de los elementos de un arreglo de números
openSpeedtestGet.prototype.ArraySum = function(Arr) {
  // Se asigna el arreglo a la variable array
  var array = Arr;
  // Si el arreglo existe
  if (array) {
    // Se utiliza la función reduce para calcular la suma de los elementos del arreglo
    var sum = array.reduce(function(A, B) {
      // Se comprueba que ambos elementos son números
      if (typeof A === "number" && typeof B === "number") {
        return A + B;
      }
    }, 0);
    return sum;
  } else {
    // Si el arreglo no existe, se retorna 0
    return 0;
  }
};
// Función para calcular la velocidad media
openSpeedtestGet.prototype.AvgSpeed = function(Livespeed, Start, duration) {
  var Self = this; // Referencia a this para usarla dentro de la función
  this.timeNow = (window.performance.now() - this.OverAllTimeAvg) / 1000; // Calcula el tiempo actual
  this.FinalSpeed; // Variable para guardar la velocidad final
  var StartRecoding = Start; // Momento en que comienza la grabación
  StartRecoding = duration - StartRecoding; // Resta el momento en que comienza la grabación a la duración
  if (this.timeNow >= StartRecoding) { // Si el tiempo actual es mayor o igual al momento en que comienza la grabación
    if (Livespeed > 0) { // Si la velocidad es mayor que cero
      this.SpeedSamples.push(Livespeed); // Agrega la velocidad a la lista de velocidades
    }
    Self.FinalSpeed = Self.ArraySum(Self.SpeedSamples) / Self.SpeedSamples.length; // Calcula la velocidad final como el promedio de las velocidades en la lista
  }
  return Self.FinalSpeed; // Retorna la velocidad final
};

// Función para generar datos aleatorios
openSpeedtestGet.prototype.uRandom = function(size, callback) {
  var size = size; // Tamaño de los datos aleatorios
  var randomValue = new Uint32Array(262144); // Crea un array de números enteros sin signo de 32 bits de largo 262144
  function getRandom() {
    var n = randomValue.length;
    for (var i = 0; i < n; i++) { // Recorre el array
      randomValue[i] = Math.random() * 4294967296; // Genera un número aleatorio entre 0 y 4294967296 y lo guarda en el array
    }
    return randomValue;
  }
  var randomData = [];
  var genData = function(dataSize) { // Función para generar los datos aleatorios
    var dataSize = dataSize; // Tamaño de los datos
    for (var i = 0; i < dataSize; i++) {
      randomData[i] = getRandom(); // Agrega los datos generados a la lista
    }
    return randomData;
  };
  return new Blob(genData(size), {type:"application/octet-stream"}, Callback(callback)); // Retorna los datos aleatorios como un objeto Blob
};

  openSpeedtestGet.prototype.addEvt = function(o, e, f) {
    o.addEventListener(e, f);
  };
  openSpeedtestGet.prototype.remEvt = function(o, e, f) {
    o.removeEventListener(e, f);
  };
  var openSpeedtestEngine = function() {
    var Get = new openSpeedtestGet();
    var Show = new openSpeedtestShow();
    Show.app();
    var SendData;
    var myhostName = location.hostname;
    var key;
    var TestServerip;
    var downloadSpeed;
    var uploadSpeed;
    var dataUsedfordl;
    var dataUsedforul;
    var pingEstimate;
    var jitterEstimate;
    var logData;
    var return_data;
    var ReQ = [];
    var StartTime = [];
    var CurrentTime = [];
    var LiveSpeedArr;
    var dLoaded = 0;
    var uLoaded = 0;
    var currentSpeed = 0;
    var uploadTimeing;
    var downloadTimeing;
    var downloadTime;
    var uploadTime;
    var saveTestData;
    var stop = 0;
    function reSett() {
      StartTime = 0;
      CurrentTime = 0;
      LiveSpeedArr = 0;
      currentSpeed = 0;
    }
    var userAgentString;
    if (window.navigator.userAgent) {
      userAgentString = window.navigator.userAgent;
    } else {
      userAgentString = "Not Found";
    }
    var ulFinal = ulDuration * 0.6;
    var dlFinal = dlDuration * 0.6;
    function setFinal() {
      if (ulDuration * 0.6 >= 7) {
        ulFinal = 7;
      }
      if (dlDuration * 0.6 >= 7) {
        dlFinal = 7;
      }
    }
    setFinal();
    var launch = true;
    var init = true;
    Get.addEvt(Show.settingsMob.el, "click", ShowIP);
    Get.addEvt(Show.settingsDesk.el, "click", ShowIP);
    Get.addEvt(Show.startButtonDesk.el, "click", runTasks);
    Get.addEvt(Show.startButtonMob.el, "click", runTasks);
    Get.addEvt(document, "keypress", hiEnter);
    var addEvent = true;
    var getParams = function(url) {
      var params = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };
    var getCommand = getParams(window.location.href.toLowerCase());
    if (setPingSamples) {
      if (typeof getCommand.ping === "string" || typeof getCommand.p === "string") {
        var setPing;
        if (typeof getCommand.ping !== "undefined") {
          setPing = getCommand.ping;
        } else if (typeof getCommand.p !== "undefined") {
          setPing = getCommand.p;
        }
        if (setPing > 0) {
          pingSamples = setPing;
          pingSamples = setPing;
        }
      }
    }
    if (setPingTimeout) {
      if (typeof getCommand.out === "string" || typeof getCommand.o === "string") {
        var setOut;
        if (typeof getCommand.out !== "undefined") {
          setOut = getCommand.out;
        } else if (typeof getCommand.o !== "undefined") {
          setOut = getCommand.o;
        }
        if (setOut > 1) {
          pingTimeOut = setOut;
          pingTimeOut = setOut;
        }
      }
    }
    if (setHTTPReq) {
      if (typeof getCommand.xhr === "string" || typeof getCommand.x === "string") {
        var setThreads;
        if (typeof getCommand.xhr !== "undefined") {
          setThreads = getCommand.xhr;
        } else if (typeof getCommand.x !== "undefined") {
          setThreads = getCommand.x;
        }
        if (setThreads > 0 && setThreads <= 32) {
          dlThreads = setThreads;
          ulThreads = setThreads;
        }
      }
    }
    function isValidHttpUrl(str) {
      var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    }
    if (selectServer) {
      if (typeof getCommand.host === "string" || typeof getCommand.h === "string") {
        var severAddress;
        if (typeof getCommand.host !== "undefined") {
          severAddress = getCommand.host;
        } else if (typeof getCommand.h !== "undefined") {
          severAddress = getCommand.h;
        }
        if (isValidHttpUrl(severAddress)) {
          openSpeedTestServerList = [{ServerName:"Home", Download:severAddress + "/downloading", Upload:severAddress + "/upload", ServerIcon:"DefaultIcon",},];
        }
      }
    }
    var custom = parseInt(getCommand.stress);
    var customS = parseInt(getCommand.s);
    var runStress;
    var runStressCustom;
    if (typeof getCommand.stress === "string") {
      runStress = getCommand.stress;
      runStressCustom = custom;
    } else if (typeof getCommand.s === "string") {
      runStress = getCommand.s;
      runStressCustom = customS;
    }
    if (runStress && stressTest) {
      if (runStress === "low" || runStress === "l") {
        dlDuration = 300;
        ulDuration = 300;
      }
      if (runStress === "medium" || runStress === "m") {
        dlDuration = 600;
        ulDuration = 600;
      }
      if (runStress === "high" || runStress === "h") {
        dlDuration = 900;
        ulDuration = 900;
      }
      if (runStress === "veryhigh" || runStress === "v") {
        dlDuration = 1800;
        ulDuration = 1800;
      }
      if (runStress === "extreme" || runStress === "e") {
        dlDuration = 3600;
        ulDuration = 3600;
      }
      if (runStress === "day" || runStress === "d") {
        dlDuration = 86400;
        ulDuration = 86400;
      }
      if (runStress === "year" || runStress === "y") {
        dlDuration = 31557600;
        ulDuration = 31557600;
      }
      if (custom > 12 || customS > 12) {
        dlDuration = runStressCustom;
        ulDuration = runStressCustom;
      }
    }
    var overheadClean = parseInt(getCommand.clean);
    var overheadCleanC = parseInt(getCommand.c);
    var customOverHeadValue = 1;
    if (overheadClean) {
      customOverHeadValue = overheadClean;
    } else if (overheadCleanC) {
      customOverHeadValue = overheadCleanC;
    }
    if (enableClean) {
      if (typeof getCommand.clean === "string" || typeof getCommand.c === "string") {
        if (overheadClean >= 1 || overheadCleanC >= 1) {
          if (overheadClean < 5 || overheadCleanC < 5) {
            upAdjust = 1 + customOverHeadValue / 100;
            dlAdjust = 1 + customOverHeadValue / 100;
          }
        } else {
          upAdjust = 1;
          dlAdjust = 1;
        }
      }
    }
    var OpenSpeedTestRun = parseInt(getCommand.run);
    var OpenSpeedTestRunR = parseInt(getCommand.r);
    var OpenSpeedTestStart;
    if (enableRun) {
      if (typeof getCommand.run === "string" || typeof getCommand.r === "string") {
        if (OpenSpeedTestRun > 0) {
          OpenSpeedTestStart = OpenSpeedTestRun;
        } else if (OpenSpeedTestRunR > 0) {
          OpenSpeedTestStart = OpenSpeedTestRunR;
        } else {
          OpenSpeedTestStart = 0;
        }
      }
    }
    if (OpenSpeedTestStart >= 0) {
      if (launch) {
        runTasks();
      }
    }
    var runTest = getCommand.test;
    var runTestT = getCommand.t;
    var SelectTest = false;
    if (selectTest) {
      if (typeof runTest === "string" || typeof runTestT === "string") {
        var runTestC;
        if (runTest) {
          runTestC = runTest;
          SelectTest = runTest;
        } else if (runTestT) {
          runTestC = runTestT;
          SelectTest = runTestT;
        }
        if (runTestC === "download" || runTestC === "d") {
          uploadSpeed = 0;
          dataUsedforul = 0;
          SelectTest = "Download";
          if (launch) {
            runTasks();
          }
        } else if (runTestC === "upload" || runTestC === "u") {
          downloadSpeed = 0;
          dataUsedfordl = 0;
          SelectTest = "Upload";
          stop = 1;
          if (launch) {
            runTasks();
          }
        } else if (runTestC === "ping" || runTestC === "p") {
          uploadSpeed = 0;
          dataUsedforul = 0;
          downloadSpeed = 0;
          dataUsedfordl = 0;
          SelectTest = "Ping";
          if (launch) {
            runTasks();
          }
        } else {
          SelectTest = false;
        }
      }
    }
    var Startit = 0;
    function removeEvts() {
      Get.remEvt(Show.settingsMob.el, "click", ShowIP);
      Get.remEvt(Show.settingsDesk.el, "click", ShowIP);
      Get.remEvt(Show.startButtonDesk.el, "click", runTasks);
      Get.remEvt(Show.startButtonMob.el, "click", runTasks);
      Get.remEvt(document, "keypress", hiEnter);
    }
    var requestIP = false;
    function ShowIP() {
      if (requestIP) {
        Show.YourIP.el.textContent = "Please wait..";
        ServerConnect(7);
        requestIP = false;
      }
      Show.ip();
    }
    function runTasks() {
      if (addEvent) {
        removeEvts();
        addEvent = false;
      }
      if (OpenSpeedTestStart >= 0) {
        launch = false;
        Show.userInterface();
        init = false;
        var AutoTme = Math.ceil(Math.abs(OpenSpeedTestStart));
        Show.showStatus("Automatic Test Starts in ...");
        var autoTest = setInterval(countDownF, 1000);
      }
      function countDownF() {
        if (AutoTme >= 1) {
          AutoTme = AutoTme - 1;
          Show.LiveSpeed(AutoTme, "countDown");
        } else {
          if (AutoTme <= 0) {
            clearInterval(autoTest);
            launch = true;
            OpenSpeedTestStart = undefined;
            runTasks();
          }
        }
      }
      if (openSpeedTestServerList === "fetch" && launch === true) {
        launch = false;
        Show.showStatus("Fetching Server Info..");
        ServerConnect(6);
      }
      if (launch === true) {
        if (SelectTest === "Ping") {
          testRun();
        } else if (SelectTest === "Download") {
          testRun();
        } else if (SelectTest === "Upload") {
          testRun();
        } else if (SelectTest === false) {
          testRun();
        }
      }
    }
    //-------MENSAJE FINAL AL TERMINAR LA PRUEBA DE VELOCIDAD u2122 representa el simbolo de TM var osttm = "\u2122"; 
    var myname = "RTA";
    var com = ".com";
    var ost = myname;
    function hiEnter(e) {
      if (e.key === "Enter") {
        runTasks();
      }
    }
    var showResult = 0;
    if (openChannel === "web") {
      showResult = webRe;
      requestIP = true;
    }
    if (openChannel === "widget") {
      showResult = widgetRe;
      requestIP = true;
    }
    if (openChannel === "selfwidget") {
      showResult = widgetRe;
      TestServerip = domainx;
      myhostName = TestServerip;
    }
    if (openChannel === "dev") {
    }
    function testRun() {
      if (init) {
        Show.userInterface();
        init = false;
      }
      OpenSpeedtest();
    }
    function OpenSpeedtest() {
      if (openChannel === "widget" || openChannel === "web") {
        ServerConnect(1);
      }
      function readyToUP() {
        uploadTime = window.performance.now();
        upReq();
      }
      var Engine = setInterval(function() {
        if (Status === "Loaded") {
          Status = "busy";
          sendPing(0);
        }
        if (Status === "Ping") {
          Status = "busy";
          Show.showStatus("Milliseconds");
        }
        if (Status === "Download") {
          Show.showStatus("Initializing..");
          Get.reset();
          reSett();
          Show.reset();
          downloadTime = window.performance.now();
          downReq();
          Status = "initDown";
        }
        if (Status === "Downloading") {
          Show.Symbol(0);
          if (Startit == 0) {
            Startit = 1;
            Show.showStatus("Testing download speed..");
            var extraTime = (window.performance.now() - downloadTime) / 1000;
            dReset = extraTime;
            Show.progress(1, dlDuration + 2.5);
            dlDuration += extraTime;
          }
          downloadTimeing = (window.performance.now() - downloadTime) / 1000;
          reportCurrentSpeed("dl");
          Show.showStatus("Gbps download");
          Show.mainGaugeProgress(currentSpeed/1000); //Valores de descarga convertidos a Gbps (/1000 para lograrlo)
          Show.LiveSpeed(currentSpeed/1000);
          Show.Graph(currentSpeed/1000, 0);
          downloadSpeed = Get.AvgSpeed(currentSpeed, dlFinal, dlDuration);
          if (downloadTimeing >= dlDuration && ProG == "done") {
            if (SelectTest) {
              Show.GaugeProgresstoZero(currentSpeed/1000, "SendR");
              Show.showStatus("All done");
              Show.Symbol(2);
            } else {
              Show.GaugeProgresstoZero(currentSpeed/1000, "Upload");
            }
            Show.downloadResult(downloadSpeed/1000); // <-- aqui se muestra el resultado de la prueba de velocidad reducido de Mb/s a Gb/s
            dataUsedfordl = dLoaded;
            stop = 1;
            Status = "busy";
            reSett();
            Get.reset();
          }
        }
        if (Status == "Upload") {
          if (stop === 1) {
            Show.Symbol(1);
            Status = "initup";
            Show.showStatus("Initializing..");
            Show.LiveSpeed("...", "speedToZero");
            SendData = Get.uRandom(ulDataSize, readyToUP);
            if (SelectTest) {
              Startit = 1;
            }
          }
        }
        if (Status === "Uploading") {
          if (Startit == 1) {
            Startit = 2;
            Show.showStatus("Testing upload speed..");
            currentSpeed = 0;
            Get.reset();
            Show.reset();
            var extraUTime = (window.performance.now() - uploadTime) / 1000;
            uReset = extraUTime;
            Show.progress(false, ulDuration + 2.5);
            ulDuration += extraUTime;
          }
          Show.showStatus("Gbps upload");
          uploadTimeing = (window.performance.now() - uploadTime) / 1000;
          reportCurrentSpeed("up");
          Show.mainGaugeProgress(currentSpeed/1000);
          Show.LiveSpeed(currentSpeed/1000);
          Show.Graph(currentSpeed, 1);
          uploadSpeed = Get.AvgSpeed(currentSpeed, ulFinal, ulDuration);
          if (uploadTimeing >= ulDuration && stop == 1) {
            dataUsedforul = uLoaded;
            Show.uploadResult(uploadSpeed/1000); //Convertir Mbps a Gbps
            Show.GaugeProgresstoZero(currentSpeed/1000, "SendR");
            SendData = undefined;
            Show.showStatus("All done");
            Show.Symbol(2);
            Status = "busy";
            stop = 0;
          }
        }
        if (Status === "Error") {
          Show.showStatus("Check your network connection status.");
          Show.ConnectionError();
          Status = "busy";
          clearInterval(Engine);
          var dummyElement = document.createElement("div");
          dummyElement.innerHTML = '<a xlink:href="https://openspeedtest.com/FAQ.php?ref=NetworkError" style="cursor: pointer" target="_blank"></a>';
          var htmlAnchorElement = dummyElement.querySelector("a");
          Show.oDoLiveSpeed.el.textContent = "Network Error";
          var circleSVG = document.getElementById("oDoLiveSpeed");
          htmlAnchorElement.innerHTML = circleSVG.innerHTML;
          circleSVG.innerHTML = dummyElement.innerHTML;
        }
        if (Status === "SendR") {
          Show.showStatus("All done");
          var dummyElement = document.createElement("div");
          dummyElement.innerHTML = '<a xlink:href="https://openspeedtest.com?ref=Self-Hosted-Outro&run=5" style="cursor: pointer" target="_blank"></a>';
          var htmlAnchorElement = dummyElement.querySelector("a");
          Show.oDoLiveSpeed.el.textContent = ost;
          var circleSVG = document.getElementById("oDoLiveSpeed");
          htmlAnchorElement.innerHTML = circleSVG.innerHTML;
          circleSVG.innerHTML = dummyElement.innerHTML;
          if (location.hostname != myname.toLowerCase() + com) {
            saveTestData = "https://" + myname.toLowerCase() + com + "/results/show.php?" + "&d=" + downloadSpeed.toFixed(3) + "&u=" + uploadSpeed.toFixed(3) + "&p=" + pingEstimate + "&j=" + jitterEstimate + "&dd=" + (dataUsedfordl / 1048576).toFixed(3) + "&ud=" + (dataUsedforul / 1048576).toFixed(3) + "&ua=" + userAgentString;
            saveTestData = encodeURI(saveTestData);
            var circleSVG2 = document.getElementById("resultsData");
            circleSVG2.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", saveTestData);
            circleSVG2.setAttribute("target", "_blank");
            if (saveData) {
              ServerConnect(5);
            }
          } else {
            ServerConnect(3);
          }
          Status = "busy";
          clearInterval(Engine);
        }
      }, 100);
    }
    function downReq() {
      for (var i = 0; i < dlThreads; i++) {
        setTimeout(function(i) {
          SendReQ(i);
        }, dlDelay * i, i);
      }
    }
    function upReq() {
      for (var i = 0; i < ulThreads; i++) {
        setTimeout(function(i) {
          SendUpReq(i);
        }, ulDelay * i, i);
      }
    }
    var dLoad = 0;
    var dDiff = 0;
    var dTotal = 0;
    var dtLoad = 0;
    var dtDiff = 0;
    var dtTotal = 0;
    var dRest = 0;
    var dReset;
    var uReset;
    var uLoad = 0;
    var uDiff = 0;
    var uTotal = 0;
    var utLoad = 0;
    var utDiff = 0;
    var utTotal = 0;
    var uRest = 0;
    var dualReset;
    var neXT = dlDuration * 1000 - 6000;
    var dualupReset;
    var neXTUp = ulDuration * 1000 - 6000;
    function reportCurrentSpeed(now) {
      if (now === "dl") {
        var dTime = downloadTimeing * 1000;
        if (dTime > dReset * 1000 + dlFinal / 2 * 1000 && dRest === 0) {
          dRest = 1;
          dtTotal = dtTotal * 0.01;
          dTotal = dTotal * 0.01;
          dualReset = dTime + 10000;
        }
        if (dTime >= dualReset && dualReset < neXT) {
          dualReset += 10000;
          dtTotal = dtTotal * 0.01;
          dTotal = dTotal * 0.01;
        }
        dLoad = dLoaded <= 0 ? 0 : dLoaded - dDiff;
        dDiff = dLoaded;
        dTotal += dLoad;
        dtLoad = dtDiff = 0 ? 0 : dTime - dtDiff;
        dtDiff = dTime;
        dtTotal += dtLoad;
        if (dTotal > 0) {
          LiveSpeedArr = dTotal / dtTotal / 125 * upAdjust;
          currentSpeed = LiveSpeedArr;
        }
      }
      if (now === "up") {
        var Tym = uploadTimeing * 1000;
        if (Tym > uReset * 1000 + ulFinal / 2 * 1000 && uRest === 0) {
          uRest = 1;
          utTotal = utTotal * 0.1;
          uTotal = uTotal * 0.1;
          dualupReset = Tym + 10000;
        }
        if (Tym >= dualupReset && dualupReset < neXTUp) {
          dualupReset += 10000;
          utTotal = utTotal * 0.1;
          uTotal = uTotal * 0.1;
        }
        uLoad = uLoaded <= 0 ? 0 : uLoaded - uDiff;
        uDiff = uLoaded;
        uTotal += uLoad;
        utLoad = utDiff = 0 ? 0 : Tym - utDiff;
        utDiff = Tym;
        utTotal += utLoad;
        if (uTotal > 0) {
          LiveSpeedArr = uTotal / utTotal / 125 * upAdjust;
          currentSpeed = LiveSpeedArr;
        }
      }
    }
    function SendReQ(i) {
      var lastLoaded = 0;
      var OST = new XMLHttpRequest();
      ReQ[i] = OST;
      ReQ[i].open("GET", fianlPingServer.Download + "?n=" + Math.random(), true);
      ReQ[i].onprogress = function(e) {
        if (stop === 1) {
          ReQ[i].abort();
          ReQ[i] = null;
          ReQ[i] = undefined;
          delete ReQ[i];
          return false;
        }
        if (Status == "initDown") {
          Status = "Downloading";
        }
        var eLoaded = e.loaded <= 0 ? 0 : e.loaded - lastLoaded;
        if (isNaN(eLoaded) || !isFinite(eLoaded) || eLoaded < 0) {
          return false;
        }
        dLoaded += eLoaded;
        lastLoaded = e.loaded;
      };
      ReQ[i].onload = function(e) {
        if (lastLoaded === 0) {
          dLoaded += e.total;
        }
        if (Status == "initDown") {
          Status = "Downloading";
        }
        if (ReQ[i]) {
          ReQ[i].abort();
          ReQ[i] = null;
          ReQ[i] = undefined;
          delete ReQ[i];
        }
        if (stop === 0) {
          SendReQ(i);
        }
      };
      ReQ[i].onerror = function(e) {
        if (stop === 0) {
          SendReQ(i);
        }
      };
      ReQ[i].responseType = "arraybuffer";
      ReQ[i].send();
    }
    var uReQ = [];
    function SendUpReq(i) {
      var lastULoaded = 0;
      var OST = new XMLHttpRequest();
      uReQ[i] = OST;
      uReQ[i].open("POST", fianlPingServer.Upload + "?n=" + Math.random(), true);
      uReQ[i].upload.onprogress = function(e) {
        if (Status == "initup" && some === undefined) {
          var some;
          Status = "Uploading";
        }
        if (uploadTimeing >= ulDuration) {
          uReQ[i].abort();
          uReQ[i] = null;
          uReQ[i] = undefined;
          delete uReQ[i];
          return false;
        }
        var eLoaded = e.loaded <= 0 ? 0 : e.loaded - lastULoaded;
        if (isNaN(eLoaded) || !isFinite(eLoaded) || eLoaded < 0) {
          return false;
        }
        uLoaded += eLoaded;
        lastULoaded = e.loaded;
      };
      uReQ[i].onload = function() {
        if (lastULoaded === 0) {
          uLoaded += ulDataSize * 1048576;
          if (uploadTimeing >= ulDuration) {
            uReQ[i].abort();
            uReQ[i] = null;
            uReQ[i] = undefined;
            delete uReQ[i];
            return false;
          }
        }
        if (Status == "initup" && some === undefined) {
          var some;
          Status = "Uploading";
        }
        if (uReQ[i]) {
          uReQ[i].abort();
          uReQ[i] = null;
          uReQ[i] = undefined;
          delete uReQ[i];
        }
        if (stop === 1) {
          SendUpReq(i);
        }
      };
      uReQ[i].onerror = function(e) {
        if (uploadTimeing <= ulDuration) {
          SendUpReq(i);
        }
      };
      uReQ[i].setRequestHeader("Content-Type", "application/octet-stream");
      if (i > 0 && uLoaded <= 17000) {
      } else {
        uReQ[i].send(SendData);
      }
    }
    function sendPing() {
      readServerList();
    }
    var fianlPingServer;
    var statusPing;
    var statusPingFinal;
    var statusJitter;
    var statusJitterFinal;
    var statusPingTest;
    var pingSendStatus = -1;
    var finalPing = [];
    var pingServer = [];
    var finalJitter = [];
    var pingSendLength = openSpeedTestServerList.length;
    function readServerList() {
      pingSendLength = openSpeedTestServerList.length;
      Status = "Ping";
      performance.clearResourceTimings();
      if (pingSendStatus < pingSendLength - 1) {
        pingSendStatus++;
        if (statusPingTest != "Stop") {
          sendPingRequest(openSpeedTestServerList[pingSendStatus], readServerList);
        }
      } else {
        if (pingServer.length >= 1) {
          var finalLeastPingResult = Math.min.apply(Math, finalPing);
          var finalLeastPingResultIndex = finalPing.indexOf(finalLeastPingResult);
          fianlPingServer = pingServer[finalLeastPingResultIndex];
          statusPingFinal = finalLeastPingResult;
          statusJitterFinal = finalJitter[finalLeastPingResultIndex];
          statusPingTest = "Busy";
          Show.LiveSpeed(statusPingFinal, "Ping");
          Show.pingResults(statusPingFinal, "Ping");
          Show.jitterResult(statusJitterFinal, "Jitter");
          pingEstimate = statusPingFinal;
          jitterEstimate = statusJitterFinal;
          if (SelectTest) {
            if (SelectTest == "Ping") {
              Status = "SendR";
            } else {
              Status = SelectTest;
            }
          } else {
            Status = "Download";
          }
        } else {
          if (pingServer.Download) {
          } else {
            Status = "Error";
          }
        }
      }
    }
    function sendPingRequest(serverListElm, callback) {
      var pingSamplesSend = 0;
      var pingResult = [];
      var jitterResult = [];
      function sendNewPingReq() {
        if (pingSamplesSend < pingSamples) {
          pingSamplesSend++;
          if (statusPingTest != "Stop") {
            PingRequest();
          }
        } else {
          if (pingResult.length > 1) {
            jitterResult.sort(function(a, b) {
              return a - b;
            });
            jitterResult = jitterResult.slice(0, jitterResult.length * jitterFinalSample);
            jitterResult = jitterResult.reduce(function(acc, val) {
              return acc + val;
            }, 0) / jitterResult.length;
            var leastJitter = jitterResult.toFixed(1);
            var leastPing = Math.min.apply(Math, pingResult);
            finalPing.push(leastPing);
            pingServer.push(serverListElm);
            finalJitter.push(leastJitter);
            if (typeof callback === "function") {
              callback();
            }
          } else {
            if (typeof callback === "function") {
              callback();
            }
          }
        }
      }
      function PingRequest() {
        var OST = new XMLHttpRequest();
        var ReQ = OST;
        if (statusPingTest != "Stop") {
          ReQ.abort();
        }
        ReQ.open(pingMethod, serverListElm[pingFile] + "?n=" + Math.random(), true);
        ReQ.timeout = pingTimeOut;
        var startTime = window.performance.now();
        ReQ.send();
        ReQ.onload = function() {
          if (this.status === 200 && this.readyState === 4) {
            var endTime = Math.floor(window.performance.now() - startTime);
            var perfNum = performance.getEntries();
            perfNum = perfNum[perfNum.length - 1];
            var perfPing;
            if (perfNum.initiatorType === "xmlhttprequest") {
              perfPing = parseFloat(perfNum.duration.toFixed(1));
            } else {
              perfPing = endTime;
            }
            if (pingSamplesSend > 250) {
              perfPing = endTime;
            }
            if (perfPing <= 0) {
              statusPing = 0.1;
              pingResult.push(0.1);
            } else {
              statusPing = perfPing;
              pingResult.push(perfPing);
            }
            if (pingResult.length > 1) {
              var jitterCalc = Math.abs(pingResult[pingResult.length - 1] - pingResult[pingResult.length - 2]).toFixed(1);
              jitterResult.push(parseFloat(jitterCalc));
              statusJitter = jitterCalc;
              Show.LiveSpeed(perfPing, "Ping");
              Show.pingResults(perfPing, "Ping");
              Show.jitterResult(jitterCalc, "Jitter");
            }
            sendNewPingReq();
          }
          if (this.status === 404 && this.readyState === 4) {
            pingSamplesSend++;
            sendNewPingReq();
          }
        };
        ReQ.onerror = function(e) {
          pingSamplesSend++;
          sendNewPingReq();
        };
        ReQ.ontimeout = function(e) {
          pingSamplesSend++;
          sendNewPingReq();
        };
      }
      PingRequest();
    }
    var ServerConnect = function(auth) {
      var Self = this;
      var xhr = new XMLHttpRequest();
      var url = OpenSpeedTestdb;
      if (auth == 1) {
        url = webIP;
      }
      if (auth == 5) {
        url = saveDataURL;
      }
      if (auth == 7) {
        url = get_IP;
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          return_data = xhr.responseText.trim();
          if (auth == 2) {
            key = return_data;
          }
          if (auth == 1) {
            TestServerip = return_data;
          }
          if (auth == 3) {
            setTimeout(function() {
              location.href = showResult + return_data;
            }, 1500);
          }
          if (auth == 6) {
            openSpeedTestServerList = JSON.parse(return_data);
            launch = true;
            runTasks();
          }
          if (auth == 7) {
            Show.YourIP.el.textContent = return_data;
          }
        }
      };
      if (auth == 2) {
        logData = "r=n";
      }
      if (auth == 3) {
        logData = "r=l" + "&d=" + downloadSpeed + "&u=" + uploadSpeed + "&dd=" + dataUsedfordl / 1048576 + "&ud=" + dataUsedforul / 1048576 + "&p=" + pingEstimate + "&do=" + myhostName + "&S=" + key + "&sip=" + TestServerip + "&jit=" + jitterEstimate + "&ua=" + userAgentString;
      }
      if (auth == 5) {
        logData = saveTestData;
      }
      if (auth == 6) {
        logData = "r=s";
      }
      xhr.send(logData);
    };
  };
  OpenSpeedTest.Start = function() {
    new openSpeedtestEngine();
  };
}
)(window.OpenSpeedTest = window.OpenSpeedTest || {});
