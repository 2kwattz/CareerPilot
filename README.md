# CareerPilot

Author :  Roshan Bhatia 
Instagram : @2kwattz


CarrerPilot : NodeJs based integrated web portal with web scraping and APIs usage. Although still in construction,  It is an integrated platform for students and graduates to send educational information such as scholarships, job alerts, certifications and many more based on user’s preferences and skills on a single platform

Features of CareerPilot

1. Get Job alerts related to your particular preference directly by email or the application
2. Save time by exploring wide range of jobs, internships,scholarship or hackathon details details 
from different sources on a single platform
3. Get different types of course recommendations and suggestions related to your stream
4. Implementaion of CareerAdvice AI Chatbot to solve all of your queries
5. Search for Internships, Jobs, Certification courses, Scholarships from various different sources on a single platform with advanced filters 


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
 



Work to be done in future

1. Email confirmation system to verify user
2. Data scrapping of various datasets for a single category for eg: internships // Done!
3. Adding password recovery options
4. Refining Login and Registration system schemas ( already done but slight upgrades) 
5. Creating a fully functional dashboard ( Dashboard concept implemented but no functionality implemented in it as of now)
6. Logout for a single device based on database token deletion yet to be implemented
7. Logout from all devices yet to be implemented
8. To add a Sign in with google and facebook option
9. Plans to make it an ecommerce website for selling courses as an additional functionality
10. Settings tab for dashboard with help section containing Dark/Light mode, User profile etc
11. As of now only considerable HTML,CSS and Javascript is used to create a functional frontend, 
But it needs refinement like animations, sliding covers etc when backend is fully functional
12. Advanced filters needs to be added such as search by location,stipend and other advanced filters

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