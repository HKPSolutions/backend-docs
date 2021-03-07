# API Planning
Lays out general structure for API as well as what methods are needed and their respective functionalities.

## Endpoints
**NOTE:** 
   1. `PUT` needs to provide all the fields, `PATCH` only required the modified fields
   2. filters needed for query string should be checked again with the related screens
   3. Authentication middleware for the routes? TBD

###
1. `/users`
   - `POST` (create user) **#2-9**
   - `GET ?employmentType=HKP&HIN=${HIN}` **#46**
   - `PATCH /:id` (update user profile) **#30, #51, #59**
   - `POST /login` **#1**
   - `POST /reset-password` (send a reset password mail)  **#65**  
   -> then maybe use `PATCH /users/:id` to update the password? How the email & verification works need further research

2. `/hotels`
   - `POST` (creates hotel - from company side) 

3. `/hotels/:id` (HIN is hotel_ID)
   - `GET` **#8, #6, #4** 
   - `GET /metrics (for all floors)` **#44 TBD**
   - `/floors`
      - `POST`  (creates a floor from room objects constructed on frontend) **#13, #14**
      - `GET` **#12, #18, #23**
      - `GET /metrics` **#37 TBD** 
   - `/floors/:id`
      - `GET` **#19, #24***
      - `PUT` (updates floor object with rooms data) **#15, #16**
      - `DELETE` **#13**
      - `GET /metrics` (calculates metrics for a floor) **#40 TBD**
      - `/rooms/:id`
        - `GET` **#62**
        - `PATCH` (modify the `occupiedBy` field for checkin, the `isDecommissioned` for decommission, `serviceStatus` for problem solved, `type` for editing room type) **#15, #41, #42, #43, #55**
        - `DELETE`

4. `/update-logs`
	- `POST` (HKP/FDR report issues with room) **#21, #28, #26, #27**
	- `GET ?isResolved=false&startTime=$start$endTime=$end&category=$issueCategory` **#38, #39, #40, #44**
	- `PATCH /:id` (mark a log as resolved) **#42**

1. `/cleaning-logs`
   - `POST /cleaning-logs` (start cleaning) **#20, #62**
   - `GET ?startTime=$start&endTime=$end&housekeeper=$HKP-user-id` **#20, #31, #32, #33, #56, #46**
   - `PATCH /:id` (end cleaning & rating) **#25**

2. `GET /paysheets?startTime=$start&endTime=$end` or `GET /cleaning-logs/generate-paysheets?startTime=$start&endTime=$end` **(use cleaning-logs to calculate payment for each HKP?)** **#56 TBD**

=====
## NOTES for helping frontend
1. For **#20** - ending a cleaning job: 
   - update `cleaning-logs` (`PATCH /cleaning-logs/:id` for the `endTime` field) 
   - update `room` (`PATCH /hotels/:id/floors/:id/rooms/:id` for the `underCleaning` and `lastCleanedTime` field)

2. For **#21, #28** reporting issues with a room: 
   - create `update-logs` (`POST /update-logs`)
   - update `room` (`PATCH /hotels/:id/floors/:id/rooms/:id` for the `serviceStatus` field depends on the problem type, i.e. `update-logs` `category` field) 
     - (1) Needs linens->Yellow rooms: `serviceStatus` become `housekeeper service`; 
     - (2) anything else -> Grey rooms: `serviceStatus` become `serious service`)

3. For **#33** getting housekeepers stats, there are two ways:
   - if the stats is stored in the users object of HKP, then there will be cron jobs to update it, and `avg-room-rating`/`total-room-cleared` could all be accessed by `GET /users/:hkp_id` (stored avg-room-rating) 
   - if the stats are not stored (before we implement the cron jobs), we can calculate the information from cleaning-logs, so frontend can `GET ?housekeeper=$HKP-user-id` to retrieve all the cleaning-logs for a HKP, and calculate the matrics **(we need to retrieve all the cleaning-logs for #33 anyway, so can just go for method2 for now)**

4. For **#25** checkout:
   - update `cleaning-logs`: `PATCH /cleaning-logs/:id` for the `rating`  
   **To get the `cleaning-logs-id` for this room, query all the non-rating cleaning-logs and match the hotel-id & floor-id & room-id** 
   - update rooms info: `PATCH /rooms/:id` for `occupiedBy` **(and maybe the `serviceStatus` should become `housekeeper service` for turnover? TBD)** 

5. For **#40, #44**:
   - `GET /hotels/:id/floors` or `GET /hotels/:id/floors/:id` for basic floor info
   - `GET /cleaning-logs?startTime=$start&endTime=$end` or `GET /cleaning-logs?startTime=$start&endTime=$end&floor=$floor_id` for `#rooms cleaned today`
   - `GET /update-logs?isResolved=false&startTime=$start` or `GET /update-logs?isResolved=false&startTime=$start&floor=$floor_id` for the room issues 
