import { redirect } from "next/navigation";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { Heading, Flex } from "@radix-ui/themes";
import {
  WorkOsWidgets,
  UserProfile,
  UserSecurity,
  UserSessions,
} from "@workos-inc/widgets";
import { workos } from "../_lib/workos";
import { WidgetRequestError } from "../components/widget-request-error";

export default async function AccountPage() {
  const { user, organizationId, sessionId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    redirect("/");
  }

  const widgetToken = await workos.widgets.getToken({
    userId: user.id,
    organizationId,
  });

  if (!widgetToken) {
    return <WidgetRequestError />;
  }

  return (
    <WorkOsWidgets style={{ height: "100%", width: "100%" }}>
      <Flex gap="9" direction="column" maxWidth="940px" p="5">
        <Flex gap="3" direction="column">
          <Heading size="6">User profile</Heading>

          <UserProfile authToken={widgetToken} />
        </Flex>

        <Flex gap="3" direction="column">
          <Heading size="6">User sessions</Heading>

          <UserSessions authToken={widgetToken} currentSessionId={sessionId} />
        </Flex>

        <Flex gap="3" direction="column">
          <Heading size="6">User security</Heading>

          <UserSecurity authToken={widgetToken} />
        </Flex>
      </Flex>
    </WorkOsWidgets>
  );
}
