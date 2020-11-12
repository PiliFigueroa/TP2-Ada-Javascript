// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
// que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes) => {
    let suma = 0;
    local.precios.filter(element => {
        if(element.componente.includes(componentes[0]) || element.componente.includes(componentes[1])){
            suma += element.precio;
        }
    });
    return suma;
}

// cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido,
// o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro,
// se asume que está identificada por la variable ventas

