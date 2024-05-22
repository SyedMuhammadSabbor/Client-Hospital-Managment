export const prevClick = (itemsRange, itemsToShowAtATime, setItemsRange) => {
  if (itemsRange.start - itemsToShowAtATime >= 0) {
    if (itemsRange.start - itemsRange.end == 0) {
      // == 0
      setItemsRange((prev) => ({
        start: prev.start - itemsToShowAtATime,
        end: prev.end - 1,
      }));
    } else if (itemsRange.end - itemsRange.start > 0) {
      // >0
      setItemsRange((prev) => ({
        start: prev.start - itemsToShowAtATime,
        end: prev.start - 1,
      }));
    }
  }
};
