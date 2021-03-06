import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '@quantumblack/kedro-ui/lib/components/dropdown';
import MenuOption from '@quantumblack/kedro-ui/lib/components/menu-option';
import { updateActivePipeline } from '../../actions';
import './pipeline-list.css';

/**
 * A Dropdown displaying a list of selectable pipelines
 * @param {Object} pipeline Pipeline IDs, names, and active pipeline
 * @param {Function} onUpdateActivePipeline Handle updating the active pipeline
 * @param {string} theme Kedro UI light/dark theme
 */
export const PipelineList = ({ onUpdateActivePipeline, pipeline, theme }) => {
  if (!pipeline.ids.length) {
    return null;
  }
  return (
    <div className="pipeline-list">
      <Dropdown
        theme={theme}
        width={null}
        onChanged={onUpdateActivePipeline}
        defaultText={pipeline.name[pipeline.active]}>
        {pipeline.ids.map(id => (
          <MenuOption
            key={`pipeline-${id}`}
            value={id}
            primaryText={pipeline.name[id]}
          />
        ))}
      </Dropdown>
    </div>
  );
};

export const mapStateToProps = state => ({
  pipeline: state.pipeline,
  theme: state.theme
});

export const mapDispatchToProps = dispatch => ({
  onUpdateActivePipeline: event => {
    dispatch(updateActivePipeline(event.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PipelineList);
