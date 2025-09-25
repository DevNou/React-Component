import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const defaultTasks = [
  { id: "1", content: "Task 1" },
  { id: "2", content: "Task 2" },
  { id: "3", content: "Task 3" }
];

function SortableItem({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#eee",
    borderRadius: "5px",
    userSelect: "none"
  };
  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </li>
  );
}

export default function DragDropList() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(items));
  }, [items]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleReset = () => {
    setItems(defaultTasks);
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <ul style={{ padding: 0 }}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} content={item.content} />
          ))}
        </ul>
      </SortableContext>
      <button onClick={handleReset} style={{ marginTop: "10px", padding: "5px 10px" }}>
        Reset Tasks
      </button>
    </DndContext>
  );
}
