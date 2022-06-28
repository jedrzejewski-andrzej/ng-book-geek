import { ApiModel } from '../../../../../models/api.model';

export namespace CategoriesModel {

  export class CategoryDTO {
    id: number;
    name: string;
  }

  export class CategoriesListDTO extends ApiModel.AbstractListResponseDTO<
    CategoryDTO
    > {
    data: CategoryDTO[];
  }
}
