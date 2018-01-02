import Terminal from "xterm";
import * as Chalk from "chalk";

(async () => {
    const term = new Terminal({cursorBlink: true, rows: 64});
    term.writeWithInterval = interval => text => new Promise(resolve => {
        let i = 0;
        const f = () => {
            if (i < text.length) {
                term.write(text[i++]);
                setTimeout(f, interval);
            } else
                resolve(text);
        };
        f();
    });
    const chalk = new Chalk.constructor({enabled: true, level: 2});

    term.open(document.body, true);
    term.element.classList["add"]("fullscreen");

    const f = term.writeWithInterval(128);
    await f(chalk.green("HELLO"));
    await f(" WORLD");
})();
