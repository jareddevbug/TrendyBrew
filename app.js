function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const tableNumber = document.getElementById('tableNumber').value;
  const numberOfGuest = document.getElementById('numberOfGuest').value;
  const details = document.getElementById('details').value;
  const status = "Pending"
  const reservationData = {
    name,
    email,
    phone,
    date,
    time,
    tableNumber,
    numberOfGuest,
    details,
    status
  };
  // Send data to server for storage
  fetch('http://localhost:3000/submitReservation', { // Update the URL to match your server
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Reservation submitted successfully:', data);
      // Handle success as needed
    })
    .catch(error => {
      console.error('Error submitting reservation:', error);
      // Handle error as needed
    })
}
