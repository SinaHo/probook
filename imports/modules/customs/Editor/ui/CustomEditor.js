import React from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    const html = this.props.defaultvalue ? this.props.defaultvalue : "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = { editorState };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });

    this.props.sendEditorValue(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          wrapperStyle={{ minHeight: 300, background: "white" }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
