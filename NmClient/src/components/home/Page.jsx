import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import SubFeature from './SubFeature'
import StateBottomBar from '../State/StateBottomBar'
import { SBBContext } from '../../Context/StateBottomBar'

class Home extends React.Component {
  state = {
    content: null,
    comic: null,
    chapter: null,
    metadata: [],
    stateBottomBar: null,
    doRefresh: false
  }

  refresh = () => {
    this.setState({ doRefresh: !this.state.doRefresh })
  }

  render() {
    return (
      <SBBContext.Provider
        value={{
          state: this.state.stateBottomBar,
          setState: (data) => {
            this.setState({ stateBottomBar: data })
          }
        }}
      >
        <div class="container_box">
          <div class="d-flex flex-col flex-1 vh-100">
            <div class="d-flex flex-row flex-1 overflow-y-auto">
              <Sidebar
                path="D://Truyện"
                setContent={(comic, content, chapter) => {
                  this.setState({ content: content, comic: comic, chapter: chapter })
                }}
                doRefresh={this.state.doRefresh}
                refresh={this.refresh}
                setData={(metadata) => {
                  this.setState({ metadata: this.state.metadata.concat(metadata) })
                }}
              />
              <Content
                content={this.state.content}
                comic={this.state.comic}
                chapter={this.state.chapter}
                refresh={this.refresh}
              />
              <SubFeature
                metadata={this.state.metadata}
                setData={(metadata) => {
                  this.setState({ metadata: metadata })
                }}
              />
            </div>
            <div class="d-flex flex-row [flex:0 0 auto] bg-light">
              <StateBottomBar />
            </div>
          </div>
        </div>
      </SBBContext.Provider>
    )
  }
}

export default Home
