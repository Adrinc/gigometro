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
  
