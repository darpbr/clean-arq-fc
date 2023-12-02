import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {

    it("should create a factory with price", () => {

        const customer = ProductFactory.create("Product", 10);

        expect(customer.name).toBe("Product");
        
    });

});