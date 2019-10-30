export const RELOAD_REQUESTED = 'RELOAD_REQUESTED';
export const RELOAD_SUCCES = 'RELOAD_SUCCES';
export const RELOAD_FAILED = 'RELOAD_FAILED';

export const SET_CHART_DATA = 'SET_CHART_DATA';

export function relodRequested()
  {
  return {
    type: 'RELOAD_REQUESTED'
    };
  }

export function reloadSucces(data) 
  {
  return {
    type: 'RELOAD_SUCCES',
    payload: data
    };
  }

export function setChartData(data) 
  {
  return {
    type: 'SET_CHART_DATA',
    payload: data
    };
  }

export function reloadFailed(error) 
  {
  return {
    type: 'RELOAD_FAILED',
    payload: error
    };
  }