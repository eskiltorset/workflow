import "jest-localstorage-mock";
import { login } from "../js/api/auth/login.js";
import { apiPath } from "../js/api/constants.js";

describe("login function", () => {
  global.fetch = jest.fn();

  afterEach(() => {
    global.fetch.mockRestore();
    localStorage.clear();
  });

  it("should fetch and store a token in browser storage", async () => {
    const email = "example.user@noroff.no";
    const password = "examplePwd";
    const fakeProfile = {
      email: "example.user@noroff.no",
      password: "examplePwd",
      accessToken: "exampleToken",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeProfile,
    });

    const result = await login(email, password);

    expect(result).toEqual(fakeProfile);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: expect.objectContaining({ "Content-Type": "application/json" }),
    });

    const storedToken = JSON.parse(localStorage.getItem("token"));
    expect(storedToken).toEqual("exampleToken");
  });
});
