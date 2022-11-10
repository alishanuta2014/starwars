import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const BASE_URL = "https://swapi.dev/api/planets"; // https://swapi.dev/api/planets/?page=1

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, planets: [] };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        planets: action.payload.planets,
        count: action.payload.count,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        planets: [],
      };
    default:
      return state;
  }
}

export default function useFetchPlanets(page) {
  const [state, dispatch] = useReducer(reducer, {
    planets: [],
    count: 0,
    loading: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(page ? `${BASE_URL}/?page=${page}` : BASE_URL, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { planets: res.data.results, count: res.data.count },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [page]);

  return state;
}
