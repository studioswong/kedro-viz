import { createSelector } from 'reselect';
import { arrayToObject } from '../utils';

const getNodeIDs = state => state.node.ids;
const getNodePipelines = state => state.node.pipelines;
const getActivePipeline = state => state.pipeline.active;
const getNodeTags = state => state.node.tags;

/**
 * Calculate whether nodes should be disabled based on their tags
 */
export const getNodeDisabledPipeline = createSelector(
  [getNodeIDs, getNodePipelines, getActivePipeline],
  (nodeIDs, nodePipelines, activePipeline) =>
    arrayToObject(nodeIDs, nodeID => {
      if (!activePipeline) {
        return false;
      }
      return !nodePipelines[nodeID][activePipeline];
    })
);

/**
 * Get a list of just the IDs for the active pipeline
 */
export const getPipelineNodeIDs = createSelector(
  [getNodeIDs, getNodeDisabledPipeline],
  (nodeIDs, nodeDisabledPipeline) =>
    nodeIDs.filter(nodeID => !nodeDisabledPipeline[nodeID])
);

/**
 * Get IDs of tags used in the current pipeline
 */
export const getPipelineTagIDs = createSelector(
  [getPipelineNodeIDs, getNodeTags],
  (nodeIDs, nodeTags) => {
    const visibleTags = {};
    nodeIDs.forEach(nodeID => {
      nodeTags[nodeID].forEach(tagID => {
        if (!visibleTags[tagID]) {
          visibleTags[tagID] = true;
        }
      });
    });
    return Object.keys(visibleTags);
  }
);
