
# Structure
This document details the services used in the infrastructure for the plugin version of the application.
## Services
### Cognito
Used just for authorization and authentication. This is not the main method of user data storage.
### DynamoDB
Used for all user data storage (except the password which is in Cognito).

## Tables
### Users
- Cognito user ID (to link with Cognito)
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
- **HIN or hotel id? (each user only belongs to one hotel? TBD)**
- **avg-room-rating (HKP only, TBD)** **#33, #57**
- **total-rooms-cleared (HKP only, TBD)** **#33, #57**
- **Average room clean time (HKP only, TBD)** **#57**

### Hotels
- manager user-id's list **(#8, #6, #4, how are we doing the user authentication? TBD)**
- hotel object id (for database side)
- hotel info
   - hotel identification number (HIN) -> index
   - address
   - name
- floor layout  
   - (array of floor objects (maps))
    - floor object: 
       - floor-id 
       - array of room objects (maps)  
        - room object:  
           - room-id  
           - room-name/number  
           - isDecommissioned: (default=false)
           - occupiedBy: guest_name (default=None) **#26**
           - ~~**cleanStatus (needs cleaning, current clean, finished cleaning)**~~
           - **lastCleanedTime: (default=None)**
           - **underCleaning: (default=false)**  
            **NOTE: finished cleaning status is valid for only 12 hours, see #20. So, instead of having `cleanStatus`, the cleanStatus should be derived from `lastCleanedTime` + `underCleaning:bool`, TBD**
           - serviceStatus (none needed, housekeeper service, serious service): (default=none needed)
           - type (king, double, suite, ADA): **(default=?? TBD)**
           - **rate (can be custom value #55b TBD)**  
              -> **Q: Stayover or Turnover depends on wether the room is occupied or not? should it be predefined?**
           - problemDescription (optional) **#41 #43**

### Cleaning Logs
- housekeeper: user-id
- startTime
- endTime
- status (inProgress, finished)
- hotel-id
- floor-id
- room-id **#31, #32**
- rating
- remarks **#32, #25**
- **Cleaning Type #62 TBD**
- **rate #32 TBD**

### Update Logs
- hotel object id
- startTime **#39**
- endTime **#39**
- hotel-id
- floor-id
- room-id
- createdBy (HKP or FDR id)
- creatorName (HKP or FDR name) **#42**
- guestName (from room object) **#26**  
--> this is not redundant because the guest info in a room object will change, but having the name here records the guest name when the issue happens. (This could be `guest_id` if we have a guests table in the future)
- category: string **#44**
- message (details)
- isResolved: bool

### Room Types #54 TBD
- id
- type name
- rate
