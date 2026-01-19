# SUTRA Architecture & Data Flow

## System Overview

SUTRA is a Unified Healthcare Interface (UHI) prototype designed to digitize patient records and facilitate easy access via QR codes.

### Components

1.  **Backend (Node.js/Express + MongoDB)**
    *   **Role**: Central API server and database.
    *   **Port**: 5000
    *   **Responsibilities**:
        *   User Authentication (JWT).
        *   Patient Record Management.
        *   QR Code Validation.

2.  **Web App (Vue.js + Vite)**
    *   **Role**: Admin/Hospital Staff Interface.
    *   **Port**: 5173 (default Vite)
    *   **Features**:
        *   Staff Login.
        *   Patient Registration Form.
        *   Digital ID Card Generation (with QR).
        *   Print Layouts.

3.  **Mobile App (Flutter)**
    *   **Role**: Doctor/Staff/Patient Interface (Scanner).
    *   **Features**:
        *   Login.
        *   QR Code Scanner.
        *   Patient Details View (Role-based access).

## Data Flow

### 1. Patient Registration (Web)
1. Staff logs in to Web App.
2. Staff fills Patient Registration Form.
3. **POST /api/patients** request sent to Backend.
4. Backend creates Patient record + generates `uniqueId`.
5. Backend responds with Patient Data.
6. Web App generates QR Code containing `uniqueId`.

### 2. Patient Identification (Mobile)
1. Doctor/Staff logs in to Mobile App.
2. Opens Scan Screen.
3. Scans Patient's QR Code.
4. Extracted `uniqueId` is sent via **GET /api/patients/:id**.
5. Backend verifies ID and returns Patient Data.
6. Mobile App displays data:
    *   **Doctor**: Sees all data + Medical History.
    *   **Staff**: Sees basic info only.

## Architecture Diagram (Mermaid)

```mermaid
graph TD
    subgraph Client Side
        Web[Web Dashboard <br/> (Vue.js)]
        Mobile[Mobile App <br/> (Flutter)]
    end

    subgraph Server Side
        API[Backend API <br/> (Node/Express)]
        DB[(MongoDB)]
    end

    Web -- Register Patient --> API
    API -- Create Record --> DB
    Mobile -- Login/Auth --> API
    Mobile -- Scan QR (Get ID) --> API
    API -- Fetch Data --> DB
    DB -- Patient Data --> API
    API -- JSON Response --> Mobile
    API -- JSON Response --> Web
```
