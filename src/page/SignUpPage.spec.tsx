import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import SignUpPage, {
  apiUrl,
  FormBodyProps,
  FormResponseProps,
} from "./SignUpPage";

describe("Sign up Page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });
    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });
    it("has passwordrepeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input).toBeInTheDocument();
    });
    it("username input has text type", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect((input as HTMLInputElement).type).toBe("text");
    });
    it("email input has email type", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("E-mail");
      expect((input as HTMLInputElement).type).toBe("email");
    });
    it("password input has password type", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect((input as HTMLInputElement).type).toBe("password");
    });
    it("password repeat input has password type", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect((input as HTMLInputElement).type).toBe("password");
    });
    it("has sign up button", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
    it("sign up button disable initalily", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });
  describe("Interactions", () => {
    it("enables the button when password and repeat password values are the same", () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      const button = screen.getByRole("button", { name: "Sign Up" });
      userEvent.type(passwordInput, "mock-password");
      userEvent.type(passwordRepeatInput, "mock-password");
    });
    it("send username, email and password to backend after clicking the button", async () => {
      let requestBody;
      const server = setupServer(
        rest.post<FormBodyProps, FormResponseProps>(apiUrl, (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200));
        })
      );
      server.listen();
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      const usernameInput = screen.getByLabelText("Username");
      const emailInput = screen.getByLabelText("E-mail");
      const button = screen.getByRole("button", { name: "Sign Up" });
      userEvent.type(usernameInput, "mock-username");
      userEvent.type(emailInput, "mock-email");
      userEvent.type(passwordInput, "mock-password");
      userEvent.type(passwordRepeatInput, "mock-password");
      userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      expect(requestBody).toEqual({
        username: "mock-username",
        email: "mock-email",
        password: "mock-password",
      });
      /** axios example */
      // const mockfn = jest.fn();
      // axios.post = mockfn;
      // userEvent.click(button);
      // const firstCallMockFunction = mockfn.mock.calls[0];
      // const body = firstCallMockFunction[1];
      // expect(body).toEqual({
      //   username: "mock-username",
      //   email: "mock-email",
      //   password: "mock-password",
      // });

      /** fetch example */
      // const mockfn = jest.fn();
      // window.fetch = mockfn;
      // userEvent.click(button);
      // const firstCallMockFunction = mockfn.mock.calls[0];
      // const body = firstCallMockFunction[1];
      // expect(body).toEqual({
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: "mock-username",
      //     email: "mock-email",
      //     password: "mock-password",
      //   }),
      // });
    });
  });
});
