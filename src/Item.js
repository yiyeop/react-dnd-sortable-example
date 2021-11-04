import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPE = "card";

function Item({ data, index, move }) {
  const componentRef = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { index, id: data.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
    // end: (item) => {
    //   console.log(`${index} should move to ${item.index}`);
    // }
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item, monitor) => {
      if (!componentRef.current) {
        return null;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return null;

      const hoverBoundingRect = componentRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return null;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return null;
      }

      move(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid black",
        margin: "4px",
        display: "flex",
        background: "#fff",
        opacity: isDragging ? 0 : 1
      }}
      ref={(node) => preview(drop(node))}
    >
      <span
        style={{ marginRight: "40px" }}
        ref={(node) => {
          componentRef.current = node;
          drag(node);
        }}
      >
        here
      </span>
      {data.id}
    </div>
  );
}

export default Item;
