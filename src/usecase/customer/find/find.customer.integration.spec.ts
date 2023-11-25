import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase",() => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer("123","John Wick");
        const address = new Address("Street",123,"71390000125","City")
        customer.changeAddress(address);

        await customerRepository.create(customer);

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
            }
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
        
    });

});

