import { AppAbility } from '../../../../casl/casl-ability.factory';
import { Action } from '../../../../casl/models/casl.actions';
import { IPolicyHandler } from '../../../../casl/models/casl.interfaces';
import { SearchResultDto } from '../../dtos/search-result.out.dto';

export class ReadSearchResultsPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, SearchResultDto);
  }
}
