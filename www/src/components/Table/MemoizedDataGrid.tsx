import React from "react";

import "react-data-grid/dist/react-data-grid.css";
import DataGrid, { DataGridProps, DataGridHandle } from "react-data-grid";
import { DraggableHeader } from "react-data-grid-addons";

const { DraggableContainer } = DraggableHeader;

const MemoizedDataGrid = React.memo(
  function MemoizedDataGrid_({
    onHeaderDrop,
    ...props
  }: Omit<DataGridProps<any, "id">, "onHeaderDrop"> & {
    onHeaderDrop: (dragged: any, target: any) => void;
    ref?:
      | ((instance: DataGridHandle | null) => void)
      | React.RefObject<DataGridHandle>
      | null
      | undefined;
  }) {
    return (
      <DraggableContainer onHeaderDrop={onHeaderDrop}>
        <DataGrid {...props} />
      </DraggableContainer>
    );
  },
  (prevProps, newProps) => {
    const propsToCompare = [
      "columns",
      "rowGetter",
      "rowsCount",
      "rowHeight",
      "minWidth",
      "minHeight",
    ];
    for (let prop of propsToCompare)
      if (prevProps[prop] !== newProps[prop]) {
        console.log(prop);
        return false;
      }
    return true;
  }
);
// , (prevProps, nextProps));

export default MemoizedDataGrid;
