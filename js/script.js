/* ============================= */
/* ---------- PARTE 1 ---------- */
/* ============================= */

// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
// que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes) => {
    let suma = 0;
    local.precios.filter(element => {
        for (let i = 0; i < componentes.length; i++) {
            if(element.componente === componentes[i]){
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

const vendedoraPorMes = (vendedora, mes, anio) => { // Esta funcion es para reutilizarla en la que pide el ejercicio
    const {ventas} = local; 
    let suma = 0;
    for (venta of ventas) {
        if (venta.nombreVendedora === vendedora && (venta.fecha.getMonth() === mes && venta.fecha.getFullYear() === anio)) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

const vendedoraDelMes = (mes, anio) => {   // Funcion que pide el ejercicio
    const {vendedoras} = local;
    let ventaPorVendedora = [];
    vendedoras.forEach(vendedora => {
        ventaPorVendedora.push({
            vendedora: vendedora,
            ventaPorMes: vendedoraPorMes(vendedora, mes, anio)
        });
    });
    let ganadora = maximo("ventaPorMes", ventaPorVendedora);
    if (ganadora.ventaPorMes === 0) {
        return "Este mes no hubo ganadora";
    } else {
        return ganadora.vendedora;
    }
}

const maximo = (prop, array) => { // Funcion para devolver el valor maximo
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

/* ============================= */
/* ---------- PARTE 2 ---------- */
/* ============================= */

// Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal) => {
    const {ventas} = local;
    let suma = 0;
    for (venta of ventas) {
        if (venta.sucursal === sucursal) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma
// funcionalidad pero trabajando con una propiedad distinta. Entonces,
// ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const ventasFiltradas = (filtro) => {
    let suma = 0;
    const {ventas} = local;
    for (venta of ventas) {
        if (venta.sucursal === filtro || venta.nombreVendedora === filtro) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

// Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve
// el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas.
// El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero)
// hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
    const {sucursales} = local;
    let ventaPorSucursal = [];
    sucursales.forEach(sucursal => {
        ventaPorSucursal.push({
            sucursal: sucursal,
            ventaPorMes: sucursalPorMes(sucursal, mes, anio)
        });
    });
    let maximaVenta = maximo("ventaPorMes", ventaPorSucursal);
    return maximaVenta.sucursal;
}

const sucursalPorMes = (sucursal, mes, anio) => {
    const {ventas} = local; 
    let suma = 0;
    for (venta of ventas) {
        if (venta.sucursal === sucursal && (venta.fecha.getMonth() === mes && venta.fecha.getFullYear() === anio)) {
            suma += precioMaquina(venta.componentes);
        }
    }
    return suma;
}

/* ============================= */
/* ---------- PARTE 3 ---------- */
/* ============================= */

// renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = (year) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    console.log("Ventas por mes:") 
    meses.forEach((key, value) => {
        if (ventasMes(value, year) != 0) {
            console.log(`Venta de ${key} en ${year}: `, ventasMes(value, year));
        }
    });
}

// renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {
    const {sucursales} = local;
    sucursales.forEach(key => {
        if (ventasSucursal(key) != 0) {
            console.log(`Venta de ${key}: `, ventasSucursal(key));
        }
    });
}

// render(): Tiene que mostrar la unión de los dos reportes anteriores,
// cual fue el producto más vendido y la vendedora que más ingresos generó

// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace

const render = (year) => {
    renderPorMes(year);
    renderPorSucursal();
    console.log(`Producto estrella:`, componenteMasVendido());
    console.log(`Vendedora que mas ingresos genero:`, vendedoraDelMes(year));
}