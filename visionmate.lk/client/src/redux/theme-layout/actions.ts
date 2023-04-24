const actions = {
  CHANGE_LAYOUT_MODE_BEGIN: 'CHANGE_LAYOUT_MODE_BEGIN',
  CHANGE_LAYOUT_MODE_SUCCESS: 'CHANGE_LAYOUT_MODE_SUCCESS',
  CHANGE_LAYOUT_MODE_ERR: 'CHANGE_LAYOUT_MODE_ERR',
  CHANGE_RTL_MODE_BEGIN: 'CHANGE_RTL_MODE_BEGIN',
  CHANGE_RTL_MODE_SUCCESS: 'CHANGE_RTL_MODE_SUCCESS',
  CHANGE_RTL_MODE_ERR: 'CHANGE_RTL_MODE_ERR',
  CHANGE_MENU_MODE_BEGIN: 'CHANGE_MENU_MODE_BEGIN',
  CHANGE_MENU_MODE_SUCCESS: 'CHANGE_MENU_MODE_SUCCESS',
  CHANGE_MENU_MODE_ERR: 'CHANGE_MENU_MODE_ERR',
  CHANGE_MAIN_CONTENT_BEGIN: 'CHANGE_MAIN_CONTENT_BEGIN',
  CHANGE_MAIN_CONTENT_SUCCESS: 'CHANGE_MAIN_CONTENT_SUCCESS',
  CHANGE_MAIN_CONTENT_ERR: 'CHANGE_MAIN_CONTENT_ERR',
  changeLayoutBegin: () => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_BEGIN,
    };
  },
  changeLayoutSuccess: (data: string) => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_SUCCESS,
      data,
    };
  },
  changeLayoutErr: (err: unknown) => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_ERR,
      err,
    };
  },
  changeRtlBegin: () => {
    return {
      type: actions.CHANGE_RTL_MODE_BEGIN,
    };
  },
  changeRtlSuccess: (data: boolean) => {
    return {
      type: actions.CHANGE_RTL_MODE_SUCCESS,
      data,
    };
  },
  changeRtlErr: (err: unknown) => {
    return {
      type: actions.CHANGE_RTL_MODE_ERR,
      err,
    };
  },
  changeMenuBegin: () => {
    return {
      type: actions.CHANGE_MENU_MODE_BEGIN,
    };
  },
  changeMenuSuccess: (data: boolean) => {
    return {
      type: actions.CHANGE_MENU_MODE_SUCCESS,
      data,
    };
  },
  changeMenuErr: (err: unknown) => {
    return {
      type: actions.CHANGE_MENU_MODE_ERR,
      err,
    };
  },
};

export default actions;
