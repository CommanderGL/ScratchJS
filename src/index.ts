import SJSconsole, { insertConsoleElem, insertMenubarElem } from './console';
import { ScratchExtensionInfo, ScratchExtension, loadUnsandboxedExtension } from 'scratch-extension-utils';
import VM from 'scratch-vm';

class ScratchJS extends ScratchExtension {
    runtime?: VM.Runtime;

    constructor(runtime: VM.Runtime) {
        super();

        this.runtime = runtime;
        insertConsoleElem();
        insertMenubarElem();
        console.log("ScratchJS Initialized!");
    }

    getInfo(): ScratchExtensionInfo {
        return {
            id: "scratchjs",
            name: "ScratchJS",
            blocks: [
                {
                    opcode: "eval_cmd",
                    func: "eval",
                    blockType: "command",
                    text: "eval [code]",
                    arguments: {
                        code: {
                            type: "string",
                            defaultValue: "alert(\"Hello, World!\");"
                        }
                    }
                },
                {
                    opcode: "eval_rep",
                    func: "eval",
                    blockType: "reporter",
                    text: "eval [code]",
                    arguments: {
                        code: {
                            type: "string",
                            defaultValue: "alert(\"Hello, World!\");"
                        }
                    }
                },
                {
                    opcode: "fetch",
                    blockType: "reporter",
                    text: "fetch [url]",
                    arguments: {
                        url: {
                            type: "string",
                            defaultValue: "https://api.weather.gov/points/37.4268,-122.0806"
                        }
                    }
                },
                {
                    opcode: "alert",
                    blockType: "command",
                    text: "alert [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Hello, World!"
                        }
                    }
                },
                {
                    opcode: "log",
                    blockType: "command",
                    text: "console log [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Hello, World!"
                        }
                    }
                },
                {
                    opcode: "error",
                    blockType: "command",
                    text: "console error [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Scary Error!"
                        }
                    }
                },
                {
                    opcode: "warn",
                    blockType: "command",
                    text: "console warn [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Spooky Warning!"
                        }
                    }
                },
                {
                    opcode: "clear",
                    blockType: "command",
                    text: "clear console",
                }
            ]
        };
    }

    eval(args: { code: string }) {
        return JSON.stringify(eval(args.code));
    }

    async fetch(args: { url: string }) {
        return await fetch(args.url).then((res: Response) => res.text());
    }

    alert(args: { text: string }) {
        alert(args.text);
    }

    log(args: { text: string }) {
        SJSconsole.log(args.text);
    }

    error(args: { text: string }) {
        SJSconsole.error(args.text);
    }

    warn(args: { text: string }) {
        SJSconsole.warn(args.text);
    }

    clear() {
        SJSconsole.clear();
    }
}

class ScratchJSJSON extends ScratchExtension {
    runtime: VM.Runtime;

    constructor(runtime: VM.Runtime) {
        super();

        this.runtime = runtime;
        this.removeFromSidebar();
    }

    

    getInfo(): ScratchExtensionInfo {
        return {
            id: "scratchjsjson",
            name: "JSON",
            blocks: [
                {
                    opcode: "getKey",
                    blockType: "reporter",
                    text: "get key [key] from JSON [json]",
                    arguments: {
                        key: {
                            type: "string",
                            defaultValue: "apple"
                        },
                        json: {
                            type: "string",
                            defaultValue: "{ \"apple\": \"banana\" }"
                        }
                    }
                },
                {
                    opcode: "setKey",
                    blockType: "reporter",
                    text: "set key [key] from JSON [json] to [value]",
                    arguments: {
                        key: {
                            type: "string",
                            defaultValue: "apple"
                        },
                        json: {
                            type: "string",
                            defaultValue: "{ \"apple\": \"banana\" }"
                        },
                        value: {
                            type: "string",
                            defaultValue: "pear"
                        }
                    }
                }
            ]
        };
    }

    getKey(args: { key: string, json: string }) {
        return JSON.parse(args.json)[args.key] ? JSON.parse(args.json)[args.key] : ''; 
    }

    setKey(args: { key: string, json: string, value: string }) {
        const json = JSON.parse(args.json);
        json[args.key] = args.value;
        return JSON.stringify(json); 
    }
}

loadUnsandboxedExtension(ScratchJS);
loadUnsandboxedExtension(ScratchJSJSON);