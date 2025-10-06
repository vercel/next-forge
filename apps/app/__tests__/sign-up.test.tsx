import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../app/(unauthenticated)/sign-up/[[...sign-up]]/page";

test("Sign Up Page", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Create an account",
    })
  ).toBeDefined();
});
