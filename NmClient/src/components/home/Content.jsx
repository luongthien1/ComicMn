import React from 'react'
import { checkAllContent, checkLine } from '../AI/AIprompt'
import { RecommendText } from '../Hidden/Recommend'
import { SBBContext } from '../../Context/StateBottomBar'
import axios from 'axios'

export default class Content extends React.Component {
  ref = React.createRef()
  static contextType = SBBContext
  state = {
    changed: false,
    deletedList: [],
    checkData: null
  }

  saveFile = () => {
    console.log("save")
    window.electron.ipcRenderer.invoke('save-file', {
      path: 'resources/file/template.docx',
      new_path: ["/Truyện", this.props.comic, this.props.chapter + ' App.docx'].join('/'),
      data: this.ref.current.querySelector('.content-text').innerText.replace(/\n/g, '\n')
    })
    this.props.refresh()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comic !== this.props.comic || prevProps.chapter !== this.props.chapter) {
        this.ref.current?.scrollTo(0, 0)
        this.setState({ changed: false, deletedList: [], checkData: null })
        this.context.setState('loading')
        axios.post('https://localhost:44340/ai/check', { data: this.props.content }).then((response) => {
            const checkedRespone = JSON.parse(response.data.replace('```json\n', '').replace('```', ''))
            this.setState({ checkData: checkedRespone })
            console.log(checkedRespone)
        })
        this.context.setState('done')
    }
  }

  checkChange = () => {
    const changedContent = String(this.ref.current.querySelector('.content-text').innerText).trim()
    const originalContent = String(this.props.content).trim()
    const is_changed = changedContent != originalContent
    if (this.state.changed != is_changed) this.setState({ changed: is_changed })
  }

  deleteLine = (line) => {
    this.setState({ deletedList: [...this.state.deletedList, line] })
  }

  render() {
    return (
      <div class="content content-bg" ref={this.ref}>
        <div class="position-sticky content-bg top-0 p-1">
          <ContentActions changed={this.state.changed} actions={{ save: this.saveFile }} />
        </div>
        <div class="content-title text-center strong h3">{this.props.comic}</div>
        <div class="content-title text-center strong">{this.props.chapter}</div>
        <div class="px-4 content-text" contentEditable="true" spellCheck="false">
          <span style={{ whiteSpace: 'pre-wrap', wrap: 'hard' }}>
            {this.props.content
              ? this.props.content
                  .split('\n')
                  .map((text, i) =>
                    text && !this.state.deletedList.includes(i) ? (
                      <TextLine
                        {...{
                          recommends: this.state.checkData?.filter((item) => item.line_number == i+1)
                        }}
                        checkChange={this.checkChange}
                        text={text}
                        onEmpty={() => this.deleteLine(i)}
                      />
                    ) : null
                  )
              : null}
            <p class="intent-text"></p>
          </span>
          {/* <textarea class="content-textarea vh-100 w-100 bg-transparent" name="content" id="content" value={this.props.content} /> */}
        </div>
      </div>
    )
  }
}

class TextLine extends React.Component {
  state = {
    text: this.props.text,
    changed: false
  }
  ref = React.createRef()
  render() {
    return (
      <>
        {this.state.changed ? (
          <div class="changed-sig d-block w-1 position-absolute green-bg"></div>
        ) : null}
        <p
          ref={this.ref}
          class="intent-text pt-2"
          onKeyUp={(event) => {
            if (event.key == 'Enter') {
              const is_changed = this.state.text != event.target.innerText
              if (this.state.changed != is_changed) {
                this.setState({ changed: is_changed })
                this.props.checkChange()
                if (event.target.innerText != '') {
                  window.electron.ipcRenderer
                    .invoke('AI-generate', { prompt: checkLine(this.props.content) })
                    .then((response) => {
                      console.log(response)
                    })
                }
              }
            }
          }}
        >
          <span>{this.props.text}</span>
          {this.props.recommends?.length > 0 ? (
            <span class="border rounded-full bg-[antiquewhite]">
              <RecommendText
                content="?"
                recommend={
                  <div>
                    <div class="text-xs">{this.props.recommends[0].line_number}</div>
                    <hr />
                    <div>{this.props.recommends[0].line_errors}</div>
                    <hr />
                    <div
                      class="hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        this.ref.current.innerText = this.props.recommends[0].correct_text
                      }}
                    >
                      {this.props.recommends[0].correct_text}
                    </div>
                  </div>
                }
              />
            </span>
          ) : null}
        </p>
      </>
    )
  }
}

class ContentActions extends React.Component {
  render() {
    const btnSaveSetting = {
      class: 'btn btn-light',
      onClick: this.props.actions.save,
      // disabled: this.props.changed ? '' : 'disabled'
    }
    const btnSave = <button {...btnSaveSetting}>Save</button>
    return <div class="content-actions">{btnSave}</div>
  }
}
