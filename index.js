(async () => {
    const Terminal = require("xterm");
    const Chalk = require("chalk");

    const sleep = interval => new Promise(resolve => setTimeout(() => resolve(null), interval));
    const fire = src => new Promise(resolve => {
        const el = document.createElement("script");
        el.res = resolve;
        el.innerText = src + "\n;document.currentScript.res(null);delete document.currentScript.res;";
        document.body.appendChild(el);
    });

    window.term = new Terminal({cursorBlink: true, rows: 64});
    term.writeWithInterval = interval => async (text) => {
        for (let i = 0; i < text.length; ++i) {
            term.write(text[i]);
            await sleep(interval);
        }
    };
    term.open(document.body, true);
    term.element.classList["add"]("fullscreen");

    const chalk = new Chalk.constructor({enabled: true, level: 2});

    const f = term.writeWithInterval(128);
    await f(chalk.green("HELLO"));
    await f(" WORLD");
    await fire("term.writeWithInterval(128)('\\nAND YOU.');");
})();
