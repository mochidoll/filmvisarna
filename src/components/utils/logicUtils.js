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

export function getItemFromStore(items, id) {
  return items.filter(filteredItem => {
    if (filteredItem.id === id) {
      return filteredItem
    }
  })[0];
}