import { ApiModel } from '../../../../../models/api.model';

export namespace PrizesModel {

  export class PrizeDTO {
    id: number;
    name: string;
  }

  export class PrizesListDTO extends ApiModel.AbstractListResponseDTO<
    PrizeDTO
    > {
    data: PrizeDTO[];
  }
}
