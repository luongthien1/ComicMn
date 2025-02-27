import React from "react";

export class RecommendText extends React.Component {
  state = {
    content_hovered: false,
    recommend_hovered: false,
    recommend_display: false,
  }
  ref = React.createRef();

  render() {
    return (
    <div class="recommend d-inline-block relative text-center px-1 max-w-80 max-h-80" contentEditable="false" 
      onMouseEnter={()=>{this.setState({content_hovered: true, recommend_display: true}, ()=>{
        let content_text = document.getElementsByClassName("content-text")[0]
        let left = (this.ref.current.offsetParent.offsetLeft - content_text.offsetLeft)
        let width = this.ref.current.offsetWidth
        let gap = content_text.offsetWidth - (left + width) - 20
        if (gap <= 0) {
          this.ref.current.style.marginLeft = gap + "px"
        }
      })}}
      onMouseLeave={()=>{this.setState({content_hovered: false, recommend_display: false})}}>
      <div>{this.props.content}</div>
      <div ref={this.ref} class={this.state.recommend_display? " text-start p-2 smart-div bg-light border max-h-80 min-w-80":"d-none"}>{this.props.recommend}</div>
    </div>
    );
  }
}