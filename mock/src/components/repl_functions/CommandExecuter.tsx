import { REPLFunction } from './REPLFunction';
import { load } from './commands/Load'
import {Printable} from '../utility/Printable'
import {PrintableString} from '../utility/PrintableString'

//IDEA: maybe we can 
export class CommandRegistry {
    private commands: Map<string, REPLFunction>;

    constructor() {
        this.commands = new Map<string, REPLFunction>();
        this.registerCommand("load", load);
    }

    // Method to register a new command
    public registerCommand(commandName: string, commandFunction: REPLFunction): void {
        this.commands.set(commandName, commandFunction);
    }

    // Method to execute a command
    public executeCommand(commandName: string, args: Array<string>): Printable<any> {
        const commandFunction = this.commands.get(commandName);
        if (commandFunction) {
            return commandFunction(args);
        } else {
            return new PrintableString("command not found");
        }
    }
}