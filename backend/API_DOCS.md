# SUTRA Backend API Documentation

Base URL: `http://localhost:5001`

## Authentication

### Register User
**Endpoint:** `POST /api/auth/register`

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword",
  "role": "patient"
}
```
*Roles: 'patient', 'doctor', 'staff', 'admin'*
**Note:** To create a patient, you must be logged in as an **'admin'**.

### Login User
**Endpoint:** `POST /api/auth/login`

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "secretpassword"
}
```

**Response:**
Returns a JSON object containing the user profile and a `token`. You need this token for protected routes.

---

## Patients (Protected)

### Register Patient (Admin Only)
**Endpoint:** `POST /api/patients`

**Header:**
`Authorization: Bearer <your_jwt_token>`

**Body (JSON):**
```json
{
  "name": "Jane Doe",
  "age": 30,
  "gender": "Female",
  "contact": "1234567890",
  "medicalHistory": "None"
}
```

### Get Patient
**Endpoint:** `GET /api/patients/:id`

## QR Code

### Validate QR
**Endpoint:** `POST /api/patients/validate-qr`
