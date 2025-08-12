import { redirect } from "next/navigation";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { UsersManagement, WorkOsWidgets } from "@workos-inc/widgets";

export default async function OrganizationPage() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY, {
    clientId: process.env.WORKOS_CLIENT_ID,
  });

  const { user, role, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  // Only admins have access to view the org management page (and the link
  // won't render for those without the role). On the off chance someone
  // guesses the path, redirect them to the account page
  if (role !== "admin") {
    redirect("/account");
  }

  const widgetToken = await workos.widgets.getToken({
    userId: user?.id!,
    organizationId: organizationId!,
    scopes: ["widgets:users-table:manage"],
  });

  // Show an error page if there's a problem generating a widget token
  if (!widgetToken) {
    return <div>OH NO!</div>;
  }

  return (
    <WorkOsWidgets>
      <UsersManagement authToken={widgetToken} />
    </WorkOsWidgets>
  );
}
