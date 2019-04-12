# labyrinth-api

API
Auth: BasicAuth.
----
  PUSH /users/:username/:password
  
  Creates account to connect api
  ----
  GET /labyrinth/:id
  
  Returns the type of the block
  ----
  PUSH /labyrinth/:id/playfield/:x/:y/:type
  
  Sets the type of the block
  ----
  PUSH /labyrinth/:id/[start|end]/:x/:y
  
  Set the start/end of the labyrinth
  -----
  GET /labyrinth
  
  Returns an array of labyrinth ids
  ----
  PUSH /labyrinth
  
  Creates a new labyrinth, returns the labyrinth id
  -----
  GET /labyrinth/:id/solution
  
  Returns a solution for the labyrinth in the form [ direction, direction, ... ]
  ----
  
  # How to Run the API
  1. install docker and docker-compose
  2. hit `docker-compose up` command from commandline.
  3. API should be up and running in port `3000` in localhost.

