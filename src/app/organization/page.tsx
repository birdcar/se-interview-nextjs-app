import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement, WorkOsWidgets } from "@workos-inc/widgets";

export default async function OrganizationPage() {
  const { accessToken: token, user, role, permissions } = await withAuth({ ensureSignedIn: true });

  return (
    <WorkOsWidgets>
      <UsersManagement authToken={token} />
    </WorkOsWidgets>
  );
}
