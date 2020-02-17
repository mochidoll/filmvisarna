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