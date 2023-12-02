import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Integration test for update product usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should update a product name and price", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("Product", 10);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "Lapis",
      price: 50,
    };

    const output = {
      id: product.id,
      name: "Lapis",
      price: 50,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
