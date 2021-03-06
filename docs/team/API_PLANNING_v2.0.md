# API Planning

Lays out general structure for API as well as what methods are needed and their respective functionalities.

## Endpoints

1. `/users`
   - `GET ?employmentType=HKP` **#46**
   - `POST /login` **#1**
   - `POST /create`	=> `POST /users` **#2, #3**
   - `POST /update`	=> `PUT/PATCH /users/:id` **#30, #51, #59**
   - **What about Reset Password?** **#65**

2. `/hotels`
   - `/create` => `POST /hotels` (creates hotel - from company side) 
   - `/search` => `GET /hotels?HIN=${HIN}` (searches for hotel from HIN) **#8, #6, #4**

3. `/hotels/:id`
   - `/layout` => **do we need this layer?**
     - `GET /metrics (for all floors)` **#44**
     - `/floors`
         	- `/create` => `POST /floors`  (creates a floor from room objects) **#12**
         	- `GET`  (gets raw data no calculation)	 **#18, #23**
         	- `GET /metrics` (gets data with calculated metrics - rooms cleared...) questionable ^^^ **#37**
     - `/floors/:id`
           	- `/update` => `PUT/PATCH` (updates floor object with data) **#15**
           	- `/rooms-and-metrics` => `/metrics` (calculates metrics for a floor) **#40**
       - `/rooms`
           	- `POST` **#13**
           	- `GET ?filter1=${filter1}` (gets rooms on floor with query string) **#19, #24, #63?(search for all rooms or rooms on a floor?)**
       - `/rooms/:id`
         - `/get` => `GET	/rooms/:id` **#62**
         - `POST/PUT /rooms/:id` **#41 #43 #54 #55**

7. `/update-logs`
	- `GET ?startTime=$start$endTime=$end` **#38 #39**
	- `POST` **#21, #28, #26(Guest info?), #27**
	- `/current` => `GET ?isResolved=false&startTime=$now&endTime=none&issue=$issue` **#44?**
	- `/resolve` => `PATCH /:id` **#42**

6. `/cleaning-logs`
   - `/query` => `GET ?startTime=$start&endTime=$end&housekeeper=$HKP-user-id` 
   		(querystring: takes in startTime, endTime, and maybe employee name)
   		**#20, #31, #32, #56, #46**
   - `POST /cleaning-logs` **#20, #62**
   - `PATCH /cleaning-logs/:id` **#25**

8. `GET /paysheets?startTime=$start&endTime=$end` or `GET /cleaning-logs/generate-paysheets?` **(use cleaning-logs to calculate payment for each HKP?)** **#56**

=====
1. `/housekeepers`
   - `/clean`
       - `/start` => `POST /cleaning-logs`	**#62**
       - `/end`   => `PATCH /cleaning-logs`	**#20**
       - `/report` => `GET /cleaning-logs?startTime=$start&endTime=$end&housekeeper=$HKP-user-id` **#32**
   - `/stats`
       - `/avg-room-rating` => `GET /housekeepers/:id` (stored avg-room-rating) **#33**
       - `/lifetime-room-rating` => `GET /housekeepers/:id` (stored total-room-cleared) **#33**

2. `/front-desk`
   - `/check-in` => `PATCH /rooms/:id` (modify the `isOccupied` field)
   - `/check-out` => `PATCH /cleaning-logs/:id` (& `PATCH /rooms/:id`?) **#25**
   - `/report` => **not sure what's the corresponding function?**
