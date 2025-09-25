# Wallets API Documentation

This document describes the API endpoints for managing wallets in the Neuro Wallet backend.

## Base URL
All endpoints are available under `/api/v1/wallets`.

Authentication is required for most endpoints using JWT tokens. Include the token in the `Authorization` header as `Bearer <token>`.

### 1. Create a New Wallet
**POST** `/`

Creates a new wallet for the authenticated user.

#### Request Headers
- `Authorization`: Bearer <token>

#### Request Body
```json
{
  "walletType": "STANDARD" | "SOCIAL",
  "metadata": {} // optional
}
```

#### Response
- **201 Created**: Wallet created successfully.
```json
{
  "success": true,
  "data": {
    "id": "wallet_id",
    "walletType": "STANDARD",
    "metadata": {}
  }
}
```
- **400 Bad Request**: Invalid input.
- **429 Too Many Requests**: Rate limit exceeded.

### 2. Get All User Wallets
**GET** `/`

Retrieves all wallets for the authenticated user.

#### Request Headers
- `Authorization`: Bearer <token>

#### Response
- **200 OK**: List of wallets.
```json
{
  "success": true,
  "data": [
    {
      "id": "wallet_id",
      "walletType": "STANDARD",
      "metadata": {}
    }
  ]
}
```
- **401 Unauthorized**: Invalid token.

### 3. Get Wallet by ID
**GET** `/:id`

Retrieves details of a specific wallet.

#### Path Parameters
- `id`: Wallet ID

#### Request Headers
- `Authorization`: Bearer <token>

#### Response
- **200 OK**: Wallet details.
```json
{
  "success": true,
  "data": {
    "id": "wallet_id",
    "walletType": "STANDARD",
    "metadata": {}
  }
}
```
- **404 Not Found**: Wallet not found.
- **401 Unauthorized**: Invalid token.

### 4. Update Wallet Metadata
**PUT** `/:id`

Updates metadata for a specific wallet.

#### Path Parameters
- `id`: Wallet ID

#### Request Headers
- `Authorization`: Bearer <token>

#### Request Body
```json
{
  "metadata": {}
}
```

#### Response
- **200 OK**: Updated wallet.
```json
{
  "success": true,
  "data": {
    "id": "wallet_id",
    "walletType": "STANDARD",
    "metadata": {}
  }
}
```
- **404 Not Found**: Wallet not found.
- **401 Unauthorized**: Invalid token.

### 5. Delete Wallet
**DELETE** `/:id`

Deletes a specific wallet.

#### Path Parameters
- `id`: Wallet ID

#### Request Headers
- `Authorization`: Bearer <token>

#### Response
- **204 No Content**: Wallet deleted.
- **404 Not Found**: Wallet not found.
- **401 Unauthorized**: Invalid token.

### 6. Create Social Wallet (Google)
**POST** `/social/google`

Creates a social wallet using Google provider.

#### Request Body
```json
{
  "provider": "GOOGLE",
  "providerId": "google_provider_id",
  "providerData": {
    "email": "user@example.com"
  }
}
```

#### Response
- **201 Created**: Social wallet created.
```json
{
  "success": true,
  "data": {
    "id": "wallet_id",
    "walletType": "SOCIAL",
    "provider": "GOOGLE"
  }
}
```
- **400 Bad Request**: Invalid input.
- **429 Too Many Requests**: Rate limit exceeded.

### 7. Create Social Wallet (Phone)
**POST** `/social/phone`

Creates a social wallet using phone provider.

#### Request Body
```json
{
  "provider": "PHONE",
  "providerId": "+1234567890",
  "providerData": {},
  "verificationCode": "123456" // optional
}
```

#### Response
- **201 Created**: Social wallet created.
```json
{
  "success": true,
  "data": {
    "id": "wallet_id",
    "walletType": "SOCIAL",
    "provider": "PHONE"
  }
}
```
- **400 Bad Request**: Invalid input.
- **429 Too Many Requests**: Rate limit exceeded.

## Example Usage (cURL)

### Create Wallet
```bash
curl -X POST http://localhost:3001/api/v1/wallets \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"walletType": "STANDARD"}'
```

### Get User Wallets
```bash
curl -X GET http://localhost:3001/api/v1/wallets \
  -H "Authorization: Bearer <token>"
```

For full API documentation, visit http://localhost:3001/api/v1.