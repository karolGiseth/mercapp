// constantes
const dataInicial = {
  array: null,
};

// types
const SESION_INICIADA = "SESION_INICIADA";
const SESION_CERRADA = "SESION_CERRADA";

// reducer
export default function sesionReducer(state = dataInicial, action) {
  switch (action.type) {
    case SESION_INICIADA:
      return { array: action.payload };

    case SESION_CERRADA:
      return { array: null };

    default:
      return state;
  }
}

// acciones
export const sesionIniciadaAccion = (data) => async (dispatch) => {
  dispatch({
    type: SESION_INICIADA,
    payload: data,
  });
  try {
  } catch (error) {
    console.log(error);
  }
};

export const sesionCerradaAccion = () => async (dispatch) => {
  dispatch({
    type: SESION_CERRADA,
  });
  try {
  } catch (error) {
    console.log(error);
  }
};
