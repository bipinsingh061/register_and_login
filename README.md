# register_and_login

# Database used 
  MongoDB Atlas

# Register Api 
  takes username and password , hashes password using bcrypt and performs 
  save operation in  database , sends appropriate errors back
  
# Login Api 
  takes username and password , checks if a user exists , if not , sends 
  error message , is yes then confirms using bcrypt it compares hash of user's
  password against stored password in database
  
