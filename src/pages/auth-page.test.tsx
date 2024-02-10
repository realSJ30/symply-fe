import { fireEvent, render, screen } from "@testing-library/react";
import AuthPage from "./auth-page";
import { vi } from "vitest";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
  }),
}));

describe("AuthPage Component", () => {
  it("renders auth page correctly", () => {
    render(<AuthPage />);

    const headerElement = screen.getByText(
      /Always Keep Track of your Schedule!/i
    );
    const signInBtn = screen.getByText(/Sign in/i);

    expect(headerElement).toBeVisible();
    expect(signInBtn).toBeVisible();
  });

  it("calls loginWithRedirect when Sign in button is clicked", () => {
    render(<AuthPage />);
    const handleRedirect = vi.fn();

    const signInButton = screen.getByText(/Sign in/i);
    signInButton.onclick = handleRedirect;

    fireEvent.click(signInButton);

    expect(handleRedirect).toHaveBeenCalledTimes(1);
  });
});
