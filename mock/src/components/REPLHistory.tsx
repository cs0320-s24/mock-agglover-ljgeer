import '../styles/main.css';
import { Printable } from './utility/Printable'

interface REPLHistoryProps{
    history: string[];
    outputMode: string;
    commandOutput: Printable<any>[];
}

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {props.history.map((line, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {props.outputMode === 'verbose' ? (
                    <div>
                        <p>Command: {line}</p>  
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Output: </span>
                            {props.commandOutput[index].print()}
                        </div>
                    </div>
                ) : (
                    <p>{props.commandOutput[index].print()}</p>
                )}
            </div>
            ))}
        </div>
    );
}