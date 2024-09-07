function fetchPatientDetails() {
    const abhaId = document.getElementById('abha-id').value;

    fetch(`/patient/${abhaId}`)
        .then(response => response.json())
        .then(patient => {
            if (patient.message) {
                alert(patient.message);
            } else {
                document.getElementById('patient-info').innerHTML = `
                    <p>Name: ${patient.name}</p>
                    <p>Age: ${patient.age}</p>
                    <p>ABHA ID: ${patient.abhaId}</p>
                    <button onclick="fetchDoctors()">Book Doctor</button>
                `;
            }
        })
        .catch(error => console.error('Error fetching patient:', error));
}

function fetchDoctors() {
    fetch('/doctors')
        .then(response => response.json())
        .then(doctors => {
            let doctorOptions = '';

            doctors.forEach(doctor => {
                doctorOptions += `
                    <div>
                        <p>${doctor.name} (${doctor.specialization})</p>
                        <button onclick="bookDoctor('${doctor._id}')">Book</button>
                    </div>
                `;
            });

            document.getElementById('doctor-options').innerHTML = doctorOptions;
            document.getElementById('doctor-options').style.display = 'block';
        })
        .catch(error => console.error('Error fetching doctors:', error));
}

function bookDoctor(doctorId) {
    const abhaId = document.getElementById('abha-id').value;

    fetch('/book-doctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ abhaId, doctorId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Booking successful! Your booking ID is ${data.bookingId}`);
            } else {
                alert('Booking failed!');
            }
        })
        .catch(error => console.error('Error booking doctor:', error));
}
