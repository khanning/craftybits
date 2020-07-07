function onLoad() {

    // Blockly.VerticalFlyout.prototype.DEFAULT_WIDTH = 280;

    const xmlBegin = '<xml id="video-toolbox" style="display: none">';
    const xmlEnd = '</xml>';
    const defaultToolbox = '<category name="Control" id="Control" colour="#FFAB19" secondaryColour="#CF8B17"> <block type="control_wait"> <value name="DURATION"> <shadow type="math_positive_number"> <field name="NUM">1</field> </shadow> </value> </block> <sep gap="36"></sep> <block type="control_repeat"> <value name="TIMES"> <shadow type="math_whole_number"> <field name="NUM">4</field> </shadow> </value> </block> <block type="control_forever"></block> <sep gap="36"></sep> <block type="control_wait_until"></block> <block type="control_repeat_until"></block> <sep gap="36"></sep> <block type="control_stop"/> </category><category name="Operators" id="operators" colour="#40BF4A" secondaryColour="#389438"><block type="operator_add"><value name="NUM1"><shadow type="math_number"><field name="NUM"/></shadow></value><value name="NUM2"><shadow type="math_number"><field name="NUM"/></shadow></value></block><block type="operator_subtract"><value name="NUM1"><shadow type="math_number"><field name="NUM"/></shadow></value><value name="NUM2"><shadow type="math_number"><field name="NUM"/></shadow></value></block><block type="operator_multiply"><value name="NUM1"><shadow type="math_number"><field name="NUM"/></shadow></value><value name="NUM2"><shadow type="math_number"><field name="NUM"/></shadow></value></block><block type="operator_divide"><value name="NUM1"><shadow type="math_number"><field name="NUM"/></shadow></value><value name="NUM2"><shadow type="math_number"><field name="NUM"/></shadow></value></block> <sep gap="36"></sep> <block type="operator_not"></block> <sep gap="36"></sep><block type="operator_random"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block> <sep gap="36"></sep><block type="operator_gt"><value name="OPERAND1"><shadow type="text"><field name="TEXT"/></shadow></value><value name="OPERAND2"><shadow type="text"><field name="TEXT">50</field></shadow></value></block><block type="operator_lt"><value name="OPERAND1"><shadow type="text"><field name="TEXT"/></shadow></value><value name="OPERAND2"><shadow type="text"><field name="TEXT">50</field></shadow></value></block><block type="operator_equals"><value name="OPERAND1"><shadow type="text"><field name="TEXT"/></shadow></value><value name="OPERAND2"><shadow type="text"><field name="TEXT">50</field></shadow></value></block> <sep gap="36"></sep> </category> <category name="%{BKY_CATEGORY_VARIABLES}" id="data" colour="#FF8C1A" secondaryColour="#DB6E00" custom="VARIABLE"></category>';

    var vm = new window.VirtualMachine();
    window.vm = vm;

    var blockEncoder = new BlockEncoder(vm.runtime, window.SYMBOLS, window.FIELD_SYMBOLS);
    window.blockEncoder = blockEncoder;

    var devList = {};
    // function startWSS() {
        // window.wss = new WebSocket('ws://192.168.1.126:8080');
        // window.wss.binaryType = 'arraybuffer';
        // window.wss.addEventListener('open', (event) => {
            // console.log('WSS Connected');
        // });
        // window.wss.addEventListener('message', (event) => {
            // const data = new Uint8Array(event.data);
            // const id = (data[1] << 24) | (data[2] << 16) | (data[3] << 8) | data[4];
            // if (devList[id]) return;
            // console.log('Found new device:', id);
            // devList[id] = {type: data[0]};
            // console.log(devList);
            // createNodeBlocks('light');
        // });
        // window.wss.addEventListener('close', (event) => {
            // setTimeout(startWSS, 2000);
        // });
    // }
    // startWSS();
    //
    document.getElementById('file-input').addEventListener('input', loadProject);

    window.usbConnected = false;
    var usbButton = document.getElementById('usb-connection');
    navigator.usb.ondisconnect = (dev) => {
        usbButton.classList.remove('connected');
        window.usbConnected = false;
    };
    usbButton.onclick = usbConnect;

    function usbConnect() {
        navigator.usb.requestDevice({ filters: [{
            vendorId: 0x1915, productId: 0x520F
        }]})
        .then((device) => {
            window.usbDevice = device;
            return window.usbDevice.open();
        })
        .then(() => window.usbDevice.selectConfiguration(1))
        .then(() => window.usbDevice.claimInterface(1))
        .then(() => window.usbDevice.controlTransferOut({
            requestType: 'class',
            recipient: 'interface',
            request: 0x22,
            value: 0x01,
            index: 0x01
        }))
        .then(() => {
            usbButton.classList.add('connected');
            window.usbConnected = true;
            usbListener();
        });
    }

    const usbListener = async () => {
        const result = await window.usbDevice.transferIn(1, 64);
        if (!result.data) return;
        const data = new Uint8Array(result.data.buffer);
        if (data[0] == 0xB1) {
            console.log(data);
            processDevInfo(data.slice(1));
        }
        usbListener();
    };

    const processDevInfo = (info) => {
        const type = info[0];
        const id = (info[1] << 24) | (info[2] << 16) | (info[3] << 8) | info[4];
        if (devList[id]) return;
        console.log('Found device:', id, 'of type:', type);
        devList[id] = {type: info[0]};
        console.log(devList);
        if (type === 1)
            window.createNodeBlocks('light', id);
        else if (type === 2)
            window.createNodeBlocks('button', id);
        else if (type === 3)
            window.createNodeBlocks('motor', id);

    };

    window.connected = false;

    var defaultProject = {
        "targets": [
            {
                "isStage": true,
                "name": "Stage",
                "variables": {},
                "lists": {},
                "broadcasts": {},
                "blocks": {},
                "currentCostume": 0,
                "costumes": [
                    {
                        "assetId": "739b5e2a2435f6e1ec2993791b423146",
                        "name": "backdrop1",
                        "bitmapResolution": 1,
                        "md5ext": "739b5e2a2435f6e1ec2993791b423146.png",
                        "dataFormat": "png",
                        "rotationCenterX": 240,
                        "rotationCenterY": 180
                    }
                ],
                "sounds": [],
                "volume": 100,
            }
        ],
        "meta": {
            "semver": "3.0.0",
            "vm": "0.1.0",
            "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        }
    };

    vm.loadProject(defaultProject).then(() => {
        var videoToolbox = document.getElementById('video-toolbox');
        videoToolbox.innerHTML = defaultToolbox;
        window.videoToolbox = videoToolbox;

        var workspace = Blockly.inject('blocks', {
            collapse: false,
            media: './media/',
            scrollbars: true,
            sounds: false,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.75,
                maxScale: 4,
                minScale: 0.25,
                scaleSpeed: 1.1
            },
            colours: {
                workspace: '#f4f4f4',
                flyout: '#8ec6c5',
                scrollbar: '#24324D',
                scrollbarHover: '#0C111A',
                insertionMarker: '#FFFFFF',
                insertionMarkerOpacity: 0.3,
                fieldShadow: 'rgba(255, 255, 255, 0.3)',
                dragShadowOpacity: 0.6
            }
        });
        window.workspace = workspace;
        window.workspace.getFlyout().autoClose = (window.innerWidth > 600) ? false : true;
        window.workspace.getFlyout().width_ = 0;
        window.blockCount = 0;

        window.gfbutton = document.getElementById('download-icon-img');
        window.uploadbutton = document.getElementById('upload-icon-img');

        this.workspace.toolbox_.addChangeListener((event) => {
            if (event.type === 'remove-category') {
                this.vm.runtime.removeExtensionCategory(event.name);
                videoToolbox.innerHTML = vm.runtime.getBlocksXML() + defaultToolbox;
                window.workspace.updateToolbox(videoToolbox);
            }
        });

        vm.addListener('EXTENSION_ADDED', (categoryInfo) => {
            // Generate the proper blocks and refresh the toolbox
            const defineBlocks = blockInfoArray => {
                if (blockInfoArray && blockInfoArray.length > 0) {
                    const staticBlocksJson = [];
                    const dynamicBlocksInfo = [];
                    blockInfoArray.forEach(blockInfo => {
                        if (blockInfo.info && blockInfo.info.isDynamic) {
                            dynamicBlocksInfo.push(blockInfo);
                        } else if (blockInfo.json) {
                            staticBlocksJson.push(blockInfo.json);
                        }
                        // otherwise it's a non-block entry such as '---'
                    });

                    Blockly.defineBlocksWithJsonArray(staticBlocksJson);
                    dynamicBlocksInfo.forEach(blockInfo => {
                        // This is creating the block factory / constructor -- NOT a specific instance of the block.
                        // The factory should only know static info about the block: the category info and the opcode.
                        // Anything else will be picked up from the XML attached to the block instance.
                        const extendedOpcode = `${categoryInfo.id}_${blockInfo.info.opcode}`;
                        const blockDefinition =
                            defineDynamicBlock(this.ScratchBlocks, categoryInfo, blockInfo, extendedOpcode);
                        Blockly.Blocks[extendedOpcode] = blockDefinition;
                    });
                }
            };
            defineBlocks(
                Object.getOwnPropertyNames(categoryInfo.customFieldTypes)
                .map(fieldTypeName => categoryInfo.customFieldTypes[fieldTypeName].scratchBlocksDefinition));
            defineBlocks(categoryInfo.menus);
            defineBlocks(categoryInfo.blocks);

            videoToolbox.innerHTML = vm.runtime.getBlocksXML() + defaultToolbox;
            window.workspace.updateToolbox(videoToolbox);
        });

        workspace.addChangeListener(vm.blockListener);
        var flyoutWorkspace = workspace.getFlyout().getWorkspace();
        flyoutWorkspace.addChangeListener(vm.flyoutBlockListener);

        // vm.on('SCRIPT_GLOW_ON', function(data) {
            // workspace.glowStack(data.id, true);
        // });
        // vm.on('SCRIPT_GLOW_OFF', function(data) {
            // workspace.glowStack(data.id, false);
        // });
        // vm.on('BLOCK_GLOW_ON', function(data) {
            // workspace.glowBlock(data.id, true);
        // });
        // vm.on('BLOCK_GLOW_OFF', function(data) {
            // workspace.glowBlock(data.id, false);
        // });
        vm.on('VISUAL_REPORT', function(data) {
            workspace.reportValue(data.id, data.value);
        });

        vm.on('workspaceUpdate', (data) => {
            workspace.removeChangeListener(vm.blockListener);
            const dom = Blockly.Xml.textToDom(data.xml);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, workspace);
            workspace.addChangeListener(vm.blockListener);
        });

        vm.on('targetsUpdate', (data) => {
            var editingTargetId = data.editingTarget;
            var target = vm.runtime.getTargetById(editingTargetId);
            var overlay = document.getElementById('blocks-overlay');
            overlay.classList.remove("show-overlay");
            overlay.classList.add("hide-overlay");
            workspace.updateToolbox(videoToolbox);
            setPalette(window.selectedPalette);
            addNodeButton.style.display = 'inline-block';
        });

        // vm.extensionManager.loadExtensionURL('nrf52node');
        vm.start();
    });

    var extensions = {
        light: [],
        button: [],
        motor: []
    };


    window.createNodeBlocks = function(type, id) {
        var name, blocks, menus, s_id, icon;
        s_id = (extensions[type].length > 0) ? ' ' + (extensions[type].length+1) : '';
        name = type + s_id;
        if (type === 'light') {
            blocks = LIGHT_BLOCKS(s_id, id);
            menus = LIGHT_MENUS;
            icon = LIGHT_ICON;
        } else if (type === 'button') {
            blocks = BUTTON_BLOCKS(s_id, id);
            icon = BUTTON_ICON;
            // menus = LIGHT_MENUS;
        } else if (type === 'motor') {
            blocks = MOTOR_BLOCKS(s_id, id);
            icon = MOTOR_ICON;
        }
        this.vm.extensionManager.loadExtensionURL(makeExtension(name, icon, blocks, menus)).then(extensionId => {
            var id = this.workspace.toolbox_.getCategoryByIndex(extensionId).id_; // 4 built-in categories
            extensions[type].push(id);
            this.workspace.toolbox_.setSelectedCategoryById(id);
            setPalette(selectedPalette); //TODO: modify CSS rule to avoid *blink*
        });
    }

    // window.createNodeBlocks('button', 0x499D1057);
    // createNodeBlocks('light', 0x52F6B8E4);
    // window.createNodeBlocks('light', 0x8C24E5CC);

    function makeExtension(name, icon, blocks, menus) {
        // blocks.forEach((block, index) => {
            // Object.assign(block, {opcode: index.toString()});
        // });
        const id = name.toLowerCase().replace(' ', '');
        return `data:text/javasript,class Ext{getInfo(){return{id:"${id}",name:"${name}",blockIconURI:"${icon}",
            blocks:${JSON.stringify(blocks)},menus:${JSON.stringify(menus)}};}}Scratch.extensions.register(new Ext);`;
    }

    var animFrame = document.getElementById('search-animation');
    var animFrameTimeout;
    function startSearching() {
        // window.wss.send(new Uint8Array([0xA1]));
        window.usbDevice.transferOut(1, new Uint8Array([0xA1]));
        animFrame.style.display = 'inline-block';
        animFrameTimeout = setTimeout(stopSearching, 10000);
        window.searching = true;
    }

    function stopSearching() {
        if (animFrameTimeout) {
            // w0x00000000000131f6indow.wss.send(new Uint8Array([0xA2]));
            window.usbDevice.transferOut(1, new Uint8Array([0xA2]));
            clearTimeout(animFrameTimeout);
            animFrameTimeout = null;
        }
        animFrame.style.display = 'none';
        window.searching = false;
    }

    const addNodeButton = document.getElementById('add-node-button');
    window.searching = false;
    addNodeButton.onclick = (event) => {
        if (!usbConnected) {
            usbConnect();
            return;
        }
        if (!window.searching) startSearching();
        else stopSearching();
        // createNodeBlocks('light');
    };

    const palette = document.getElementById('palette-selector');
    palette.onclick = (event) => {
        selectedPalette = (++selectedPalette) % colorPalettes.length;
        setPalette(selectedPalette);
        palette.style.background = getColorPaletteCSS(selectedPalette);
    };
    window.selectedPalette = window.localStorage.getItem('palette');
    if (!selectedPalette) selectedPalette = 0;
    palette.style.background = getColorPaletteCSS(window.selectedPalette);
    palette.style.display = 'block';
}

const colorPalettes = [
        ["f4f4f4", "8ec6c5", "6983aa", "8566aa"],  //https://colorhunt.co/palette/179542
        ["f8f3eb", "c3edea", "fc7e2f", "f40552"],  //https://colorhunt.co/palette/181304
        ["ebfffb", "ff5858", "61234e", "032535"],  //https://colorhunt.co/palette/153362
        ["05dfd7", "ec7373", "d8b5b5", "ffe196"],  //https://colorhunt.co/palette/169700
        ["f8f8f8", "50b6bb", "45969b", "f96d15"],
        ["e8e4e1", "f9c49a", "ec823a", "7c3c21"],
        ["f1ebbb", "5c2a9d", "b5076b", "45046a"],
        ["dbd8e3", "5c5470", "352f44", "2a2438"]
];
function getColorPaletteCSS(index) {
        if (!colorPalettes[0]) return;
        const p = colorPalettes[index];
        return '-webkit-linear-gradient(top, #' + p[0] + ' 7px, #' + p[1] + ' 7px, #' + p[1] + ' 14px, #' + p[2] + ' 14px, #' + p[2] + ' 21px, #' + p[3] + ' 21px)';
}
function setPalette(index) {
        const p = colorPalettes[index];
        document.getElementById('menu-bar').style.backgroundColor = '#' + p[3];
        document.getElementsByClassName('blocklySvg')[0].style.backgroundColor = '#' + p[0];
        document.getElementById('add-node-button').style.backgroundColor = '#' + p[3];
        document.getElementsByClassName('blocklyFlyoutBackground')[0].style.fill = '#' + p[1];
        document.getElementsByClassName('blocklyToolboxDiv')[0].style.backgroundColor = '#' + p[2];
        document.getElementsByClassName('scratchCategoryMenu')[0].style.backgroundColor = '#' + p[2];
        document.getElementById('menu-bar').style.backgroundColor = '#' + p[3];
        document.getElementById('palette-id').innerHTML = parseInt(index)+1;
        document.getElementById('search-animation').style.fill = '#' + p[3];
        window.localStorage.setItem('palette', index);
}

function updateSensorData(data) {
    window.sensorData = data;
    // console.log(data);
    document.getElementById('data-button-left').innerHTML = (data[1]) ? 'pressed' : 'not pressed';
    document.getElementById('data-button-right').innerHTML = (data[2]) ? 'pressed' : 'not pressed';
    document.getElementById('data-light').innerHTML = (data[6]);
    var motion = (data[4] << 8) | data[3];
    if (motion & 0x8000) motion -= 0xFFFF;
    document.getElementById('data-moving').innerHTML = (Math.abs(motion) > 2000) ? "true" : "false";
}

function getFlash(addr, len) {
        return new Promise((resolve, reject) => {
                let out = [0xfe];
                for (let i=0; i<4; i++)
                        out[i+1] = (addr >> (i*8)) & 0xFF;
                out.push(len);
                sendAndWaitForResp(out, 0xed).then(reply => resolve(reply));
        });
}

function timeout(len) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                        resolve();
                }, len);
        });
}

async function upload() {
        if (window.pollinhibit) return;
        window.pollinhibit = true;
        window.uploadbutton.src = 'img/wait.svg';
        let code = [];
        for (let i=0; i<5000; i+=20) {
                const resp = await getFlash(0x80000+i, 20);
                if (resp.every(t => t === 255)) break;
                var decoder = new TextDecoder('utf8');
                console.log(decoder.decode(resp));
                code = code.concat(Array.from(resp));
        }
        while (code.slice(-1)[0] === 255) code = code.slice(0, -1);
        let arr = new Uint16Array(code);
        const text = String.fromCharCode.apply(null, arr);
        console.log(text);
        window.pollinhibit = false;
        window.uploadbutton.src = 'img/upload.svg';
        var xml = Blockly.Xml.textToDom(text);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, window.workspace);
}

async function download() {
    if (window.searching) stopSearching();
    if (window.pollinhibit) return;
    window.pollinhibit = true;
    var stacks = window.blockEncoder.getStacks();
    if (stacks.length === 0) {
        window.pollinhibit = false;
        return;
    }
    for (let i=1; i<=stacks.length; i++) {
        console.log('Stack ' + i + ': ' + JSON.stringify(stacks[i-1]));
    }

    let targets = [];
    for (let i=0; i<stacks.length; i++) {
        stacks[i].targets.forEach(target => {
            if (targets.indexOf(target) < 0)
                targets.push(target);
        });
    }
    targets.forEach(async (target) => {
        let blocks = [];
        let subs = [];
        stacks.forEach(stack => {
            if (stack.targets.indexOf(target) >= 0) {
                blocks.push(stack.blocks);
                stack.subs.forEach(sub => {
                    if (subs.indexOf(sub) < 0)
                        subs = subs.concat(stack.subs);
                });
            }
        });

        var vectors = [];
        for (var i=0; i<64; i++) vectors[i] = 0;
        var procs = [];
        window.blockEncoder.compileStacks(blocks, vectors, procs);
        for (let i=0; i<(procs.length%8); i++) procs.push(255);

        let out = vectors.concat(procs);
        console.log("Target:", target);
        console.log("Subs:", subs);
        console.log(out);

        if (window.usbConnected) {
            console.log('Stopping vm');
            await stopvm(target);
            console.log('Erasing flash');
            await eraseFlash(target, 0);
            console.log('Sending subscriptions');
            await sendSubscriptions(target, subs);
            console.log('Writing flash');
            await writeFlash(target, 0, out);
            console.log('Done');
        }

            const dom = Blockly.Xml.workspaceToDom(window.workspace);
            const xml = Blockly.Xml.domToText(dom);
            console.log(xml);
            console.log(new Uint8Array(xml));
            // let buf = new ArrayBuffer(xml.length*2);
            // let bufView = new Uint16Array(buf);
            // let utf8 = unescape(encodeURIComponent(xml));
            // out = [];
            // for (let i=0; i<utf8.length; i++) {
                    // out.push(utf8.charCodeAt(i));
            // }
            // out = new Uint8Array(bufView.buffer, bufView.byteOffset, bufView.byteLength);

            // let encoder = new TextEncoder();

            // out = encoder.encode(xml);
            // out = Array.from(out);
            // console.log(out.length, out.length%4);

            // console.log('Erasing flash');
            // await eraseFlash(0x30000);
            // console.log('Flash erased');
            // if (out.length < 200) {
                    // await writeFlash(0x30000, out);
            // } else {
                    // for (let i=0; i<out.length; i+= 200) {
                            // await writeFlash(0x30000+i, out.slice(i, i+200));
                    // }
            // }
            // console.log('Program written');
        // }
        // }
    });
    window.pollinhibit = false;
}

function sendSubscriptions(target, subs) {
    return new Promise((resolve, reject) => {
        let out = [
            0xD2, 6 + (subs.length * 4),
            (target >> 24) & 0xFF,
            (target >> 16) & 0xFF,
            (target >> 8) & 0xFF,
            target & 0xFF,
            0xf7,
            subs.length
        ];
        subs.forEach(sub => {
            out.push((sub >> 24) & 0xFF);
            out.push((sub >> 16) & 0xFF);
            out.push((sub >> 8) & 0xFF);
            out.push(sub & 0xFF);
        });
        console.log(out);
        window.usbDevice.transferOut(1, new Uint8Array(out));
        setTimeout(resolve, 500);
    });
}

function stopvm(target) {
    return new Promise((resolve, reject) => {
        let out = [
            0xD2, 5,
            (target >> 24) & 0xFF,
            (target >> 16) & 0xFF,
            (target >> 8) & 0xFF,
            target & 0xFF,
            0xf6
        ];
        console.log(out);
        // window.wss.send(new Uint8Array(out));
        window.usbDevice.transferOut(1, new Uint8Array(out)).then(resolve());
        // setTimeout(resolve, 500);
    });
}

function writeFlash(target, addr, data) {
    return new Promise(async (resolve, reject) => {
        let out = [
            0xD2, 0,
            (target >> 24) & 0xFF,
            (target >> 16) & 0xFF,
            (target >> 8) & 0xFF,
            target & 0xFF,
            0xfc
        ];
        addr += 0x20000;
        for (let i=0; i<4; i++) {
            out[i+7] = (addr >> (i*8)) & 0xFF;
            out[i+11] = (data.length >> (i*8)) & 0xFF;
        }
        // out = out.concat([4, 0, 0, 0, 1, 2, 3, 4]);

        out = out.concat(data);
        out[1] = out.length-2;
        console.log(out);
        if (out.length > 64) {
            for (let i=0; i<out.length; i+=64) {
                window.usbDevice.transferOut(1, new Uint8Array(out.slice(i, i+64)));
            }
        }
                // await send(out.slice(i, i+40));
                // // setTimeout(resolve, 1000);
            // }
        // } else {
            // console.log(out);
            // window.usbDevice.transferOut(1, new Uint8Array(out));
        // }
        setTimeout(resolve, 1000);
        // sendAndWaitForResp(out, 0xcf).then(res => {
                // resolve();
        // });
    });
}

function send(data) {
    return new Promise((resolve, reject) => {
        window.usbDevice.transferOut(1, new Uint8Array(data));
        setTimeout(resolve, 1000);
    });
}

function eraseFlash(target, addr) {
        return new Promise((resolve, reject) => {
                addr += 0x20000;
                let out = [
                    0xD2, 9,
                    (target >> 24) & 0xFF,
                    (target >> 16) & 0xFF,
                    (target >> 8) & 0xFF,
                    target & 0xFF,
                    251
                ];
                for (let i=0; i<4; i++)
                        out[i+7] = (addr >> (i*8)) & 0xFF;
                console.log(out);
                window.usbDevice.transferOut(1, new Uint8Array(out)).then(resolve());
                // setTimeout(resolve, 1000);
                // sendAndWaitForResp(out, 0xbf).then(res => {
                        // resolve();
                // });
        });
}

function save() {
    var filename = document.getElementById('project-name-input').value;
    console.log(filename);
    var xml = Blockly.Xml.workspaceToDom(window.workspace);
    xml = Blockly.Xml.domToPrettyText(xml);
    var xmlFile = new Blob([xml], { type: "application/xml;charset=utf-8" });
    console.log(xmlFile)
    var a = document.createElement('a');
    a.href = URL.createObjectURL(xmlFile);
    a.download = filename + '.xml';
    a.click();
}

function load() {
    document.getElementById('file-input').click();
}

function loadProject(event) {
    var projectName = event.target.files[0].name.split('.xml')[0];
    if (event.target.files) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var xml = Blockly.Xml.textToDom(e.target.result);
            var blocks = xml.getElementsByTagName('block');
            for (let i=0; i<blocks.length; i++) {
                const name = blocks.item(i).getAttribute('type');
                if (name.includes('button_') || name.includes('light_')) {
                    const type = name.split('_')[0];
                    const id = name.split('_').pop();
                    window.createNodeBlocks(type, id);
                }
            }
            setTimeout(() => {
                Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, window.workspace);
            }, 200); //TODO Do this step after the extensions are properly loaded
            document.getElementById('project-name-input').value = projectName;
        }
        reader.readAsBinaryString(event.target.files[0]);
    }
}

window.onload = onLoad;
