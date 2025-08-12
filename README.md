# Take-Home Challenge: User Management Widget Implementation

## Implementation notes

This is my attempt at the requested implementation. Most of the important implementation details will be alongside the code itself where it makes sense, this introduction will serve as more of an explainer on my thought process during implementation.

After reading over this README and getting set up locally, I pulled up the docs for the widgets, Next.js, and WorkOS Node.js SDK and `workos/authkit-nextjs` repositories so I could have them handy.

Once I'd reviewed those docs and reconfirmed the challenge and evaluation criteria, I decided the scope. Specifically, I decided:

1. I would not be worrying about responsive design for this challenge
2. The organization page (where I would be adding the user management widget) should be available only to Admin's since there doesn't appear to be a "readonly" prop that would allow non-admin users to access the page.
3. Assuming implementation was as straightforward as it appeared, I would be replacing the "Account" page with the WorkOS widgets since they provided additional functionality, even though they removed visibility into the role and permission fields.

From there, the implementation process was extremely straightforward. So much so, in fact, that I burned some time triple checking that server components would count as "the backend" for the purposes of Task 3 since it seemed suspiciously simple.

Finally, for cleanup I decided to extract the workos client into a `_lib` directory for maintainability, prepended an underscore to the `components` directory to make it an [App Router private folder](https://nextjs.org/docs/app/getting-started/project-structure#private-folders), and extracted an error component to handle the edge case where the request to get a widget token might fail.

At that point, I decided I was over-engineering beyond the scope of the challenge and ended my time.

---

This is a Next.js application that demonstrates authentication with AuthKit and the WorkOS Node SDK. Your challenge is to implement the **User Management Widget** from WorkOS to allow users to manage team members within their organization.

## Challenge Overview

You will be implementing the [WorkOS User Management Widget](https://workos.com/docs/user-management/widgets/user-management) to provide a complete user management interface. This widget allows organization admins to:

- Invite new users to the organization
- Remove users from the organization
- Manage user roles and permissions
- View all organization members

## Prerequisites

Create a fork of this repository to use for this challenge.

You will need a [WorkOS account](https://dashboard.workos.com/signup) to complete this challenge.

## Setup Instructions

1. In the [WorkOS dashboard](https://dashboard.workos.com), head to the Redirects tab and create a [sign-in callback redirect](https://workos.com/docs/user-management/1-configure-your-project/configure-a-redirect-uri) for `http://localhost:3000/callback` and set the app homepage URL to `http://localhost:3000`.

2. After creating the redirect URI, navigate to the API keys tab and copy the _Client ID_ and the _Secret Key_. Rename the `.env.local.example` file to `.env.local` and supply your Client ID and API key as environment variables.

3. Additionally, create a cookie password as the private key used to encrypt the session cookie. Copy the output into the environment variable `WORKOS_COOKIE_PASSWORD`.

   It has to be at least 32 characters long. You can use <https://1password.com/password-generator/> to generate strong passwords.

4. Verify your `.env.local` file has the following variables filled.

   ```bash
   WORKOS_CLIENT_ID=<YOUR_CLIENT_ID>
   WORKOS_API_KEY=<YOUR_API_SECRET_KEY>
   WORKOS_COOKIE_PASSWORD=<YOUR_COOKIE_PASSWORD>

   NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback
   ```

5. Run the following command and navigate to [http://localhost:3000](http://localhost:3000).

   ```bash
   npm run dev
   ```

## Implementation

Use the [WorkOS documentation](https://workos.com/docs) as a guide for completing this challenge.

### Your Task

Implement the User Management Widget in this application. You'll need to:

1. Research and install the required dependencies for the WorkOS Widgets
2. Create a new page or component that implements the `UsersManagement` widget
3. Handle authentication properly - you'll need to generate a widget token on the backend
4. Ensure the widget integrates well with the existing application

### Submission

Deploy the finished application using Vercel and provide:

- The deployed application URL
- Login credentials to access the app
- Any additional setup instructions if needed

## Evaluation Criteria

Your implementation will be evaluated on:

- **Functionality**: The widget should work correctly for inviting, removing, and managing users
- **Integration**: Proper integration with the existing authentication flow
- **Code Quality**: Clean, well-structured, and maintainable code
- **User Experience**: Intuitive interface and proper error handling
- **Documentation**: Clear comments and any additional documentation you provide

## Bonus

- Implement additional widgets on top of the User Management widget

## Resources

- [WorkOS Widgets Documentation](https://workos.com/docs/user-management/widgets/user-management)
- [WorkOS User Management Guide](https://workos.com/docs/user-management)
- [Next.js Documentation](https://nextjs.org/docs)

Good luck with your implementation!
