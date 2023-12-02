import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Wick");
const address = new Address("Street", 123, "71390000125", "City");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer usecase", () => {
  it("Should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John Wick",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "71390000125",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not found a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});