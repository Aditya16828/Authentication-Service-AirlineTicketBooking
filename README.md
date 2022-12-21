# Authentication and Authorization
- **Authentication**: It is a process using which we can uniquely identify users on our application. This process tells us about who the user is. The general signup, login, logout flow is used to authenticate a user.

- **Authorization**: Its is a process using which we can identify the capabilities of a user,i.e., what a user can do on our application.

## How to do Authentication??
- Mobile Number based Authentication. (OTP based, link-to-mobile, etc...)
- OmniAuth or OAuth. (login via gmail, fb, github, etc...)
- WebOTP.
- Token based Authentication. (Done from scratch in this project, otherwise PassportJS APIs can be used for it.)

## Token Based Authentication
- JWT -> Json Web Token
- To generate the JWT token, we actually use the client credentials.