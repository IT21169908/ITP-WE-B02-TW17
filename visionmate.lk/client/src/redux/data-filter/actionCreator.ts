import { Dispatch } from "@reduxjs/toolkit";
import actions from './actions';
import initState from '../../demo-data/data-table.json';

interface IStringIndex {
  [key: string]: any
}

const initialState: IStringIndex = initState;

const {
  dataTableReadBegin,
  dataTableReadSuccess,
  dataTableReadErr,
  filterWithSubmitBegin,
  filterWithSubmitSuccess,
  filterWithSubmitErr,
  dataLiveFilterBegin,
  dataLiveFilterSuccess,
  dataLiveFilterErr,
} = actions;

const tableReadData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(dataTableReadBegin());
      dispatch(dataTableReadSuccess(initialState));
    } catch (err) {
      dispatch(dataTableReadErr(err));
    }
  };
};

const filterWithSubmit = (id: string, status: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(filterWithSubmitBegin());
      setTimeout(() => {
        const data = initialState.filter((item: IStringIndex) => {
          return item.id.indexOf(id) >= 0 && item.status.toLowerCase().indexOf(status.toLowerCase()) >= 0;
        });
        dispatch(filterWithSubmitSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterWithSubmitErr(err));
    }
  };
};

const dataLiveFilter = (value: string, key: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(dataLiveFilterBegin());
      const data = initialState.filter((item: IStringIndex) => item[key].toLowerCase().startsWith(value.toLowerCase()));
      dispatch(dataLiveFilterSuccess(data));
    } catch (err) {
      dispatch(dataLiveFilterErr(err));
    }
  };
};

// const ticketUpdateData = (data: any) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(ticketReadBegin());
//       dispatch(ticketReadSuccess(data));
//     } catch (err) {
//       dispatch(ticketReadErr(err));
//     }
//   };
// };

// const ticketUpdateSearch = (value: string, key: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(ticketReadBegin());
//       const data = initialState.filter((item: IStringIndex) => item[key].startsWith(value));
//       dispatch(ticketReadSuccess(data));
//     } catch (err) {
//       dispatch(ticketReadErr(err));
//     }
//   };
// };

// const singlePageReade = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(filterSinglePageReadBegin());
//       const data = initialState.filter((item: IStringIndex) => parseInt(item.id) === parseInt(id));
//
//       dispatch(filterSinglePageReadSuccess(data));
//     } catch (err) {
//       dispatch(filterSinglePageReadErr(err));
//     }
//   };
// };

export { filterWithSubmit, tableReadData, dataLiveFilter };
