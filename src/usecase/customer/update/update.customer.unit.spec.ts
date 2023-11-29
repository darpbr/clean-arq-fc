import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John Wick",
  address: {
    street: "Street updated",
    number: 321,
    zip: "Zip updated",
    city: "City updated",
  },
};

const mockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("Should update a customer", async () => {
    const customerRepository = mockRepository();

    const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should trown an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerUpdateUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should trown an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository);

    input.name = "John Doe";
    input.address.street = "";

    await expect(customerUpdateUsecase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
