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
   - `POST`
  	 - Creates hotel - from company side
  	 - Expected Payload:	 
		- {
   			 name,
   			 address
  		   }
  	 - Success: { status: true, "hotel": newHotel }
  	 - Error: false status, possibly 'Error: missing required input data'

		   
   - `GET ?HIN=${HIN}` 
  	 - Searches for hotel from HIN
   	- Success: { status: true, hotel }
   	- Error: false status, possibly 'missing HIN from the query string' OR 'Failed to get hotel by HIN'

3. `/hotels/:id`
   - `GET /hotels/:ID`
  	 - Success: { status: true, hotel }
  	 - Failure: false status, possibly 'missing ID from the path parameters' OR `Failed to get hotel by ID=${ID}` 
   - `/floors`
      - `POST /hotels/:hotel_ID/floors` 
     	 - Creates a floor from room objects constructed on frontend) 
     	 - Expected Payload:
     		 - 	{
			'floor_ID': "1F",
			 'rooms':
			 {
			    "101": {
			       'type': (king, double, suite, ADA)
			     },
			     ...
			 }
			 ...
		}
     	 - Success: { status: true, data: {"floor_ID": floor ID, "rooms": list of rooms on the floor} }
     	 - Error: false status, possibly 'Error: missing required input data' OR `Error: floor with ID=${floor_ID} already exists.`		
      - `GET /hotels/:hotel_ID/floors` 
        - Success: will return floors of the hotel
      	- Error: 'missing hotel_ID from the path parameters' OR `Failed to get floors by hotel_ID=${hotel_ID}` 
      - `GET /metrics` 
   - `/floors/:id`
      - `GET /hotels/:hotel_ID/floors/:floor_ID`
        - Success: { status:true, floor: appropriate floor name}
      	- Error: false status, possibly 'missing hotel_ID or floor_ID from the path parameters'  OR `Failed to get floors by hotel_ID=${hotel_ID} OR floor_ID=${floor_ID}`
      - `PUT` (updates floor object with rooms data) 
      - `DELETE`
      - `GET /metrics` (calculates metrics for a floor) 
      - `/rooms`
        - `GET` (gets rooms on floor) 
      - `/rooms/:id`
        - `GET` 
        - `PATCH` (modify the `occupiedBy` field for checkin, the `isDecommissioned` for decommission, `serviceStatus` for problem solved, `type` for editing room type) 
        - `DELETE`

4. `/update-logs`
	- `POST` (HKP/FDR report issues with room) 
	- `GET ?isResolved=false&startTime=$start$endTime=$end&category=$issueCategory` 
	- `PATCH /:id` (mark a log as resolved) 

5. `/cleaning-logs`
   - `POST /cleaning-logs` (start cleaning)
   - `GET ?startTime=$start&endTime=$end&housekeeper=$HKP-user-id` 
   - `PATCH /:id` (end cleaning & rating) 

6. `GET /paysheets?startTime=$start&endTime=$end` or `GET /cleaning-logs/generate-paysheets?startTime=$start&endTime=$end` **(use cleaning-logs to calculate payment for each HKP?)** **#56 TBD**


