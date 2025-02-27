import SubFeatureWindow from "./Base";

export default class ChatBot extends SubFeatureWindow {
    render() {
        return (
        <div class="sub-feature-window">
            <div style={{ whiteSpace: "pre-wrap" }}>{this.props.note}</div>
        </div>
        );
    }
}