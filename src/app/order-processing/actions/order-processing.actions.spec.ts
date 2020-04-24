import * as fromOrderProcessing from "./order-processing.actions";

describe("loadOrderProcessings", () => {
  it("should return an action", () => {
    expect(fromOrderProcessing.fetchOrders().type).toBe(
      "[OrderProcessing] Fetch Orders"
    );
  });
});
