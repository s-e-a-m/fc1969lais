
/*
Code generated with Faust version 2.28.8
Compilation options: -lang wasm -scal -ftz 2
*/

function getJSON1969lais() {
	return '{"name": "ALVIN LUCIER - I am SITTING IN A ROOM (1969)","filename": "1969lais.dsp","version": "2.28.8","compile_options": "-lang wasm -scal -ftz 2","library_list": ["/Users/giuseppesilvi/Documents/GitHub/organizations/S-E-A-M/faust/fc1969lais/../faust-libraries/seam.lib","/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/delays.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/Users/giuseppesilvi/Documents/GitHub/organizations/S-E-A-M/faust/faust-libraries/seam.hardware.lib","/usr/local/share/faust/basics.lib","/usr/local/share/faust/signals.lib","/Users/giuseppesilvi/Documents/GitHub/organizations/S-E-A-M/faust/faust-libraries/seam.analyzers.lib","/usr/local/share/faust/analyzers.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/Users/giuseppesilvi/Documents/GitHub/organizations/S-E-A-M/faust/fc1969lais","/Users/giuseppesilvi/Documents/GitHub/organizations/S-E-A-M/faust/fc1969lais/../faust-libraries"],"size": 268435528,"inputs": 1,"outputs": 1,"meta": [ { "../faust-libraries/seam.lib/author": "Giuseppe Silvi" },{ "../faust-libraries/seam.lib/license": "CC3" },{ "../faust-libraries/seam.lib/name": "Faust SEAM main lib" },{ "../faust-libraries/seam.lib/version": "0.2" },{ "analyzers.lib/name": "Faust Analyzer Library" },{ "analyzers.lib/version": "0.1" },{ "author": "Giuseppe Silvi" },{ "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.1" },{ "copyright": "(c)SEAM 2019" },{ "delays.lib/name": "Faust Delay Library" },{ "delays.lib/version": "0.1" },{ "description": "Alvin Lucier, I am sitting in a room - live electronic model" },{ "filename": "1969lais.dsp" },{ "license": "GNU-GPL-v3" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.3" },{ "name": "ALVIN LUCIER - I am SITTING IN A ROOM (1969)" },{ "options": "[midi:on] [httpd:on]" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" },{ "seam.analyzers.lib/author": "Giuseppe Silvi" },{ "seam.analyzers.lib/license": "CC4" },{ "seam.analyzers.lib/name": "Faust Ambisonic Element Library" },{ "seam.analyzers.lib/version": "0.1" },{ "seam.hardware.lib/author": "Giuseppe Silvi and Davide Tedesco" },{ "seam.hardware.lib/license": "CC4" },{ "seam.hardware.lib/name": "Faust Hardware Interface Library" },{ "seam.hardware.lib/version": "0.1" },{ "signals.lib/name": "Faust Signal Routing Library" },{ "signals.lib/version": "0.0" },{ "version": "010" }],"ui": [ {"type": "vgroup","label": "ALVIN LUCIER - I am SITTING IN A ROOM (1969)","items": [ {"type": "vgroup","label": "Check both boxes to start","meta": [{ "01": "" }],"items": [ {"type": "checkbox","label": "Uncheck me after the incipit","address": "/ALVIN_LUCIER_-_I_am_SITTING_IN_A_ROOM_(1969)/Check_both_boxes_to_start/Uncheck_me_after_the_incipit","index": 268435488,"meta": [{ "01": "" }]},{"type": "checkbox","label": "I am Sitting... Uncheck me at the end","address": "/ALVIN_LUCIER_-_I_am_SITTING_IN_A_ROOM_(1969)/Check_both_boxes_to_start/I_am_Sitting..._Uncheck_me_at_the_end","index": 12,"meta": [{ "02": "" }]}]},{"type": "hgroup","label": "0x00","meta": [{ "02": "" }],"items": [ {"type": "hgroup","label": "0x00","meta": [{ "03": "" }],"items": [ {"type": "vslider","label": "0x00","address": "/ALVIN_LUCIER_-_I_am_SITTING_IN_A_ROOM_(1969)/0x00/0x00/0x00","index": 0,"meta": [{ "08": "" },{ "midi": "ctrl 88" }],"init": 0,"min": -70,"max": 6,"step": 0.1},{"type": "vbargraph","label": "0x7fcb31a8bae0","address": "/ALVIN_LUCIER_-_I_am_SITTING_IN_A_ROOM_(1969)/0x00/0x00/0x7fcb31a8bae0","index": 268435524,"meta": [{ "90": "" },{ "unit": "dB" }],"min": -70,"max": 6}]}]}]}]}';
}
/*
 faust2webaudio

 Primarily written by Myles Borins
 During the Spring 2013 offering of Music 420b with Julius Smith
 A bit during the Summer of 2013 with the help of Joshua Kit Clayton
 And finally a sprint during the late fall of 2013 to get everything working
 A Special thanks to Yann Orlarey and Stéphane Letz

 faust2webaudio is distributed under the terms the MIT or GPL2 Licenses.
 Choose the license that best suits your project. The text of the MIT and GPL
 licenses are at the root directory.

 Additional code: GRAME 2014-2019
*/

'use strict';

/**
 * @class FaustWasm2ScriptProcessor
 * @property {string} name - name of current DSP
 * @property {any[]} _log - event log
 * @property {string[]} node - ScriptProcessorNode
 * @property {boolean} debug - debug mode
 */
class FaustWasm2ScriptProcessor {

    /**
     * Creates an instance of FaustWasm2ScriptProcessor.
     * @param {string} dspName - dsp name
     * @param {{ debug: boolean, [key: string]: any }} options - compile options
     */
    constructor(dspName, options) {
        this.name = dspName;
        this._log = [];
        this.debug = false || (typeof options === "object" && options.debug);
    }

    heap2Str(buf) {
        let str = "";
        let i = 0;
        while (buf[i] !== 0) {
            str += String.fromCharCode(buf[i++]);
        }
        return str;
    }

    /**
    * Constructor of Monophonic Faust DSP
    *
    * @param {WebAssembly.Instance} dspInstance - the wasm instance
    * @param {AudioContext | webkitAudioContext} audioCtx - the Web Audio context
    * @param {number} bufferSize - the buffer_size in frames
    *
    * @returns {ScriptProcessorNode} a valid WebAudio ScriptProcessorNode object or null
    */
    getNode(dspInstance, audioCtx, bufferSize) {

    	// JSON is as offset 0
        var HEAPU8 = new Uint8Array(dspInstance.exports.memory.buffer);
        this.json = this.heap2Str(HEAPU8);
        this.json_object = JSON.parse(this.json);

        let sp;
        const inputs = parseInt(this.json_object.inputs);
        const outputs = parseInt(this.json_object.outputs);
        try {
            sp = audioCtx.createScriptProcessor(bufferSize, inputs, outputs);
        } catch (e) {
            this.error("Error in createScriptProcessor: " + e);
            return null;
        }

        sp.output_handler = null;
        sp.ins = null;
        sp.outs = null;
        sp.compute_handler = null;

        sp.dspInChannnels = [];
        sp.dspOutChannnels = [];

        sp.fPitchwheelLabel = [];
        sp.fCtrlLabel = new Array(128).fill(null).map(() => []);

        sp.remap = (v, mn0, mx0, mn1, mx1) => (v - mn0) / (mx0 - mn0) * (mx1 - mn1) + mn1;

        sp.numIn = inputs;
        sp.numOut = outputs;

        this.log(sp.numIn);
        this.log(sp.numOut);

        // Memory allocator
        sp.ptr_size = 4;
        sp.sample_size = 4;

        sp.factory = dspInstance.exports;
        sp.HEAP = dspInstance.exports.memory.buffer;
        sp.HEAP32 = new Int32Array(sp.HEAP);
        sp.HEAPF32 = new Float32Array(sp.HEAP);

        this.log(sp.HEAP);
        this.log(sp.HEAP32);
        this.log(sp.HEAPF32);

        // bargraph
        sp.outputs_timer = 5;
        sp.outputs_items = [];

        // input items
        sp.inputs_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        sp.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        sp.audio_heap_ptr_inputs = sp.audio_heap_ptr;
        sp.audio_heap_ptr_outputs = sp.audio_heap_ptr_inputs + sp.numIn * sp.ptr_size;

        // Setup buffer offset
        sp.audio_heap_inputs = sp.audio_heap_ptr_outputs + sp.numOut * sp.ptr_size;
        sp.audio_heap_outputs = sp.audio_heap_inputs + sp.numIn * bufferSize * sp.sample_size;

        // Start of DSP memory : DSP is placed first with index 0
        sp.dsp = 0;

        sp.pathTable = [];

        sp.update_outputs = () => {
            if (sp.outputs_items.length > 0 && sp.output_handler && sp.outputs_timer-- === 0) {
                sp.outputs_timer = 5;
                sp.outputs_items.forEach(item => sp.output_handler(item, sp.factory.getParamValue(sp.dsp, sp.pathTable[item])));
            }
        };

        sp.compute = e => {
            for (let i = 0; i < sp.numIn; i++) { // Read inputs
                const input = e.inputBuffer.getChannelData(i);
                const dspInput = sp.dspInChannnels[i];
                dspInput.set(input);
            }
            // Possibly call an externally given callback (for instance to synchronize playing a MIDIFile...)
            if (sp.compute_handler) sp.compute_handler(bufferSize);
            try {
                sp.factory.compute(sp.dsp, bufferSize, sp.ins, sp.outs); // Compute
            } catch(e) {
                console.log("ERROR in compute (" + e + ")");
            }
            sp.update_outputs(); // Update bargraph
            for (let i = 0; i < sp.numOut; i++) { // Write outputs
                const output = e.outputBuffer.getChannelData(i);
                const dspOutput = sp.dspOutChannnels[i];
                output.set(dspOutput);
            }
        };
        // JSON parsing
        sp.parse_ui = ui => ui.forEach(group => sp.parse_group(group));
        sp.parse_group = group => group.items ? sp.parse_items(group.items) : null;
        sp.parse_items = items => items.forEach(item => sp.parse_item(item));
        sp.parse_item = item => {
            if (item.type === "vgroup" || item.type === "hgroup" || item.type === "tgroup") {
                sp.parse_items(item.items);
            } else if (item.type === "hbargraph" || item.type === "vbargraph") {
                // Keep bargraph adresses
                sp.outputs_items.push(item.address);
                sp.pathTable[item.address] = parseInt(item.index);
            } else if (item.type === "vslider" || item.type === "hslider" || item.type === "button"
                    || item.type === "checkbox" || item.type === "nentry") {
                // Keep inputs adresses
                sp.inputs_items.push(item.address);
                sp.pathTable[item.address] = parseInt(item.index);
                if (!item.meta) return;
                item.meta.forEach(meta => {
                    const midi = meta.midi;
                    if (!midi) return;
                    const strMidi = midi.trim();
                    if (strMidi === "pitchwheel") {
                        sp.fPitchwheelLabel.push({
                            path: item.address,
                            min: parseFloat(item.min),
                            max: parseFloat(item.max)
                        });
                    } else {
                        const matched = strMidi.match(/^ctrl\s(\d+)/);
                        if (!matched) return;
                        sp.fCtrlLabel[parseInt(matched[1])].push({
                            path: item.address,
                            min: parseFloat(item.min),
                            max: parseFloat(item.max)
                        });
                    }
                })
            }
        }
        sp.initAux = () => { // Setup web audio context
            this.log("buffer_size " + bufferSize);
            sp.onaudioprocess = sp.compute;
            if (sp.numIn > 0) {
                sp.ins = sp.audio_heap_ptr_inputs;
                for (let i = 0; i < sp.numIn; i++) {
                    sp.HEAP32[(sp.ins >> 2) + i] = sp.audio_heap_inputs + bufferSize * sp.sample_size * i;
                }
                // Prepare Ins buffer tables
                const dspInChans = sp.HEAP32.subarray(sp.ins >> 2, (sp.ins + sp.numIn * sp.ptr_size) >> 2);
                for (let i = 0; i < sp.numIn; i++) {
                    sp.dspInChannnels[i] = sp.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + bufferSize * sp.sample_size) >> 2);
                }
            }
            if (sp.numOut > 0) {
                sp.outs = sp.audio_heap_ptr_outputs;
                for (let i = 0; i < sp.numOut; i++) {
                    sp.HEAP32[(sp.outs >> 2) + i] = sp.audio_heap_outputs + bufferSize * sp.sample_size * i;
                }
                // Prepare Out buffer tables
                const dspOutChans = sp.HEAP32.subarray(sp.outs >> 2, (sp.outs + sp.numOut * sp.ptr_size) >> 2);
                for (let i = 0; i < sp.numOut; i++) {
                    sp.dspOutChannnels[i] = sp.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + bufferSize * sp.sample_size) >> 2);
                }
            }
            // Parse JSON UI part
            sp.parse_ui(this.json_object.ui);
            // Init DSP
            sp.factory.init(sp.dsp, audioCtx.sampleRate);
        }

        // Public API

        /**
         * Destroy the node, deallocate resources.
         */
        sp.destroy = () => {}

        sp.getSampleRate = () => audioCtx.sampleRate;   // Return current sample rate
        sp.getNumInputs = () => sp.numIn;               // Return instance number of audio inputs.
        sp.getNumOutputs = () => sp.numOut;             // Return instance number of audio outputs.

        /**
        * Global init, doing the following initialization:
        * - static tables initialization
        * - call 'instanceInit': constants and instance state initialisation
        *
        * @param {number} sampleRate - the sampling rate in Hertz
        */
        sp.init = sampleRate => sp.factory.init(sp.dsp, sampleRate);

        /**
        * Init instance state.
        *
        * @param {number} sampleRate - the sampling rate in Hertz
        */
        sp.instanceInit = sampleRate => sp.factory.instanceInit(sp.dsp, sampleRate);

        /**
        * Init instance constant state.
        *
        * @param {number} sampleRate - the sampling rate in Hertz
        */
        sp.instanceConstants = sampleRate => sp.factory.instanceConstants(sp.dsp, sampleRate);

        /* Init default control parameters values. */
        sp.instanceResetUserInterface = () => sp.factory.instanceResetUserInterface(sp.dsp);

        /* Init instance state (delay lines...).*/
        sp.instanceClear = () => sp.factory.instanceClear(sp.dsp);

        /**
         * Trigger the Meta handler with instance specific calls to 'declare' (key, value) metadata.
         *
         * @param {{ declare: (string, any) => any }} handler - the Meta handler as a 'declare' function of type (key, value)
         */
        sp.metadata = handler => {
            if (this.json_object.meta) {
                this.json_object.meta.forEach(meta => handler.declare(Object.keys(meta)[0], Object.values(meta)[0]));
            }
        }

        /**
         * Setup a control output handler with a function of type (path, value)
         * to be used on each generated output value. This handler will be called
         * each audio cycle at the end of the 'compute' method.
         *
         * @param {{ declare: (string, any) => any }} handler - a function of type function(path, value)
         */
        sp.setOutputParamHandler = handler => sp.output_handler = handler;

        /**
         * Get the current output handler.
         */
        sp.getOutputParamHandler = () => sp.output_handler;

        /**
         * Control change
         *
         * @param {number} channel - the MIDI channel (0..15, not used for now)
         * @param {number} ctrl - the MIDI controller number (0..127)
         * @param {number} value - the MIDI controller value (0..127)
         */
        sp.ctrlChange = (channel, ctrl, value) => {
            if (!sp.fCtrlLabel[ctrl].length) return;
            sp.fCtrlLabel[ctrl].forEach(ctrl => {
                const path = ctrl.path;
                sp.setParamValue(path, sp.remap(value, 0, 127, ctrl.min, ctrl.max));
                if (sp.output_handler) sp.output_handler(path, sp.getParamValue(path));
            })
        }

        /**
         * PitchWeel
         *
         * @param {number} channel - the MIDI channel (0..15, not used for now)
         * @param {number} value - the MIDI controller value (0..16383)
         */
        sp.pitchWheel = (channel, wheel) => {
            sp.fPitchwheelLabel.forEach(pw => {
                sp.setParamValue(pw.path, sp.remap(wheel, 0, 16383, pw.min, pw.max));
                if (sp.output_handler) sp.output_handler(pw.path, sp.getParamValue(pw.path));
            });
        }

        /**
         * Set control value.
         *
         * @param {string} path - the path to the wanted control (retrieved using 'getParams' method)
         * @param {number} val - the float value for the wanted parameter
         */

        sp.setParamValue = (path, val) => sp.factory.setParamValue(sp.dsp, sp.pathTable[path], val);
        /**
         * Get control value.
         *
         * @param {string} path - the path to the wanted control (retrieved using 'getParams' method)
         *
         * @return {number} the float value
         */
        sp.getParamValue = path => sp.factory.getParamValue(sp.dsp, sp.pathTable[path]);

        /**
         * Get the table of all input parameters paths.
         *
         * @return {object} the table of all input parameter paths.
         */
        sp.getParams = () => sp.inputs_items;

        /**
         * Get DSP JSON description with its UI and metadata.
         *
         * @return {string} DSP JSON description
         */
        sp.getJSON = () => this.json;

        // Init resulting DSP
        sp.initAux();
        return sp;
    }

    /**
    * Create a ScriptProcessorNode Web Audio object
    * by loading and compiling the Faust wasm file
    *
    * @param {AudioContext | webkitAudioContext} audioCtx - the Web Audio context
    * @param {number} bufferSize - the bufferSize in frames
    * @returns {Promise<ScriptProcessorNode>} a Promise for valid WebAudio ScriptProcessorNode object or null
    */
    async createDSP(audioCtx, bufferSize) {
        const importObject = {
            env: {
                memoryBase: 0,
                tableBase: 0,
                _abs: Math.abs,

                // Float version
                _acosf: Math.acos,
                _asinf: Math.asin,
                _atanf: Math.atan,
                _atan2f: Math.atan2,
                _ceilf: Math.ceil,
                _cosf: Math.cos,
                _expf: Math.exp,
                _floorf: Math.floor,
                _fmodf: (x, y) => x % y,
                _logf: Math.log,
                _log10f: Math.log10,
                _max_f: Math.max,
                _min_f: Math.min,
                _remainderf: (x, y) => x - Math.round(x / y) * y,
                _powf: Math.pow,
                _roundf: Math.fround,
                _sinf: Math.sin,
                _sqrtf: Math.sqrt,
                _tanf: Math.tan,
                _acoshf: Math.acosh,
                _asinhf: Math.asinh,
                _atanhf: Math.atanh,
                _coshf: Math.cosh,
                _sinhf: Math.sinh,
                _tanhf: Math.tanh,

                // Double version
                _acos: Math.acos,
                _asin: Math.asin,
                _atan: Math.atan,
                _atan2: Math.atan2,
                _ceil: Math.ceil,
                _cos: Math.cos,
                _exp: Math.exp,
                _floor: Math.floor,
                _fmod: (x, y) => x % y,
                _log: Math.log,
                _log10: Math.log10,
                _max_: Math.max,
                _min_: Math.min,
                _remainder: (x, y) => x - Math.round(x / y) * y,
                _pow: Math.pow,
                _round: Math.fround,
                _sin: Math.sin,
                _sqrt: Math.sqrt,
                _tan: Math.tan,
                _acosh: Math.acosh,
                _asinh: Math.asinh,
                _atanh: Math.atanh,
                _cosh: Math.cosh,
                _sinh: Math.sinh,
                _tanh: Math.tanh,

                table: new WebAssembly.Table({ initial: 0, element: "anyfunc" })
            }
        };

        try {
            const dspFile = await fetch(this.name + ".wasm");
            const dspBuffer = await dspFile.arrayBuffer();
            const dspModule = await WebAssembly.instantiate(dspBuffer, importObject);
            return this.getNode(dspModule.instance, audioCtx, bufferSize);
        } catch (e) {
            this.error(e);
            this.error("Faust " + this.name + " cannot be loaded or compiled");
        }
    }

    log(str) {
        this._log.push(str);
        if (this.debug) console.log(str);
    }

    error(str) {
        this._log.push(str);
        console.error(str);
    }
}

const dspName = "1969lais";
const instance = new FaustWasm2ScriptProcessor(dspName);

// output to window or npm package module
if (typeof module === "undefined") {
    window[dspName] = instance;
} else {
    const exp = {};
    exp[dspName] = instance;
    module.exports = exp;
}

// Usage : 1969lais.createDSP(audioCtx, 1024).then(dsp => dsp.connect(audioCtx.destination));
