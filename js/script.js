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
            suma += 1;
        }
    }
    return suma;
}

// vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que
// más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. 
// El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde
// el 1 (enero) hasta el 12 (diciembre).

const vendedoraPorMes = (vendedora, mes, anio) => {
    const {ventas} = local; 
    let suma = 0;
    for (venta of ventas) {
        if (venta.nombreVendedora === vendedora && (venta.fecha.getMonth() === mes && venta.fecha.getFullYear() === anio)) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

const vendedoraDelMes = (mes, anio) => {   
    const {vendedoras} = local;
    // console.log(vendedoras);
    let ventaPorVendedora = [];
    vendedoras.forEach(vendedora => {
        ventaPorVendedora.push({
            vendedora: vendedora,
            ventaPorMes: vendedoraPorMes(vendedora, mes, anio)
        });
    });
    // const maximo = (prop) => {
    //     let valorMinimo = ventaPorVendedora[0][prop];
    //     let empleada = ventaPorVendedora[0];
    
    //     for (i = 0; i < ventaPorVendedora.length; i++) {
    //         let valor = ventaPorVendedora[i][prop];
    //         if (valorMinimo < valor) {
    //             valorMinimo = valor;
    //             empleada = ventaPorVendedora[i];
    //         }
    //     }
    //     return empleada;
    // }
    let ganadora = maximo("ventaPorMes", ventaPorVendedora);
    if (ganadora.ventaPorMes === 0) {
        return "Este mes no hubo ganadora";
    } else {
        return ganadora.vendedora;
    }
}

const maximo = (prop, array) => {
    let valorMinimo = array[0][prop];
    let valorMaximo = array[0];

    for (i = 0; i < array.length; i++) {
        let valor = array[i][prop];
        if (valorMinimo < valor) {
            valorMinimo = valor;
            valorMaximo = array[i];
        }
    }
    return valorMaximo;
}

// ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => {
    const {ventas} = local;
    let resultado = 0;
    for (venta of ventas) {
        if (venta.fecha.getMonth() === mes && venta.fecha.getFullYear() === anio) {
            resultado += precioMaquina(venta.componentes);
        }
    }
    return resultado;
}

// ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => {
    const {ventas} = local;
    let suma = 0;
    for (venta of ventas) {
        if (venta.nombreVendedora === nombre) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

// componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente.
// El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
    const {precios} = local;
    let ventasPorComponente = [];
    precios.forEach(precio => {
        ventasPorComponente.push({
            componente: precio.componente,
            vendido: cantidadVentasComponente(precio.componente)
        });
    });
    let masVendido = maximo("vendido", ventasPorComponente);
    return masVendido.componente;  
}

// huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. 
// El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
    if (ventasMes(mes,anio) > 0) {
        return true;
    } else {
        return false;
    }
}