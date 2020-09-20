# tds-test

This is a RESTful API built to the requirements outlined here [Design Brief](https://github.com/foolishsailor/tds_test/blob/master/designNotes/Integrations%20Developer%20Remote%20Assessment.pdf)

## Installation

1. Clone repository:
   `git clone https://github.com/foolishsailor/tds_test.git`

2. Build Project:
   `npm install`

3. Install Oracle Libraries
   This project uses node-oracledb to interact with Oracle Databases and requires:

Oracle Client libraries (64-bit) must be available.

Follow the installation instructions:  
Windows Installation: https://oracle.github.io/node-oracledb/INSTALL.html#windowsinstallation  
MAC Installation: https://oracle.github.io/node-oracledb/INSTALL.html#-33-node-oracledb-installation-on-apple-macos  

## Usage

Start application
`npm start`

View Test Coverage
`npm run test:coverage`

API will be available on `http://localhost:8080/`

#### Notes on Authentication

A basic static authentication has been used for demonstration purposes using a fixed authentication stored in environment variables. This was done to simply illustrate authenticated routes without requiring a seperate database. This would never be done in production.

#### Credentials

##### username: admin

##### password: SuperSecretPassword

## API

All routes require basic authentication as detailed above and return a 401 Error when no authroization is received.
All routes return 404 if no records found

### Department
**department_object:**
```.js
  [
    {
      department_code: [,
      department_name
    }
  ]
```  

+ #### GET /department
##### Success Response
Status Code: 200  
Content: [ {department_object}, ]  

### Badges
**badge_object:**
```.js
  [
    {
      badge_number,
      badge_status,
      badge_expiry_date
    }
  ]
```  
+ #### GET /badges
##### Success Response
Status Code: 200  
Content: [ {badge_object}, ]  
  
+ #### GET /badges/active
Returns all badges with:  
```.js 
{
badge_status: "Active,
badge_expiry_date: Date < Current_Date
}
```  
##### Success Response
Status Code: **200**  
Content: **[ {badge_object}, ]**   

##### Error Response
Status Code: **404**  
Status Message: **No Records**  
  
+ #### GET /badges?badge_number=[badge_number]
Returns all badges with badge_number  
##### URL Query
badge_number=[integer]  

##### Success Response
Status Code: **200**  
Content: **[ {badge_object} ]**  

##### Error Response
Status Code: **404**  
Status Message: **No Records**    
    
Status Code: **422**  
Status Message: **UNPROCESSABLE ENTITY**
  
  
### Job Titles
**job_title_object:**
```.js
  [
    {
      job_title_code,
      job_title_name,
      department_name
    }
  ]
```  
+ #### GET /job_titles
##### Success Response
Status Code: **200**  
Content: **[ {job_title_object}, ]**  
  
##### Error Response
Status Code: **404**  
Status Message: **No Records**    
  
  
+ #### GET /job_titles/:department_name
##### Success Response
Status Code: **200**  
Content: **[ {job_title_object}, ]**  
  
##### Error Response
Status Code: **404**  
Status Message: **No Records**    
    
Status Code: **422**  
Status Message: **UNPROCESSABLE ENTITY**
    


### General Notes

1.  Not familiar with oracle - not sure if I have followed best practice for anything specific on connectivity.
2.  Environment variables were included in the Repo to keep things simple for testing purposes and can be found in the root
3.  Would normally either connect to test database or build and tear down db for testing but to keep things simple and since I am unfamiliar with oracle I choose to just connect to database. This presents some issues with testing in terms of creating data return values from queries to test error trapping etc.
4.  Becasue not creating db there is some fragility in tests with coded values for departments etc.

### Suggested improvement on API design:

**route:** /employees/active

**Requested criteria**: from design doc - "Return all employees who DO NOT have a leave_date set or have a leave_date set in the past"

**Translates to:** 'SELECT \* FROM Employee WHERE LEAVE_DATE IS NULL OR LEAVE_DATE < CURRENT_TIMESTAMP'

This would result in the following employees also being included as "active";

1.  Employees who have already left orginzation - leave date in past
2.  Employees who have start dates in the future, like new hires that have been entered in system but arent currently live

**Suggested criteria and query**

Assume an "active employee" is one who is curretnly working at said organization and therefore would have the following criteria met:

1. start date IS NOT NULL and before NOW
2. leave date null or after now

**Translates to:** 'SELECT \* FROM Employee WHERE (START_DATE IS NOT NULL AND START_DATE < CURRENT_TIMESTAMP) AND (LEAVE_DATE IS NULL OR LEAVE_DATE > CURRENT_TIMESTAMP)'

added example to:
**route:** /employees/active/suggested
`````
