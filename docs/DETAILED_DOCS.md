# Detailed Documentation
Lays out detailed descriptions for API and methods

## Endpoints
**NOTE:**
   1. `PUT` needs all fields, `PATCH` only requires the modified fields
   2. Filters needed for query string should be checked again with the related screens
   3. For information wihch endpoints correspond to which screens and to view notes for frontend, see the API planning doc

###
1. `/users`
   - `POST` (create user)
   - `GET ?employmentType=HKP` 
   - `PATCH /:id` (update user profile) 
   - `POST /login` 
   - `POST /reset-password` (send a reset password mail) 

2. `/hotels`
   - `POST` (creates hotel - from company side) 
   - `GET ?HIN=${HIN}` (searches for hotel from HIN) 

3. `/hotels/:id`
   - `GET` or `GET /metrics (for all floors)` 
   - `/floors`
      - `POST`  (creates a floor from room objects constructed on frontend) 
      - `GET` 
      - `GET /metrics` 
   - `/floors/:id`
      - `GET` 
      - `PUT` (updates floor object with rooms data) 
      - `DELETE`
      - `GET /metrics` (calculates metrics for a floor) 
      - `/rooms`
        - `GET` (gets rooms on floor) 
      - `/rooms/:id`
        - `GET` 
        - `PATCH` (modify the `occupiedBy` field for checkin, the `isDecommissioned` for decommission, `serviceStatus` for problem solved, `type` for editing room type) **#15, #41, #42, #43, #55**
        - `DELETE`

4. `/update-logs`
	- `POST` (HKP/FDR report issues with room) 
	- `GET ?isResolved=false&startTime=$start$endTime=$end&category=$issueCategory` 
	- `PATCH /:id` (mark a log as resolved) 

1. `/cleaning-logs`
   - `POST /cleaning-logs` (start cleaning)
   - `GET ?startTime=$start&endTime=$end&housekeeper=$HKP-user-id` 
   - `PATCH /:id` (end cleaning & rating) 

2. `GET /paysheets?startTime=$start&endTime=$end` or `GET /cleaning-logs/generate-paysheets?startTime=$start&endTime=$end` **(use cleaning-logs to calculate payment for each HKP?)** **#56 TBD**


