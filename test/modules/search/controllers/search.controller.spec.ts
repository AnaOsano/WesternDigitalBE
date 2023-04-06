import { Test, TestingModule } from "@nestjs/testing";
import { SearchController } from "../../../../src/modules/search/controllers/search/search.controller";
import { SearchService } from "../../../../src/modules/search/services/search/search.service";

describe("SearchController", () => {
  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
