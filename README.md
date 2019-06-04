# tugas-hari-raya - hackoverflow

Access the REST API via SERVER_URL = `http://api.hackoverflow.ramdhon.net`

## REST API Routes:

### WELCOME
- URL:
  - **`POST`** *`<SERVER_URL>/register`*
- Expected response (status: `201`):
  ```json
    {
      "message": "Welcome to Hackoverflow API :)"
    }
  ```

### AUTHENTICATION

- **Register**
  - URL:
    - **`POST`** *`<SERVER_URL>/register`*
  - Body:
    - `name`: `String`, required
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "message": "account registered",
        "newUser":
        {
          "_id": "<generatedId>",
          "name": "<registeredName>",
          "email": "<registeredEmail>",
          "password": "<hashedPassword>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<detailedErrors>"
      }
      ```
      Notes:
      - ERROR `400` is also Validation Error caused by entering *empty name* or *empty email* or *duplicated email* or *email not valid format* or *empty password*

- **Login**
  - URL:
    - **`POST`** *`<SERVER_URL>/login`*
  - Body:
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `200`):
    ```json
      {
        "message": "login success",
        "token": "<accessToken>",
        "user": "<user's name>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "invalid username / password"
      }
      ```

- **Decode Token**
  - URL:
    - **`GET`** *`<SERVER_URL>/user/decode`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "_id": "<id>",
        "name": "<name>",
        "email": "<email>",
        "iat": "<timeEncoded>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data

### QUESTIONS

- **GET LIST OF QUESTIONS**
  - URL:
    - **`GET`** *`<SERVER_URL>/questions`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/questions?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "questions": [
          {
            "_id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
            "tags": "[<tagObjectId-populated>]",
            "upvotes": "[<userObjectId>]",
            "downvotes": "[<userObjectId>]",
            "creator": "<userObjectId-populated>"
          }, 
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```

- **GET LIST OF AUTH USER'S QUESTIONS**
  - URL:
    - **`GET`** *`<SERVER_URL>/user/questions`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/user/questions?search=<KEYWORD>`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "questions": [
          {
            "_id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
            "tags": "[<tagObjectId-populated>]",
            "upvotes": "[<userObjectId>]",
            "downvotes": "[<userObjectId>]",
            "creator": "<userObjectId-populated>"
          },
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data

    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```
  
- **CREATE NEW QUESTION**
  - URL:
    - **`POST`** *`<SERVER_URL>/questions`*
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`
    - `tags`: `Array`
  - Expected response (status: `201`):
    ```json
      {
        "message": "data created",
        "newQuestion":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "tags": "[<tagObjectId-populated>]",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty title*
    
- **GET QUESTION BY ID**
  - URL:
    - **`GET`** *`<SERVER_URL>/questions/:id`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "question": 
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "tags": "[<tagObjectId-populated>]",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPDATE QUESTION BY ID**
  - Notes:
    - Authorization: only authenticated user's article can be accessed
  - URL(s):
    - **`PUT`** *`<SERVER_URL>/questions/:id`*
    - **`PATCH`** *`<SERVER_URL>/questions/:id`*
    <br>Notes:
        - `PUT` method is used for updating all details of data
        - `PATCH` method is used for updating some details of data
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`
    - `tags`: `Array`
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedQuestion":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "tags": "[<tagObjectId-populated>]",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "creator": "<userObjectId-populated>"
        },
        "info": "<info-optional>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty title*
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPVOTE / DOWNVOTE A QUESTION BY ID**
  - URL:
    - **`PATCH`** *`<SERVER_URL>/questions/:id?<query>`*
  - Header(s):
    - `token`: `String`
  - Query:
    - `upvote`: `1 or 0`,
    - `downvote`: `1 or 0`,
    Notes:
    - `1` for *upvote* or *downvote*
    - `0` for *undo upvote* or *undo downvote*
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedQuestion":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "tags": "[<tagObjectId-populated>]",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "creator": "<userObjectId-populated>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data

- **DELETE QUESTION BY ID**
  - Notes:
    - Authorization: only authenticated user's article can be accessed
  - URL(s):
    - **`DELETE`** *`<SERVER_URL>/questions/:id`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data deleted",
        "deletedQuestion":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "tags": "[<tagObjectId-populated>]",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **GET LIST OF TAGS**
  - URL:
    - **`GET`** *`<SERVER_URL>/tags`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/tags?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "tags": [
          {
            "_id": "<id>",
            "title": "<title>",
            "created": "<createdAt>"
          }, 
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```

### ANSWERS

- **GET LIST OF ANSWERS**
  - URL:
    - **`GET`** *`<SERVER_URL>/answers`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/answers?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "answers": [
          {
            "_id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
            "upvotes": "[<userObjectId>]",
            "downvotes": "[<userObjectId>]",
            "questionId": "<questionObjectId-populated>",
            "creator": "<userObjectId-populated>"
          }, 
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```

- **GET LIST OF AUTH USER'S ANSWERS**
  - URL:
    - **`GET`** *`<SERVER_URL>/user/answers`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/user/answers?search=<KEYWORD>`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "answers": [
          {
            "_id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
            "upvotes": "[<userObjectId>]",
            "downvotes": "[<userObjectId>]",
            "questionId": "<questionObjectId-populated>",
            "creator": "<userObjectId-populated>"
          },
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data

    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```

- **GET LIST OF A QUESTION'S ANSWERS BY QUESTION ID**
  - URL:
    - **`GET`** *`<SERVER_URL>/questions/:id/answers`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/user/answers?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "answers": [
          {
            "_id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
            "upvotes": "[<userObjectId>]",
            "downvotes": "[<userObjectId>]",
            "questionId": "<questionObjectId-populated>",
            "creator": "<userObjectId-populated>"
          },
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data

    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```
  
- **CREATE NEW ANSWER**
  - URL:
    - **`POST`** *`<SERVER_URL>/answers`*
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`
    - `questionId`: `ObjectId`
  - Expected response (status: `201`):
    ```json
      {
        "message": "data created",
        "newAnswer":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "questionId": "<questionObjectId-populated>",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty title*
    
- **GET ANSWER BY ID**
  - URL:
    - **`GET`** *`<SERVER_URL>/answers/:id`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "answer": 
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "questionId": "<questionObjectId-populated>",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPDATE ANSWER BY ID**
  - Notes:
    - Authorization: only authenticated user's article can be accessed
  - URL(s):
    - **`PUT`** *`<SERVER_URL>/answers/:id`*
    - **`PATCH`** *`<SERVER_URL>/answers/:id`*
    <br>Notes:
        - `PUT` method is used for updating all details of data
        - `PATCH` method is used for updating some details of data
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`
    - `questionId`: `ObjectId`
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedAnswer":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "questionId": "<questionObjectId-populated>",
          "creator": "<userObjectId-populated>"
        },
        "info": "<info-optional>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty title*
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPVOTE / DOWNVOTE AN ANSWER BY ID**
  - URL:
    - **`PATCH`** *`<SERVER_URL>/answers/:id?<query>`*
  - Header(s):
    - `token`: `String`
  - Query:
    - `upvote`: `1 or 0`,
    - `downvote`: `1 or 0`,
    Notes:
    - `1` for *upvote* or *downvote*
    - `0` for *undo upvote* or *undo downvote*
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedAnswer":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "questionId": "<questionObjectId-populated>",
          "creator": "<userObjectId-populated>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data

- **DELETE ANSWER BY ID**
  - Notes:
    - Authorization: only authenticated user's article can be accessed
  - URL(s):
    - **`DELETE`** *`<SERVER_URL>/answers/:id`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data deleted",
        "deletedAnswer":
        {
          "_id": "<id>",
          "title": "<title>",
          "description": "<description>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
          "upvotes": "[<userObjectId>]",
          "downvotes": "[<userObjectId>]",
          "questionId": "<questionObjectId-populated>",
          "creator": "<userObjectId-populated>"
        },
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

### WATCHED TAGS

- **GET ALL USER WITH WATCHED TAGS**
  - URL:
    - **`GET`** *`<SERVER_URL>/watched`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "watched": [
          {
            "_id": "<id>",
            "tags": [
              "...",
              "...",
            ],
            "creator": "<userObjectId-populated>",
            "created": "<createdAt>",
            "updated": "<updatedAt>",
          },
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data empty"
        }
      ```

- **CREATE AUTHENTICATED USER WATCHED TAGS MANUALLY**
  - Notes:
    - It is unique created
  - URL:
    - **`POST`** *`<SERVER_URL>/watched`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `201`):
    ```json
      {
        "message": "account registered",
        "newWatched": {
          "_id": "<id>",
          "tags": [
            "...",
            "...",
          ],
          "creator": "<userObjectId-populated>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<detailedErrors>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *duplicated creator*

- **GET AUTHENTICATED USER WATCHED TAGS**
  - URL:
    - **`GET`** *`<SERVER_URL>/user/watched`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "watched": {
          "_id": "<id>",
          "tags": [
            "...",
            "...",
          ],
          "creator": "<userObjectId-populated>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data

    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPDATE AUTHENTICATED USER WATCHED TAGS**
  - URL:
    - **`PATCH`** *`<SERVER_URL>/user/watched`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedWatched": {
          "_id": "<id>",
          "tags": [
            "...",
            "...",
          ],
          "creator": "<userObjectId-populated>",
          "created": "<createdAt>",
          "updated": "<updatedAt>",
        },
        "info": "..."
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>"
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - not allowed to access
      - not recognized input data
