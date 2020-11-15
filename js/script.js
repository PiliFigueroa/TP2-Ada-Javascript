// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
// que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes) => {
    let suma = 0;
    local.precios.filter(element => {
        for (let i = 0; i < componentes.length; i++) {
            if(element.componente.includes(componentes[i])){
                suma += element.precio;
            }
        }
    });
    return suma;
}

// cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido,
// o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro,
// se asume que está identificada por la variable ventas

const cantidadVentasComponente = (componente) => {
    const {ventas} = local;
     let suma = 0;
     for (venta of ventas) {
          if (venta.componentes.includes(componente)) {
              suma+=1;
          }
     }
     return suma;
}

// vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que
// más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. 
// El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde
// el 1 (enero) hasta el 12 (diciembre).

