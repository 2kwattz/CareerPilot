# CareerPilot
#### Author :  Roshan Bhatia 
#### Instagram : @2kwattz
#### Hosted on : careerpilot.me (Expired)

CarrerPilot : NodeJs based integrated web portal with web scraping and APIs usage. Although still in construction,  It is an integrated platform for students and graduates to send educational information such as scholarships, job alerts, certifications and many more based on user’s preferences and skills on a single platform

Features of CareerPilot

1. Get Job alerts related to your particular preference directly by email or the application
2. Save time by exploring wide range of jobs, internships,scholarship or hackathon details details 
from different sources on a single platform
3. Get different types of course recommendations and suggestions related to your stream
4. Implementaion of CareerAdvice AI Chatbot to solve all of your queries
5. Search for Internships, Jobs, Certification courses, Scholarships from various different sources on a single platform with advanced filters
6. Planning to add chat messaging functionalities soon... 


Technical Specifications

1. Features fully functional login and registration system for students and graduates with validations
2. Using highest level of encryption 'Bycrypt' for storing and validating password
3. JWT Tokens with conjuction of cookies implemented for verification of the users
4. Added Extra layer of security using .DOTNEV 
6. Generalised pages like error 404 implemented incase user makes a typo mistake
7. Seprate login api created on /login route
8. User Authentication implemented ( Dashboard would only be visible if user is logged in) based on JWT and Cookies
9. Logout system for a single device implemented using Local cookie method
10. Successfully connected the application with the database for other pages such as feedback form, contact me form etc
11. Used several APIs for user's account such as city-state-country one for registration dropdown
12. Using Handelbars (HBS) for dynamic interaction and to prevent code redundency
13. Google Recapcha added to prevent spam (slight errors)
14. Domain will be registered (freenom) 
15. All the pages which are required are created and implemented as routes in server.js
16. Data scrapping for top MNCs completed (only space issues)
17. Few static pages such as careerAdvice 100% done
18. Internshala and Linkedin job scrapping works individually providing data such as job title, posting date, company and location
19. Nodemailer Functionality added in ContactUs form to create custom emails (test)
20. NewsAPI Integrated in Dashboard (Global API Now, Will switch to MNCs, IT Company news ones soon) using Dynamic templating
i.e The news will keep on updating with news title, description an Read More option
21. Scholarship Data sources added and can successfully scrap data from one source
22. Basic front end of scholarship page done with filters such as Education Level and State dropdown
23. Basic frontend of courses section done with course name and location. Currently one filter added (Online)
24. Reusable Async function created for scrapping courses data instead of each async function for individual sources (thus saving response time)
25. UI/UX Designs for pages on the way. Currently home page is being designed
26. Internships Backend Upgraded and Filters added. Data stored in seperate containers and can be filtered
according to the users choice
27. Certifications backend upgraded. Data can be scrapped from one source and arranged efficiently
28. Basic UI Improvised. Enhanced Home Page and Error 404 Page, Also added a static searchbox (need to improvise)
29. More functionalities added in Dashboard in a newly added custom side navbar
30. Footer added in all the pages
31. Authentication functionality added in Certification courses and Internship page (i.e user will only be able to search once it has logged in)
32. 50% Optimized for cloud. Required Directiories and code adjustments added
33. Logout from all devices added. (just like u see an option on netflix for same)
34. Job Search Portal Functional . 2 Scrapping Sources added
35. UserVerification schema created. More work later for user's email verification
36. About section added in UserProfile, Can show user's name, city, state, gender and interests & linked to Dashboard
37. Error Middlewares added for different error codes, corrisponding pages will show
38. Transporter for Email Verification created, initialized and verified
39. New google account with appropriate settings created for the same 
40. Custom headers object created to simulate user behavior while web scrapping
41. User Profile section created with About Information and Education Information
42. Sidebar panel added in Dashboard section 
43. Settings page created
44. Password changing functionality using Security question added successfully,
Password changing through email added 70%. 
45. Name changing functional added 
46. Email changing functionality added 50pr.
47. Added notification settings option to allow/disallow notifications 
48. Apply now button added to redirect user to the individual apply page of the internship
49. Added a popup box for View details section. Yet to fill
50. Error Middlewares added. for eg a custom error page for specific errors
51. Logout system for Single Session and All devices functionality added
52. User Profile Picture functionality added using Multer 
53. Static cover photo added, UI Improved
54. Modal Box for Internship and Job Portals for Redirect Link Added
55. Job Description for WWR Jobs scrapped for Modal Popup Box
56. Account Settings UI 20% Done
57. Stripend Based Search for Internship Portal 50% functional
58. Functionality to update and display User's profile picture added
59. Static Pages like Sitemap, Privacy policy added
60. Process of converting Old UI with the New One is ongoing 







Work to be done in future

1. Advanced filters needs to be added such as search by location,stipend and other advanced filters
2. Data scrapping of various datasets for a single category for eg: internships // Done!
3. Plans to make it an ecommerce website for selling courses as an additional functionality
4. Refining Login and Registration system schemas ( already done but slight upgrades) 
5. Creating a fully functional dashboard ( Dashboard concept implemented but no functionality implemented in it as of now)
6. Logout for a single device based on database token deletion yet to be implemented // Done
7. Dark/Light mode option in settings tab
8. To add a Sign in with google and facebook option

Why CareerPilot?

Every year more than 6 crore of Indian graduates from diverse background and with diversity in
education.Almost similar number of students enter into colleges for taking various education to help them in
seeking jobs. The aim is to create an integrated platform in order to send National and International Scholarships, Job Alerts, grants,
Training, Certifications and Course recommendations and similar works based on their preference

In existing system, not all educational resources such as scholarship details, hackathons, job alerts
are available  on a single portal, and this can have disadvantages for students as well as graduates
One of the main disadvantages of not keeping all scholarship details on a single portal is that it can
be time consuming and confusing for students to navigate multiple platforms. Students may have to
create accounts and profiles on multiple portals, which can be time-consuming and can lead to information overload.
Additionally, students may miss out on scholarship opportunities if they are not aware of all the available portals
and databases Another disadvantage is that the information on different portals may not be consistent or up-to-date.
Students may find conflicting information on different portals, which can be confusing and frustrating.
Additionally, portals may not always be updated with the latest scholarship opportunities, deadlines, and eligibility
criteria, which can lead to students missing out on valuable opportunities.

Code Analysis

Structure and Modularity: The code is structured into sections and modules, which is a good practice for code organization. 
It separates concerns by importing modules for different functionalities, defining routes, and initializing middleware. This modular approach enhances code readability 
and maintainability.

Use of Dependencies: The code imports several dependencies to handle various tasks such as web scraping, database operations, authentication, email sending, etc. 
Utilizing existing libraries and modules is generally considered a professional practice as it saves time and leverages the expertise of others.

Documentation: While the code lacks extensive comments, there are some comments explaining the purpose of certain sections or modules. However, more detailed comments
 describing the functionality, inputs, and outputs of functions would enhance the code's maintainability.

Code Reusability: The code uses middleware, routers, and separate modules for different tasks, promoting code reusability. This is a good practice as it allows for easier
 maintenance and encourages the use of modular components.

Error Handling: The code does not have extensive error handling. It could benefit from implementing try-catch blocks or error middleware to handle exceptions and provide
 appropriate error messages to users.

Security: The code includes some security-related features like password hashing using bcrypt and authentication using JWT. These features indicate a professional approach to security.

Scalability: The code does not provide explicit indications of scalability considerations. However, by using a framework like Express.js and separating concerns into modules,
 it lays a foundation that can be expanded upon to handle more complex and scalable applications.
