# blogBackend-withImages

Simple blog backend made by using express servers and node.js

Blog content/Images can be fetched  from mongoDatabse using the unique id


Postman is used for doing Get request and Fetching data

All Blog data/images are stored in the Mongoose Database

# How to Start
Type npm i to install all dependencies(In Terminal)
Enter your monngo Url in config.env for connecting to Database
Enter nodemon app.js to start the server(In Terminal)

# Find all Blogs
After the url type /find to get all Blogs

# Find Unique Blog
After the url type /finduni/:("valid id") to get a single Blog

# Create new Blogs
After the url type /create to create a New Blog 

Enter Valid keys such as {Bloghaeder,blogContent,imageUrl,relatedLinks(optional)}
Type this keys in the body(form-data) and the value in the value section
To send an image type imageUrl in key and chnage it to "File" then select the image You want to send

# Update Blog
After the url type /update/:("valid id") to update a blog
Enter the valid keys in the body(raw) to upadte their values

note: For updating the body must contain valid keys

# To UpDate the image
After the url type /updateimg/:("valid id") to update a Image
Enter the key (imageUrl) in the body (form-data) and select a new image You want to update

# Delete Blog
After the url type /delete/:("valid id") to delete a blog
