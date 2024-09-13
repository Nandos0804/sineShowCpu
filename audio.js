import * as Tone from "tone";
import Csound from "@csound/browser";
import { createDevice, MessageEvent } from "@rnbo/js";
import jsonRNBO from "./src/patch.export.json";

let WAContext = window.AudioContext || window.webkitAudioContext;
let context = new WAContext();
let csound = null;

let csd = `
<CsoundSynthesizer>
    
    <CsOptions>
        -odac
    </CsOptions>

    <CsInstruments>
        
        instr 1
            ares linen  ampdbfs(-20), 0.5,2, 0.8
            asig oscili ares, 440    
            outs   asig, asig     
        endin
        schedule(1,0,2)
    
    </CsInstruments>

    <CsScore>

    </CsScore>

</CsoundSynthesizer>
`;

export function pingTone() {
  const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.2,
    decay: 0.2,
    sustain: 1.0,
    release: 0.6,
  }).toDestination();
  // create an oscillator and connect it
  const osc = new Tone.Oscillator("440","sine").connect(ampEnv).start();
  osc.volume.value = -20;
  ampEnv.triggerAttackRelease("1n")
}

// this is the JS function to run Csound
export async function pingCsound() {
  // if the Csound object is not initialised
  if (csound == null) {
    // create a Csound engine object
    const csound = await Csound();
    // set realtime audio (dac) output
    // compile csound code
    await csound.compileCsdText(csd);
    // start the engine
    await csound.start();
  }
}

const setup = async () => {
  let patcher = jsonRNBO;
  let device = await createDevice({ context, patcher });
  const close = new MessageEvent(2000, "in1", [1]);
  device.parameters.forEach((parameter) => {
    console.log(parameter.id);
  });
  device.node.connect(context.destination);
  device.scheduleEvent(close);
};

export async function pingRNBO() {
  setup();
}
