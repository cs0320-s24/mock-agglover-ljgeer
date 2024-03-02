import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import { mock } from '../CommandExecuter';

export const search: REPLFunction = (args: string[]): PrintableString => {
    return mock.search(args);
}