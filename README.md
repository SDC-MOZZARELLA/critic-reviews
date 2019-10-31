# CRITIC_REVIEWS

## CRUD ROUTES

### Get all documents

>GET /api/cr_reviews/
Retrieves all documents.

### Get one document

>GET /api/cr_reviews/:id
Enter in an to fetch that document.  Ids are stored as numbers, not ObjectIDs.

### Post new document

>POST /api/cr_reviews
Document information must be stored in the request body.  An numerical id will be automatically added for each document, and an ObjectID will be added to each review.  Do not specify id when making a post request. Here is a sample entry:

 {
        "user_name": "Mikey",
        "user_photo": "https://hrr41-fec-img.s3-us-west-1.amazonaws.com/user_pics/13.png",
        "user_page": "https://www.google.com",
        "reviews": {
            "movie_name": "US",
            "review": "Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Volutpat sed cras ornare arcu. At erat pellentesque adipiscing commodo elit at. Nisi quis eleifend quam adipiscing vitae.",
            "rate": "4.6",
            "rank": "1",
            "publication": "Hiiit",
            "date_post": "Dec 4, 2018"
        },
        "__v": 0
    }


### Update document

>PUT /api/cr_reviews/:id

User must supply id of document to update.  New information must be stored in query parameters.  See example above for valid document keys you wish to update.

Example:
>/api/cr_reviews/300?user_name=Sarah
Assuming there is a document with id 300, the user_name field will be changed to Sarah.

### Delete document

>DELETE /api/cr_reviews/:id

Must be a valid id. Deletes one document at the specified id.