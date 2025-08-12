import { redirect } from "next/navigation";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement, WorkOsWidgets } from "@workos-inc/widgets";
import { WidgetRequestError } from "@/app/_components/widget-request-error";
import { workos } from "@/app/_lib/workos";

export default async function OrganizationPage() {
  // Gathers the user, role, and organization ID for the logged in
  // user from the Session.
  const { user, role, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  // Only admins have access to view the org management page (and the link
  // won't render for those without the role). On the off chance someone
  // guesses the path or clicks a link in Slack they shouldn't have access to,
  // redirect them to the account page.
  if (!organizationId || role !== "admin") {
    redirect("/account");
  }

  // Generate a stable auth token specifically for the WorkOsWidgets.
  //
  // This specific getToken requires the scopes to be passed.
  const widgetToken = await workos.widgets.getToken({
    userId: user.id,
    organizationId,
    scopes: ["widgets:users-table:manage"],
  });

  // Show an error page if there's a problem generating a widget token.
  if (!widgetToken) {
    return <WidgetRequestError />;
  }

  return (
    <WorkOsWidgets style={{ height: "100%" }}>
      <UsersManagement authToken={widgetToken} />
    </WorkOsWidgets>
  );
}
