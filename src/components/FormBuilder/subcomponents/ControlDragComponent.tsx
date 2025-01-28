import React, { FunctionComponent } from "react";
import { useDrag } from "react-dnd";
import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
} from "../../../types/FormTemplateTypes";
import ThreeDotsVertical from "../../../assets/svg/ThreeDotsVertical";
import Plus from "../../../assets/svg/Plus";

interface ControlDragComponentProps {
  handleItemAdded: (
    item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string,
  ) => void;
  item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType;
  formLayoutComponents: FormLayoutComponentsType[];
}

const ControlDragComponent: FunctionComponent<ControlDragComponentProps> = (
  props,
) => {
  const { item, handleItemAdded } = props;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: item.itemType,
      item: item,
      end: (
        item:
          | FormLayoutComponentChildrenType
          | FormLayoutComponentContainerType,
        monitor: any,
      ) => {
        const dropResult: FormLayoutComponentContainerType =
          monitor.getDropResult();
        if (item && dropResult) {
          if (item.itemType === "container") {
            handleItemAdded(item);
          } else if (item.itemType === "control") {
            handleItemAdded(item, dropResult.id);
          }
        }
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [props.formLayoutComponents],
  );

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity, cursor: "move" }} className="col-12">
      <div className="bg-white text-nowrap px-2 py-2 border w-10 h-100 d-flex align-items-center justify-content-between gap-2 rounded-3">
        <div className="d-flex align-items-center">
          <ThreeDotsVertical width="16" height="16" />
          <div className="fs-7">{item.displayText}</div>
        </div>
        <div className="bg-light p-2 rounded">
          <Plus width="16" height="16" />
        </div>
      </div>
    </div>
  );
};

export default ControlDragComponent;
