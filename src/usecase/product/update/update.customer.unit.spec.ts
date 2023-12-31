import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product", 10);

const input = {
  id: product.id,
  name: "Product",
  price: 30,
};

const mockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("Should update a product", async () => {
    const productRepository = mockRepository();

    const productUpdateUsecase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should trown an error when name is missing", async () => {
    const productRepository = mockRepository();
    const productUpdateUsecase = new UpdateProductUseCase(productRepository);

    input.name = "";

    await expect(productUpdateUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should trown an error when price is equal to zero", async () => {
    const productRepository = mockRepository();
    const productUpdateUsecase = new UpdateProductUseCase(productRepository);

    input.name = "Lapis";
    input.price = 0;

    await expect(productUpdateUsecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
