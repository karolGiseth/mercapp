const url = "https://mercaap-a0cd9-default-rtdb.firebaseio.com";

// acciones del administrador
export const crearProductos = async (producto) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
  const response = await fetch(`${url}/productos.json`, requestOptions);
  const data = await response.json();
  return data;
};

export const register = async (user) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  const response = await fetch(`${url}/usuarios.json`, requestOptions);
  const data = await response.json();
  return data;
};

export const login = async (user) => {
  const response = await fetch(`${url}/usuarios.json`);
  const data = await response.json();
  return data;
};

export const eliminarCuenta = async ({ usuario, correo }) => {
  const res = await fetch(`${url}/usuarios.json`);
  const usuarios = await res.json();

  // filtrar los usuarios y retornando sin el que ejecuto la accion de eliminar cuenta
  let info = {};
  for (const key in usuarios) {
    if (Object.hasOwnProperty.call(usuarios, key)) {
      const element = usuarios[key];
      if (key !== usuario) {
        info = { ...info, [key]: element };
      }
    }
  }

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };
  const usuarioEliminado = await fetch(`${url}/usuarios.json`, requestOptions);

  const resp = await fetch(`${url}/productosPublicos.json`);
  const productosPublicos = await resp.json();

  // filtrar los productos publicados por la cuenta
  let infoProductos = {};
  for (const key in productosPublicos) {
    if (Object.hasOwnProperty.call(productosPublicos, key)) {
      const element = productosPublicos[key];
      if (element.correo !== correo) {
        infoProductos = { ...infoProductos, [key]: element };
      }
    }
  }

  const requestOptionsProductos = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoProductos),
  };
  const productosEliminado = await fetch(
    `${url}/productosPublicos.json`,
    requestOptionsProductos
  );

  return { usuarioEliminado, productosEliminado };
};

export const departamentosColombia = async () => {
  const url =
    "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const ciudadesPorDepartamento = async (departamento) => {
  const url =
    "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";
  const res = await fetch(url);
  const data = await res.json();
  const ciudades = data.filter((el) => el.departamento === departamento);
  return ciudades;
};

export const productoParaPublicar = async (key) => {
  const res = await fetch(`${url}/productos/${key}.json`);
  const data = await res.json();
  return data;
};

export const publicarProducto = async (producto) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
  const response = await fetch(`${url}/productosPublicos.json`, requestOptions);
  const data = await response.json();
  return data;
};

export const editarProductoPublicado = async (key, datos) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  const response = await fetch(
    `${url}/productosPublicos/${key}.json`,
    requestOptions
  );
  const data = await response.json();
  return data;
};

export const editarCuenta = async (key, datos) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  const response = await fetch(`${url}/usuarios/${key}.json`, requestOptions);
  const data = await response.json();
  return data;
};

export const verProductosPublicos = async () => {
  const res = await fetch(`${url}/productosPublicos.json`);
  const data = await res.json();
  return data;
};

export const carritoCompras = async (producto) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
  const response = await fetch(`${url}/carritoCompras.json`, requestOptions);
  const data = await response.json();
  return data;
};

export const verCarrito = async () => {
  const res = await fetch(`${url}/carritoCompras.json`);
  const data = await res.json();
  return data;
};

export const editarSeguimientoProducto = async (key, datos) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  const response = await fetch(
    `${url}/carritoCompras/${key}.json`,
    requestOptions
  );
  const data = await response.json();
  return data;
};

export const crearVehiculo = async (vehiculo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  };
  const data = await fetch(`${url}/vehiculos.json`, requestOptions);
  return data;
};

export const listarVehiculos = async () => {
  const res = await fetch(`${url}/vehiculos.json`);
  const data = await res.json();
  return data;
};

export const eliminarVehiculo = async (vehiculo) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  };
  const data = await fetch(`${url}/vehiculos.json`, requestOptions);
  return data;
};

export const actualizarVehiculo = async (vehiculo, key) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  };
  const data = await fetch(`${url}/vehiculos/${key}.json`, requestOptions);
  return data;
};

export const eliminarProductoDelCarrito = async (productos) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productos),
  };
  const data = await fetch(`${url}/carritoCompras.json`, requestOptions);
  return data;
};

export const eliminarProductoPublicado = async (productos) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productos),
  };
  const data = await fetch(`${url}/productosPublicos.json`, requestOptions);
  return data;
};
