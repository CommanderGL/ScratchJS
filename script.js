class ScratchJS {
    constructor(runtime) {
      this.runtime = runtime
			
			this.tempElem = document.createElement("link")
			this.tempElem.rel = "stylesheet"
			this.tempElem.type = "text/css"
			this.tempElem.href = "https://scratchjs.crossscar.repl.co/styles.css"
			document.head.appendChild(this.tempElem)
			
			this.consoleElem = document.createElement("div")
			this.consoleElems = {}
			this.consoleElem.classList.add("ScratchJS-console")
			this.consoleElems.clearBtn = document.createElement("button")
			this.consoleElems.clearBtn.classList.add("ScratchJS-console-clear")
			this.consoleElems.clearBtn.innerHTML = "X"
			this.consoleElem.appendChild(this.consoleElems.clearBtn)
			document.querySelector(".stage-wrapper_stage-wrapper_2bejr").appendChild(this.consoleElem)

			this.consoleElems.clearBtn.addEventListener("click", () => {
				this.console.clear()
			})
    }

		getInfo() {			
				return {
					"id": "ScratchJS",
					"name": "JavaScript",
					"color1": "#11ae7f",
					"color2": "#11ae7f",
					"color3": "#11ae7f",
					"blocks": [
						{
							"opcode": "runEval",
							"blockType": "reporter",
							"text": "Eval [code]",
							"arguments": {
								"code": {
									"type": "string",
									"defaultValue": "alert('Hello, World!')"
								}
							}
						},
						{
							"opcode": "runEval",
							"blockType": "command",
							"text": "Eval [code]",
							"arguments": {
								"code": {
									"type": "string",
									"defaultValue": "alert('Hello, World!')"
								}
							}
						},
						{
							"opcode": "runAlert",
							"blockType": "command",
							"text": "Alert [txt]",
							"arguments": {
								"txt": {
									"type": "string",
									"defaultValue": "Hello, World!"
								}
							}
						},
						{
							"opcode": "setObj",
							"blockType": "command",
							"text": "Set Object: Name: [name] Value: [value]",
							"arguments": {
								"name": {
									"type": "string",
									"defaultValue": "New_Object",
								},
								"value": {
									"type": "string",
									"defaultValue": "{}"
								}
							}
						},
						{
							"opcode": "getObj",
							"blockType": "reporter",
							"text": "Get Object [name]",
							"arguments": {
								"name": {
									"type": "string",
									"defaultValue": "New_Object"
								}
							}
						},
						{
							"opcode": "getObjLength",
							"blockType": "reporter",
							"text": "Get Object Length [name]",
							"arguments": {
								"name": {
									"type": "string",
									"defaultValue": "New_Object"
								}
							}
						},
						{
							"opcode": "getObjKey",
							"blockType": "reporter",
							"text": "Get Object Key: Object: [name] Key: [key]",
							"arguments": {
								"key": {
									"type": "number",
									"defaultValue": "1"
								},
								"name": {
									"type": "string",
									"defaultValue": "New_Object"
								}
							}
						},
						{
							"opcode": "extObj",
							"blockType": "reporter",
							"text": "Extract Object Value: Name: [name] Key: [key]",
							"arguments": {
								"name": {
									"type": "string",
									"defaultValue": "New_Object"
								},
								"key": {
									"type": "string",
									"defaultValue": "apple"
								}
							}
						},
						{
							"opcode": "consoleLog",
							"blockType": "command",
							"text": "Write [txt] To Console",
							"arguments": {
								"txt": {
									"type": "string",
									"defaultValue": "Hello, World!"
								}
							}
						},
						{
							"opcode": "clearConsole",
							"blockType": "command",
							"text": "Clear Console",
						}
					]
				}
		}

		runEval({code}) {
			return eval(code);
		}

		runAlert({txt}) {
			alert(txt);
		}

		setObj({ name, value }) {
			eval(`this.${name}OBJ = ${value}`)
		}

		getObj({name}) {
			return eval(`JSON.stringify(this.${name}OBJ)`)
		}

		getObjLength({name}) {
			return eval(`Object.keys(this.${name}OBJ).length`)
		}

		getObjKey({ name, key }) {
			return eval(`Object.keys(this.${name}OBJ)[${key - 1}]`)
		}

		extObj({ name, key }) {
			return eval(`this.${name}OBJ.${key}`)
		}

		get console() {
			return {
				log: (txt) => {
					this.tempElem = document.createElement("div")
					this.tempElem.classList.add("ScratchJS-console-segment")
					this.tempElem.textContent = JSON.stringify(txt)
					this.consoleElem.appendChild(this.tempElem)
				},
				clear: () => {
					this.consoleElem.innerHTML = ""
					this.consoleElem.appendChild(this.consoleElems.clearBtn)
				}
			}
		}

		consoleLog({txt}) {
			this.console.log(txt)
		}

		clearConsole() {
			this.console.clear()
		}
}

(function() {
    var extensionInstance = new ScratchJS(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()