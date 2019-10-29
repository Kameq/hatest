export const RELOAD_REQUESTED = 'RELOAD_REQUESTED';
export const RELOAD_SUCCES = 'RELOAD_SUCCES';
export const RELOAD_FAILED = 'RELOAD_FAILED';

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

export function reloadFailed(error) 
  {
  return {
    type: 'RELOAD_FAILED',
    payload: error
    };
  }