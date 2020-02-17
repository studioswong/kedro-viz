import { loadState } from './helpers';
import getRandomPipeline from '../utils/random-data';
import normalizeData from './normalize-data';
import loremIpsum from '../utils/data/lorem-ipsum.mock';
import animals from '../utils/data/animals.mock';
import demo from '../utils/data/demo.mock';

/**
 * Determine where data should be loaded from (i.e. async from JSON,
 * or randomly-generated, or directly via props), then retrieve & format it.
 * @param {string|Array} data Either raw data itself, or a string
 * @return {Object} Normalized data
 */
export const getPipelineData = data => {
  switch (data) {
    case 'random':
      // Use randomly-generated data
      return getRandomPipeline();
    case 'lorem':
      // Use data from the 'lorem-ipsum' test dataset
      return loremIpsum;
    case 'animals':
      // Use data from the 'animals' test dataset
      return animals;
    case 'demo':
      // Use data from the 'demo' test dataset
      return demo;
    case 'json':
      // Return empty state, as data will be loaded asynchronously later
      return null;
    case null:
    case undefined:
      throw new Error('No data was provided to App component via props');
    default:
      // Use data provided via component prop
      return data;
  }
};

/**
 * Configure the redux store's initial state
 * @param {Object}   pipelineData Formatted pipeline data
 * @param {Object}   props App component props
 */
const getInitialState = (props = {}) => {
  const pipelineData = normalizeData(getPipelineData(props.data));

  // Load properties from localStorage if defined, else use defaults
  const { textLabels = true, theme = 'dark', typeDisabled = {} } = loadState();

  const visible = Object.assign(
    { exportBtn: true, labelBtn: true, themeBtn: true },
    props.visible
  );

  return {
    ...pipelineData,
    chartSize: {},
    fontLoaded: false,
    textLabels,
    visible,
    theme: props.theme || theme,
    typeDisabled
  };
};

export default getInitialState;
