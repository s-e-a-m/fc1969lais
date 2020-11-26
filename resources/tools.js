function getAudioCtx() {
    const audioCtx = new (window.webkitAudioContext || window.AudioContext)({ latencyHint: 0.00001 });
//	audioCtx.destination.channelInterpretation = "discrete";


    const unlockAudioContext = () => {
        if (audioCtx.state !== "suspended") return;
        const b = document.body;
        const events = ["touchstart", "touchend", "mousedown", "keydown"];
        const unlock = () => audioCtx.resume().then(clean);
        const clean = () => events.forEach(e => b.removeEventListener(e, unlock));
        events.forEach(e => b.addEventListener(e, unlock, false));
    }
    unlockAudioContext();


    return audioCtx;
}



//////////////////////////////////////////////////////////////:
function loadDsp(node) {

    const json = JSON.parse(node.getJSON());
    const faustUi = new FaustUI.FaustUI({root: document.getElementById(json.name)});
    const audioCtx = node.context;

    faustUi.paramChangeByUI = (path, value) => {
        node.setParamValue(path, value);
    };

    node.setOutputParamHandler((path, value) => {
        faustUi.paramChangeByDSP(path, value);
    });

    faustUi.ui = json.ui;

    node.connect(audioCtx.destination);
}
