import React from "react";
export default class SubFeatureWindow extends React.Component {
    render() {
      return (
          <div class="sub-feature-window">
            <div>{this.props.content}</div>
          </div>
      );
    }
}