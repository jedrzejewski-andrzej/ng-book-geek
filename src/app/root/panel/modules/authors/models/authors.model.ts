import { ApiModel } from '../../../../../models/api.model';

export namespace AuthorsModel {

  export class AuthorDTO {
    id: number;
    name: string;
    lastname: string;
    birth_date: string;
  }

  export class AuthorsListDTO extends ApiModel.AbstractListResponseDTO<
    AuthorDTO
    > {
    data: AuthorDTO[];
  }
}
