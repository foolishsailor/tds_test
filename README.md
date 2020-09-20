# tds-test

This is a RESTful API built to the reuquirements outlined here [Design Brief](https://github.com/foolishsailor/tds_test/blob/master/designNotes/Integrations%20Developer%20Remote%20Assessment.pdf)

## Installation

Clone repository:
`git clone https://github.com/foolishsailor/tds_test.git`

Build Project:
`npm install`

This project uses node-oracledb to interact with Oracle Databases and requires:

Oracle Client libraries (64-bit) must be available.

Follow the installation instructions:
Windows Installation: https://oracle.github.io/node-oracledb/INSTALL.html#windowsinstallation
MAC Installation: https://oracle.github.io/node-oracledb/INSTALL.html#-33-node-oracledb-installation-on-apple-macos

## Usage

Start applilcation
`npm start`

View Test Coverage
`npm run test:coverage`

API will be available on `http://localhost:8080/`

### Notes on Authentication

A basic static authentication has been used for demonstration purposes using a fixed authentication stored in environment variables. This was done to simply illustrate authenticated routes without requiring a seperate database. This would never be done in production.

#### Credentials

username: admin
password: SuperSecretPassword

### Geneal Notes

1.  Environment vairables were included in the Repo to keep things simple for testing purposes and can be found in the root
