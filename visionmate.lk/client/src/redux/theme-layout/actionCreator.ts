import { Dispatch } from '@reduxjs/toolkit';
import actions from './actions';

const {
  changeLayoutBegin,
  changeLayoutSuccess,
  changeLayoutErr,

  changeRtlBegin,
  changeRtlSuccess,
  changeRtlErr,

  changeMenuBegin,
  changeMenuSuccess,
  changeMenuErr,
} = actions;

const changeLayoutMode = (value: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeLayoutBegin());
      dispatch(changeLayoutSuccess(value));
    } catch (err) {
      dispatch(changeLayoutErr(err));
    }
  };
};

const changeDirectionMode = (value: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeRtlBegin());
      dispatch(changeRtlSuccess(value));
    } catch (err) {
      dispatch(changeRtlErr(err));
    }
  };
};

const changeMenuMode = (value: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeMenuBegin());
      dispatch(changeMenuSuccess(value));
    } catch (err) {
      dispatch(changeMenuErr(err));
    }
  };
};

export { changeLayoutMode, changeDirectionMode, changeMenuMode };
