import { updateFavorite } from "./actions";

export const updateFavoriteThunk = (list) => (dispatch, _getState) => {
  const ordemList = list
    .sort((a, b) => a.starts - b.starts)
    .reverse()
    .filter(({ starts }) => starts !== 0);
  localStorage.setItem("favorites", JSON.stringify(ordemList));
  dispatch(updateFavorite(ordemList));
};
