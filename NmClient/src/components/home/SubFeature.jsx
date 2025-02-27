import React from "react";
import Note from "../SubFeatureWindow/Note";

export default class SubFeature extends React.Component {
  state = {
    status: "NONE",
    windows: []
  }

  componentDidUpdate(prevProps) {
    if (this.props.metadata.length != 0 & this.state.status == "NONE") {
      this.setState({status: "OPEN"});
    }
  }

  render() {
    if (this.state.status == "NONE") {
      return (
          <SubFeatureMenu>
            <SubFeatureMenuItems>Note</SubFeatureMenuItems>
            <SubFeatureMenuItems>AI</SubFeatureMenuItems>
          </SubFeatureMenu>
      )
    }
    if (this.state.status == "CLOSE" & this.props.metadata.length != 0) {
      return (
        <div class="position-absolute my-2" style={{top: "0", right: "20px"}}>
          <button onClick={()=>this.setState({status: "OPEN"})} class="px-3 py-1 btn btn-light">{"<"}</button>
        </div>
      );
    }
    else if (this.state.status == "OPEN")
      return (
        <div class="sub-feature d-flex flex-column">
          <div onClick={()=>this.setState({status: "CLOSE"})} class="m-1"><button class="px-3 py-1 btn btn-light">{">"}</button></div>
          <SubFeatureWindowManager {...this.props}/>
        </div>
      );
    return null
  }
}

class SubFeatureMenu extends React.Component {
  render() {
    return (
      <div class="sub-feature-menu">
        {this.props.children}
      </div>
    );
  }
}

class SubFeatureMenuItems extends React.Component {
  render() {
    return (
      <div class="sub-feature-menu-item">
        {this.props.children}
      </div>
    );
  }
}

class SubFeatureWindowManager extends React.Component {
  state = {
    active_window: -1,
    windows: []
  }

  componentDidMount() {
    this.props.metadata.map((metadata) => {
      this.add_window(metadata.name, metadata.data);
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.metadata) != JSON.stringify(prevProps.metadata)) {
      this.setState({windows: []}, () => {
        this.props.metadata.map((metadata) => {
          this.add_window(metadata.name, metadata.data);
        })
      });
    }
  }

  add_window = (title, content) => {
    if (content.constructor === String) {
      if (title.toLowerCase().startsWith("note")) {
        this.setState({
          windows: this.state.windows.concat(<Note name={title} note={content} />), 
          active_window: this.state.windows.length
        });
      }
      else {
        this.setState({
          windows: this.state.windows.concat(<SubFeatureWindow name={title} content={content} />), 
          active_window: this.state.windows.length
        });
      }
    }
  }

  render() {
    return (
        <div class="sub-feature-window-manager">
          <div class="tag-bar">
            {this.state.windows.map((window, index) => {
              return (
                  <span class={"tag" + (index == this.state.active_window ? " active":"")} 
                  onClick={() => this.setState({active_window: index})}>
                    <span class="px-2">{window.props.name}</span>
                  </span>
              );
            })}
          </div>
          <div class="window-display p-2">
            {this.state.windows[this.state.active_window]}
          </div>
        </div>
    );
  }
}