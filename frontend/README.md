<center>
	<h1>Hospital Information System</h1>
	<img src="https://i.imgur.com/vtGiGZA.png">
	<h5>Software Engineering Academy<br>COMPFEST 2021</h5>
</center>

---

Made for Software Engineering Academy COMPFEST Selection Task, built with React, Chakra UI, Express, MongoDB.

## 📝 Requirement

### 🔑 Authentication

There are two types of account roles: Administrator and Patient.

1. [x] Users are only allowed to create account of role Patient. (create a super
       user account by default to act as an admin).
2. [x] Implement the usage of JWT in your authentication.
3. [x] An account must hold this information:
   - First Name
   - Last Name
   - Age
   - Email
   - Username
   - Password

### 🛡 Administrator Requirements

- [x] Administrator can create a new doctor appointment.
- [x] Doctor appointment must have this information:
  - Doctor name
  - Appointment Description
  - List of registrant
- [x] Administrator can update doctor appointments.
- [x] Administrator can delete doctor appointments.
- [x] Administrator can see a list of patients that are registered in each

### 👱‍♂️ Patient Requirements

- [x] Patients can see a list of appointments.
- [x] Patients can apply for an appointment.
- [x] Patients can cancel their appointment.
- [x] Patients cannot apply for an appointment with a fully booked registrant.
