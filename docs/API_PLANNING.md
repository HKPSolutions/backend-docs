# API Planning
Lays out general structure for API as well as what methods are needed and their respective functionalities.

## Endpoints
- /users
    - /login
    - /create
    - /update

- /hotels
    - /search (searches for hotel from HIN)
    - /create (creates hotel - from company side)
    - /layout
        - /update (large update - can be used for reordering)
        - /floors (gets raw data no calculation)
        - /metrics (gets data with calculated metrics - rooms cleared...) questionable ^^^ screen 37
        - /floor
            - /rooms (gets rooms on floor)
            - /rooms-and-metrics (calculates metrics for floor) 
            - /create (creates a floor from room objects)
            - /update (updates floor object with data)
            - /room
                - /get

- /housekeepers
    - /clean
        - /start
        - /end
        - /report

    - /stats
        - /avg-room-rating
        - /lifetime-room-rating

- /front-desk
    - /check-in
    - /check-out
    - /report

- /cleaning-log
    - /query (takes in startTime, endTime, and maybe employee name)

- /update-log
    - /current
    - /resolve