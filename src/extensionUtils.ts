type ScratchBlockArgument = {
    type: "string" | "number",
    defaultValue?: string | number
}

type ScratchBlock = {
    opcode: string
    blockType: "command" | "reporter" | "Boolean" | "hat",
    text: string,
    arguments?: {[key: string]: ScratchBlockArgument},
    filter?: any
}

type ScratchExtensionInfo = {
    id: string
    name: string,
    menuIconURI?: string,
    blockIconURI?: string,
    blocks?: ScratchBlock[]
}

interface ScratchExtension {
    runtime?: any;
    getInfo(): ScratchExtensionInfo;
}

interface Window {
    vm: {
        extensionManager: {
            runtime: any,
            _registerInternalExtension: (extension: ScratchExtension) => any,
            _loadedExtensions: Map<any, any>
        }
    }
}