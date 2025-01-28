import React from "react";
import { useDrop } from "react-dnd";

import ControlViewComponent from "./ControlViewComponent";

import {
  FormContainerList,
  FormItemTypes,
} from "../../../utils/formBuilderUtils";

import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
} from "../../../types/FormTemplateTypes";

import ThreeDotsVertical from "../../../assets/svg/ThreeDotsVertical";
import Trash from "../../../assets/svg/Trash";
import Plus from "../../../assets/svg/Plus";

interface DropContainerComponentProps {
  accept: string;
  name?: string;
  index?: number;
  handleItemAdded?: (
    item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string,
  ) => void;
  layout?: FormLayoutComponentChildrenType | FormLayoutComponentContainerType;
  selectedControl?:
    | null
    | FormLayoutComponentChildrenType
    | FormLayoutComponentContainerType;
  childrenComponents?: FormLayoutComponentChildrenType[];
  deleteContainer?: (containerId: string) => void;
  deleteControl?: (controlId: string, containerId: string) => void;
  selectControl?: (
    layout:
      | FormLayoutComponentChildrenType
      | FormLayoutComponentContainerType
      | undefined,
  ) => void;
  moveControl?: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string,
  ) => void;
}

const DropContainerComponent: React.FC<DropContainerComponentProps> = ({
  accept,
  layout,
  childrenComponents,
  deleteContainer,
  deleteControl,
  selectControl,
  selectedControl,
  handleItemAdded,
  moveControl,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: accept,
    drop: () => layout,
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor =
    accept && accept === FormItemTypes.CONTROL
      ? "rgba(255,255,255,1)"
      : "rgba(0,0,0,0.1)";
  let borderColor = "rgba(0,0,0,0.1)";
  const borderBase = "1px solid";
  let border;
  if (isActive) backgroundColor = "rgba(46,212,182,0.4)";
  else if (canDrop) backgroundColor = "rgba(255,178,15,0.7)";

  if (accept === FormItemTypes.CONTROL) border = borderBase + " " + borderColor;

  if (
    selectedControl &&
    selectedControl.itemType === layout?.itemType &&
    selectedControl.id === layout.id
  ) {
    borderColor = "rgb(255, 193, 7)";
    border = borderBase + " " + borderColor;
  }

  const handleDeleteContainer: React.MouseEventHandler<HTMLSpanElement> = (
    event,
  ) => {
    if (deleteContainer) deleteContainer(layout?.id as string);
    if (event.stopPropagation) event.stopPropagation();
  };

  return (
    <>
      <div
        className="mb-3"
        ref={drop}
        style={{ backgroundColor, borderRadius: "9px", border }}
      >
        {accept === FormItemTypes.CONTAINER ? (
          <>
            <div className="d-flex justify-content-center align-items-center py-4 px-5">
              <button
                type="button"
                className="btn btn-sm btn-outline-dark fw-medium px-5 text-nowrap"
                onClick={() => {
                  if (handleItemAdded) {
                    handleItemAdded({ ...FormContainerList[0] });
                  }
                }}
              >
                Add a Block
              </button>
            </div>
          </>
        ) : null}

        {accept === FormItemTypes.CONTROL ? (
          <>
            <div
              onClick={() => (selectControl ? selectControl(layout) : null)}
              className="d-flex gap-5 flex-wrap justify-content-between align-items-center p-4 border-bottom"
              style={{ cursor: "pointer" }}
            >
              <div>
                <h5>{(layout as FormLayoutComponentContainerType)?.heading}</h5>
                <p className="m-0">
                  {(layout as FormLayoutComponentContainerType)?.subHeading}
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="btn btn-danger btn-sm fw-medium"
                  onClick={handleDeleteContainer}
                >
                  <Trash width="16" height="16" />
                </button>

                <span
                  className="btn btn-sm btn-light"
                  style={{ cursor: "grab" }}
                >
                  <ThreeDotsVertical width="16" height="16" />
                </span>
              </div>
            </div>

            <div className="p-4">
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ minHeight: "20vh", position: "relative" }}
              >
                {childrenComponents?.length === 0 ? (
                  <>
                    <div className="bg-light px-5 fw-medium d-flex gap-2 align-items-center">
                      <Plus width="16" height="16" />
                      <span className="">Drop Field</span>
                    </div>
                  </>
                ) : (
                  <>
                    {childrenComponents?.map((component, ind) => {
                      return (
                        <ControlViewComponent
                          key={component.id}
                          item={component}
                          deleteControl={(controlId, containerId) =>
                            deleteControl
                              ? deleteControl(controlId, containerId)
                              : null
                          }
                          selectControl={(layout) =>
                            selectControl ? selectControl(layout) : null
                          }
                          selectedControl={selectedControl}
                          containerId={layout?.id as string}
                          index={ind}
                          moveControl={(
                            item,
                            dragIndex,
                            hoverIndex,
                            containerId,
                          ) => {
                            moveControl
                              ? moveControl(
                                  item,
                                  dragIndex,
                                  hoverIndex,
                                  containerId,
                                )
                              : null;
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default DropContainerComponent;
