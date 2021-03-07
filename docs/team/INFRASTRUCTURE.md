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


### Hotels
- employee user-id's list (all employees)
- hotel object id (for database side)
- hotel info
    - hotel identification number (HIN)
    - address
    - name

- floor layout - (array of floor objects (maps))
    - floor object:
        - floor-id 
        - array of room objects (maps)
        - room object:
            - room-id
            - room-name
            - isDecommissioned
            - isOccupied
            - cleanStatus (needs cleaning, current clean, finished cleaning)
            - serviceStatus (none needed, housekeeper service, serious service)
            - type (king, double, suite, ADA)
            - problemDescription (optional)

### Cleaning Logs
- houskeeper user-id
- startTime
- endTime
- status (inProgress, finished)
- rating

### Update Logs
- hotel object id
- time
- room-id
- message
- isResolved (false, true)
