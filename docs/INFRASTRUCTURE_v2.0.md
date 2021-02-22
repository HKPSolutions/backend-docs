
# Structure
This document details the services used in the infrastructure for the plugin version of the application.
## Services
### Cognito
Used just for authorization and authentication. This is not the main method of user data storage.
### DynamoDB
Used for all user data storage (except the password which is in Cognito).
## Tables

### Users
- Cognito user ID (to link with Cognito) -
- username (no password)
- profile info (optional)
   - DOB
   - address ln 1
   - address ln 2
   - city
   - state
   - zip
   - first name
   - last name
   - email
   - phone
- employment type (HKP, FDR, MNG)
- startDate
- endDate
- **avg-room-rating (HKP only)		#33, #57**
- **total-rooms-cleared (HKP only) 		#33, #57**
- **Average room clean time (HKP only) 	#57**

### Hotels
- manager user-id's list #8, #6, #4
- hotel object id (for database side)
- hotel info
   - hotel identification number (HIN) -> index
   - address
   - name
- floor layout - (array of floor objects (maps))
   - floor object:
       - floor-id
- **#roomsNeedCleaning: number #18**
       - array of room objects (maps)
       - room object:
           - room-id
           - room-name
           - isDecommissioned
           - isOccupied => **occupiedBy: guest_name? #26**
           - cleanStatus (needs cleaning, current clean, finished cleaning)
           - serviceStatus (none needed, housekeeper service, serious service)
           - type (king, double, suite, ADA)
           - **rate #63 (or is it derived from type?)**
           - problemDescription (optional) #41 #43
### Cleaning Logs
- housekeeper: user-id
- startTime
- endTime
- status (inProgress, finished)
- rating
- **room-id 	#31, #32**
- **rate 	#32**
- **remarks 	#32, #25**
**Timing function? 	#20**
**Cleaning type? 	#62**

### Update Logs
- hotel object id
- **time**
- **startTime #39**
- **endTime	#39**
- room-id
- **createdBy (HKP or FDR id)**
- **guestName (from room object) #26**
- **category? #44**
- message/**details?**
- isResolved (false, true)
