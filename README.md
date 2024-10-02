# image-gallery

<img width="869" alt="Devices Mockup." src="/assets/preview/preview.png">

It fetches and displays images from Unsplash based on the user's search query. The random photo changes according to the subject of the query.

<img width="869" alt="Devices Mockup." src="/assets/preview/modal-preview.png">

User may get the image with a download button on hover to the thumbnail or open a modal window with additional image information after clicking on the thumbnail.

### Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### HTTP requests

Image search engine gets a single page of photo results for a query, retrieves a single random photo and the total number of downloads, views and likes of a single photo, and gets the overall Unsplash stats for the past 30 days.

~~~
GET /search/photos
GET /photos/random
GET /photos/:id/statistics
GET /stats/month
~~~

[Jump to Unsplash API documentation](https://unsplash.com/documentation)

### Error messages

Basic error template is used to indicate an API request failure.

<img width="869" alt="Devices Mockup." src="/assets/preview/error-preview.png">

Codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, etc.).
Codes in the 5xx range indicate an error with Unsplash’s servers.