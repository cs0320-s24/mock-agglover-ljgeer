import '../styles/main.css';

interface REPLHistoryProps{
    history: string[];
    outputMode: string;
}

export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((line, index) => 
                props.outputMode === 'verbose' ? (
                <p key={index}>Command {index + 1}: {line}</p>
                ) : (
                <p key={index}>{line}</p>
                )
            )}
        </div>
    );
}