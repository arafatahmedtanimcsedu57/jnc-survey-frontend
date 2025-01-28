import React, { Component } from "react";

import { Drawer } from "@mui/material";

import StepperFormPreview from "./form-preview/StepperFormPreview";
import { FormLayoutComponentsType } from "../../../types/FormTemplateTypes";

interface FormPreviewProps {
  screenType: string;
  showPreview: boolean;
  closePreviewDrawer: () => void;
  formLayoutComponents: FormLayoutComponentsType[];
}

interface FormPreviewStates {
  screenType: string;
}

class FormPreview extends Component<FormPreviewProps, FormPreviewStates> {
  constructor(props: FormPreviewProps) {
    super(props);
    this.state = {
      screenType: this.props.screenType || "mobile",
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick() {
    this.props.closePreviewDrawer();
  }

  render() {
    const { showPreview, formLayoutComponents } = this.props;

    return (
      <>
        <Drawer open={showPreview} anchor="right">
          <div
            style={{
              minWidth: "30vw",
              backgroundColor: "#f8f9fa",
              height: "100vh",
            }}
          >
            <div className="container">
              <div className="p-4">
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => this.handleCloseClick()}
                  ></button>
                </div>
                <StepperFormPreview
                  screenType={this.state.screenType}
                  formLayoutComponents={formLayoutComponents}
                />
              </div>
            </div>
          </div>
        </Drawer>
      </>
    );
  }
}

export default FormPreview;
