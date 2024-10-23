# Documentation

## Lazy loading

Components in the dashboard part of the application are lazy loaded. Loading component is displayed for the lazy loaded components.

## Authentication

### User roles

There are 3 supported user roles: `admin`, `seller` and `buyer`.

### Authentication forms

Register or Login form are used for authentication.

The password field has eye icon allowing to show the password.

The Register and Login form are only accessible if there is no logged in user. If there is logged in user and the auth forms url is opened, the user will be redirected to home page.

For both forms for screen size larger than medium a banner with image is displayed.

#### Register form

To register a new account you can use the Register form. `username`, `email` and `password` must be provided.

If invalid email is provided, you will receive error message and indication that the field is not correctly populated.

There is password validation requiring at least one uppercase, one lowercase, number and special char and password length of 8-30 chars.
There is also backend validation for incorrect password and notification message is displayed in case the validation happened on the backend.

By default users are registered as buyers. If the checkbox 'register as seller' is checked the user will register as seller. Users cannot register as admins, admin role is set on the backend.

If you already have an account, you can click the login link to switch to the Login form.

### Login form

If you have already registered account use the Login form. Email and password must be provided.

If you don't already have an account, you can click the register link to register new account.

If you forgot your password, you can click the Forgot password button. In the opened dialog, you must provide your email to receive the reset password link. You will get a notification if your email was sent successfully.

In case of invalid credentials, error notification will be displayed.

### Password reset form

The user can use the provided link to reset its password. The form has 2 fields for the new password and the confirm new password, if the provided passwords are matching the form will be submitted and the user will be redirected to the login form to login with the new password.

## Routing

### Protected routes

Dashboard pages are protected routes and cannot be accessed by not logged in users.

Some of the seller dashboard routes are protected based on the seller status, depending if the status is active and payment is paid.

## Navigation

There are 2 layouts: Shop and Dashboard layouts. Both layouts share a common Header. Each layout has its own Sidebar, which can be displayed for medium or smaller screens. The Shop sidebar is displayed above the Header and the Dashboard sidebar is displayed below the Header.

## Components

### 3-rd party components

The folder `src/components/ui` contains the Shadcn generated components.

## Styling

### z-index

The base is the Header component with z-index of 2000. The Shop Sidebar should be displayed above the Header (z-index 2001) and the Dashboard Sidebar should be displayed below the Header (z-index 1999). Consider using css variables or setting up Tailwind in a way so we don't have hardcoded z-index values.
