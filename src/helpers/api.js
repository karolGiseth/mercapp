const url = "https://crud-firebase-3d5f0-default-rtdb.firebaseio.com/mercapp";

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

export const verProductosPublicos = async () => {
  const res = await fetch(`${url}/productosPublicos.json`);
  const data = await res.json();
  return data;
};
