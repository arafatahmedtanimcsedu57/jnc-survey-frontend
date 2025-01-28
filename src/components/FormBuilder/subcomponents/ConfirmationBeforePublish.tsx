import React, { Component } from "react";
import ReactJson from "react-json-view";

import {
  FileType,
  FormLayoutComponentsType,
  TemplateType,
} from "../../../types/FormTemplateTypes";

interface ConfirmationBeforePublishPropsType {
  jsonData: any;
}

class ConfirmationBeforePublish extends Component<
  ConfirmationBeforePublishPropsType,
  any
> {
  constructor(props: ConfirmationBeforePublishPropsType) {
    super(props);
    this.state = {
      ...ConfirmationBeforePublish.defaultProps,
      src: JSON.parse(
        JSON.stringify({
          ...this.props.jsonData,
        }),
      ),
    };
  }

  static defaultProps = {
    theme: "monokai",
    src: null,
    collapsed: false,
    collapseStringsAfter: 15,
    onAdd: false,
    onEdit: false,
    onDelete: false,
    displayObjectSize: true,
    enableClipboard: true,
    indentWidth: 4,
    displayDataTypes: true,
    iconStyle: "triangle",
  };

  render() {
    const {
      src,
      collapseStringsAfter,
      onAdd,
      onEdit,
      onDelete,
      displayObjectSize,
      enableClipboard,
      theme,
      iconStyle,
      collapsed,
      indentWidth,
      displayDataTypes,
    } = this.state;

    const style = {
      padding: "10px",
      borderRadius: "3px",
      margin: "10px 0px",
    };

    return (
      <>
        <div>
          <div
            style={{
              minWidth: "30vw",
              backgroundColor: "#f8f9fa",
            }}
          >
            <ReactJson
              name={false}
              collapsed={collapsed}
              style={style}
              theme={theme}
              src={src}
              collapseStringsAfterLength={collapseStringsAfter}
              onEdit={
                onEdit ? (e) => this.setState({ src: e.updated_src }) : false
              }
              onDelete={
                onDelete ? (e) => this.setState({ src: e.updated_src }) : false
              }
              onAdd={
                onAdd ? (e) => this.setState({ src: e.updated_src }) : false
              }
              displayObjectSize={displayObjectSize}
              enableClipboard={enableClipboard}
              indentWidth={indentWidth}
              displayDataTypes={displayDataTypes}
              iconStyle={iconStyle}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ConfirmationBeforePublish;
