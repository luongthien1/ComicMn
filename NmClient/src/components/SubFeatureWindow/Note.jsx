import SubFeatureWindow from './Base.jsx';
export default class Note extends SubFeatureWindow {
    render() {
      return (
          <div class="sub-feature-window">
            <div style={{whiteSpace: "pre-wrap"}}>{this.props.note}</div>
          </div>
      );
    }
}