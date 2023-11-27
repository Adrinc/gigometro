/* window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var difference = Math.abs(width - height);


  
    if (difference < 100
        || height < 799 && height > 600 && width<799  && width>600
        || height < 699 && height > 500 && width<699  && width>500
        || height < 599 && height > 400 && width<599  && width>400
        || height < 499 && height > 300 && width<499  && width>300
        || height < 399 && height > 200 && width<399  && width>200
        ) {
        console.log("casi cuadrada");
      // Añade la clase "casi-cuadrada" a los elementos que quieres estilizar
      document.querySelector('.gigometer').classList.add('casi-cuadrada');
      // Repite para otros elementos si es necesario
    } else {
        console.log("no cuadrada");
      // Elimina la clase "casi-cuadrada" si la diferencia es mayor de 50px
      document.querySelector('.gigometer').classList.remove('casi-cuadrada');
      // Repite para otros elementos si es necesario
    }
  }); */