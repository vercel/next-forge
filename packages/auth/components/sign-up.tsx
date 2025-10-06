import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export const SignUp = () => (
  <ClerkSignUp
    appearance={{
      elements: {
        header: "hidden",
      },
    }}
  />
);
