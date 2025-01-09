import { test, expect } from "@playwright/test";

test.describe("Para Bank API Test - Find Transactions by Amount", () => {
  const accountId = 13566;
  const amount = 50;
  const timeout = 30000;
  const sessionId = "B0BFD5E519DD2A1DD0427624D6CB5A84";

  test("Search transactions by amount and validate response", async ({
    request,
  }) => {
    const response = await request.get(
      `/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}?timeout=${timeout}`,
      {
        headers: {
          Accept: "*/*",
          Cookie: `JSESSIONID=${sessionId}`,
        },
      }
    );
    // Validate the status code
    expect(response.status()).toBe(200);
    // Parse and validate the JSON response
    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);

    // Validate the first transaction object in the array
    const transaction = responseBody[0];
    expect(transaction).toHaveProperty("accountId", accountId);
    expect(transaction).toHaveProperty("amount", amount);
    expect(transaction).toHaveProperty("description", "Funds Transfer Sent");
    expect(transaction).toHaveProperty("type", "Debit");

    // Validate the date field (as a timestamp)
    expect(typeof transaction.date).toBe("number");
  });
});
