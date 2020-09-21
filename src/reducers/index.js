import { combineReducers } from 'redux';
import layer from './layers';
import node from './nodes';
import tag from './tags';
import nodeType from './node-type';
import visible from './visible';
import pipeline from './pipeline';
import flags from './flags';
import graph from './graph';
import { UPDATE_ACTIVE_PIPELINE } from '../actions/pipelines';
import {
  RESET_DATA,
  TOGGLE_TEXT_LABELS,
  TOGGLE_THEME,
  UPDATE_CHART_SIZE,
  UPDATE_ZOOM,
  UPDATE_FONT_LOADED
} from '../actions';

/**
 * Create a generic reducer
 * @param {*} initialState Default state
 * @param {string} type Action type
 * @param {string} key Action payload key
 * @return {*} Updated state
 */
const createReducer = (initialState, type, key) => (
  state = initialState,
  action
) => {
  if (typeof key !== 'undefined' && action.type === type) {
    return action[key];
  }
  return state;
};

/**
 * Reset/update application-wide data
 * @param {Object} state Complete app state
 * @param {Object} action Redux action
 * @return {Object} Updated(?) state
 */
function resetDataReducer(state = {}, action) {
  if (action.type === RESET_DATA || action.type === UPDATE_ACTIVE_PIPELINE) {
    return Object.assign({}, state, action.data);
  }
  return state;
}

const combinedReducer = combineReducers({
  // These props have their own reducers in other files
  flags,
  graph,
  layer,
  node,
  nodeType,
  pipeline,
  tag,
  visible,
  // These props don't have any actions associated with them
  edge: createReducer({}),
  id: createReducer(null),
  // These props have very simple non-nested actions
  chartSize: createReducer({}, UPDATE_CHART_SIZE, 'chartSize'),
  zoom: createReducer({}, UPDATE_ZOOM, 'zoom'),
  fontLoaded: createReducer(false, UPDATE_FONT_LOADED, 'fontLoaded'),
  textLabels: createReducer(true, TOGGLE_TEXT_LABELS, 'textLabels'),
  theme: createReducer('dark', TOGGLE_THEME, 'theme')
});

const rootReducer = (state, action) =>
  resetDataReducer(combinedReducer(state, action), action);

export default rootReducer;
