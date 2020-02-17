export function returnSumOfEmptySeats(bookedSeats) {
  let emptySeats = 0;
  for (let seatRow in bookedSeats) {
    Object.values(bookedSeats[seatRow]).forEach(isBookedSeat => {
      if (!isBookedSeat) {
        emptySeats++
      }
    })
  }

  return emptySeats;
}

export function filterItemFromList(items, id) {
  return items.filter(filteredItem => {
    if (filteredItem.id === id) {
      return filteredItem
    }
  })[0];
}

export function includeItemsFromList(items1, items2) {
 return items1.filter(filteredItem => {
    if (items2.includes(filteredItem.id)) {
      return filteredItem
    }
  }); 
}