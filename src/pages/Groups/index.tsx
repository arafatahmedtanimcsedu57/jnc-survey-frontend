import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllGroups } from "../../redux/entities/formBuilderEntity";

const Groups = () => {
  const dispatch = useAppDispatch();
  const allGroups = useAppSelector(
    (state) => state.entities.formBuilder.allGroups
  );

  useEffect(() => {
    dispatch(getAllGroups("GET ALL GROUPS"));
  }, []);

  console.log("groups:", allGroups);

  return (
    <div>
      <h1>This is Groups</h1>
    </div>
  );
};

export default Groups;
