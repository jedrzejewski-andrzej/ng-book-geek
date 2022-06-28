import { ApiModel } from '../../../../../models/api.model';
import {AuthorsModel} from "../../authors/models/authors.model";
import {CategoriesModel} from "../../categories/models/categories.model";

export namespace BooksModel {

  export class BookDTO {
    id: number;
    title: string;
    isbn: string;
    author: AuthorsModel.AuthorDTO;
    category: CategoriesModel.CategoryDTO;
  }

  export class BooksListDTO extends ApiModel.AbstractListResponseDTO<
    BookDTO
    > {
    data: BookDTO[];
  }
}
