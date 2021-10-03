export const updateState = (state, payload) => {
  return {
    ...state,
    ...payload,
  };
};
