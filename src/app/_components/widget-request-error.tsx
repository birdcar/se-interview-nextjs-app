import { Heading, Text } from "@radix-ui/themes";

// A simple error to display in case the call to workos.widget.getToken fails
export function WidgetRequestError() {
  return (
    <>
      <Heading size="5" color="red">
        Error fetching data
      </Heading>
      <Text>
        An unknown error occurred. If the problem continues, contact the site
        owner.
      </Text>
    </>
  );
}
