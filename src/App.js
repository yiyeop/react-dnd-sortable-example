import Item from "./Item";
import "./styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

const data = new Array(10).fill().map((_, i) => ({ id: i }));

export default function App() {
  const [list, setList] = useState(data);

  const move = (origin, change) => {
    console.log({ origin, change });
    setList((list) => {
      let changed = [...list];
      changed.splice(origin, 1, list[change]);
      changed.splice(change, 1, list[origin]);
      return changed;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {list.map((item, index) => (
          <Item data={item} index={index} key={item.id} move={move} />
        ))}
      </div>
    </DndProvider>
  );
}
