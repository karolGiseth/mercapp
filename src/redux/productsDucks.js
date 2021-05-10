// constantes
const dataInicial = {
  array: [],
};

// types
const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
const PUBLICAR_PRODUCTOS = "PUBLICAR_PRODUCTOS";

// reducer
export default function productsReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_PRODUCTOS:
      return { ...state, array: action.payload };

    case PUBLICAR_PRODUCTOS:
      return { ...state, array: action.payload };

    default:
      return state;
  }
}

// acciones
export const obtenerProductosAccion = () => async (dispatch, getState) => {
  try {
    const res = await fetch(
      "https://crud-firebase-3d5f0-default-rtdb.firebaseio.com/mercapp.json"
    );
    const data = await res.json();
    dispatch({
      type: OBTENER_PRODUCTOS,
      payload: data.productos,
    });
  } catch (error) {
    console.log(error);
  }
};
