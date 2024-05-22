export const nextClick = (
  itemsRange,
  itemsToShowAtATime,
  totalItems,
  setItemsRange
) => {
  if (itemsRange.end + itemsToShowAtATime <= totalItems) {
    // minimum items
    setItemsRange((prev) => ({
      start: prev.start + itemsToShowAtATime,
      end: prev.end + itemsToShowAtATime,
    }));
  } else if (itemsRange.end < totalItems) {
    // we have less items than minimum
    setItemsRange((prev) => ({
      start: prev.end + 1,
      end: totalItems - 1, // total items is index based
    }));
  }
};
