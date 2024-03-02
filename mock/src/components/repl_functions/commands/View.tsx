import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import {mockedJson} from '../../../mock_json/mockedJson';
import { mock } from '../CommandExecuter';

export const view: REPLFunction = (args: string[]): PrintableString => {
    return mock.view(args);
}
