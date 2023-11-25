import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

    it("should create a factory", () => {
        
        const customer = CustomerFactory.create("John");

        expect(customer.name).toBe("John");
    });

    it("should create a factory with address", () => {

        const address = new Address("street 1",123,"13330-250","Sao Paulo");

        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.name).toBe("John");
        
    });

});