import { useState, useRef, useEffect } from "react";

interface UseDragAndDropOptions<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  idField?: keyof T;
}

export function useDragAndDrop<T>({ 
  items, 
  onReorder, 
  idField = 'id' as keyof T 
}: UseDragAndDropOptions<T>) {
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [draggedOverItemId, setDraggedOverItemId] = useState<string | null>(null);
  const draggedNodeRef = useRef<HTMLElement | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLElement>, 
    item: T
  ) => {
    setDraggedItem(item);
    draggedNodeRef.current = e.currentTarget;
    
    // This is needed for Firefox
    e.dataTransfer.setData("text/plain", "");
    
    // Add a class for styling
    setTimeout(() => {
      if (draggedNodeRef.current) {
        draggedNodeRef.current.classList.add("dragging");
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItemId(null);
    
    // Remove styling class
    if (draggedNodeRef.current) {
      draggedNodeRef.current.classList.remove("dragging");
    }
    
    draggedNodeRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>, itemId: string) => {
    e.preventDefault();
    if (itemId !== String(draggedItem?.[idField])) {
      setDraggedOverItemId(itemId);
    }
  };

  const handleDragLeave = () => {
    setDraggedOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // Prevent drop on itself
    if (String(draggedItem[idField]) === targetId) return;
    
    const currentIndex = items.findIndex(item => String(item[idField]) === String(draggedItem[idField]));
    const targetIndex = items.findIndex(item => String(item[idField]) === targetId);
    
    if (currentIndex < 0 || targetIndex < 0) return;
    
    // Create a new array to avoid mutating the original
    const newItems = [...items];
    
    // Remove the dragged item
    const [removed] = newItems.splice(currentIndex, 1);
    
    // Insert at the new position
    newItems.splice(targetIndex, 0, removed);
    
    // Call the callback with new order
    onReorder(newItems);
    handleDragEnd();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (draggedNodeRef.current) {
        draggedNodeRef.current.classList.remove("dragging");
      }
    };
  }, []);

  return {
    draggedItem,
    draggedOverItemId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
}
