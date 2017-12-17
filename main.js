var group;
var osc0, osc1, osc2, osc3;
var volumes = [1, 1, 1, 1];
var shapes = ["sawtooth", "sawtooth", "sawtooth", "sawtooth"];
var frequencies = [440, 440, 440, 440];

function getWord() {	
	var word = document.getElementById("input").value;
	console.log(word);
	findSimilar(word, function(similarWord) {
		makeSynth(similarWord);
	});
}

function makeSynth(desc) {
	group = new Pizzicato.Group();
	switch (desc) {
		case "wavy":
		shapes[0] = "sawtooth";
		volumes[0] = Math.random()
		shapes[1] = "sawtooth";
		volumes[1] = Math.random()
		shapes[2] = "square";
		volumes[2] = Math.random()
		shapes[3] = "square";
		volumes[3] = Math.random()
		tremolo(Math.random() * 3 + 1, Math.random() * 0.5 + 0.5);
		group.release = 5;
		frequencies[0] = Math.random() * 900 + 220;
		frequencies [1] = frequencies[2] = frequencies[3] = frequencies[0];
		break;

		case "scratchy":
		ringmod(Math.random() * 30 + 30, 0.75);
		break;

		case "calm":
		for(var i = 0; i<4; i++)
		{
			shapes[i] = "sine";
		}
		majorChord();
		lowPass(440, 0);
		reverb(5);
		break;

		case "quick":
		arp();
		// reverb(1);
		break;

		case "jazz":
		jazz();
		shapes = ["triangle", "triangle", "triangle", "triangle"];
		break;

		case "crunchy":
		frequencies = [frequencies[0]/2, frequencies[0]/2*Math.pow(2, 12.15/12), frequencies[0]/2*Math.pow(2, 11.85/12), frequencies[0]/4];
		shapes = ["sawtooth", "sawtooth", "sawtooth", "sawtooth"];
		distort(0.2);
		break;

		case "creepy":
		dim7();
		shapes = ["sine", "sine", "sine", "sine"];
		break;
	}
	initOsc();
}

function initOsc() {
	osc0 = new Pizzicato.Sound({
		source: 'wave',
		options: {
			volume: volumes[0],
			type: shapes[0],
			frequency: frequencies[0]
		}
	});
	osc1 = new Pizzicato.Sound({
		source: 'wave',
		options: {
			volume: volumes[1],
			type: shapes[1],
			frequency: frequencies[1]
		}
	});
	osc2 = new Pizzicato.Sound({
		source: 'wave',
		options: {
			volume: volumes[2],
			type: shapes[2],
			frequency: frequencies[2]
		}
	});
	osc3 = new Pizzicato.Sound({
		source: 'wave',
		options: {
			volume: volumes[3],
			type: shapes[3],
			frequency: frequencies[3]
		}
	});
	group.addSound(osc0);
	group.addSound(osc1);
	group.addSound(osc2);
	group.addSound(osc3);
}

function play() {
	group.play();
}

function stop() {
	group.stop();
}

async function playThenStop(time) {
	group.play();
	console.log("played");
	await sleep(time);
	console.log("stopped");
	group.stop();
}

async function arp() {

	while(true) {
		osc0.frequency = frequencies[0];
		osc1.frequency = frequencies[1];
		osc2.frequency = frequencies[2];
		osc3.frequency = frequencies[3];
		await sleep(1000/8);
		osc0.frequency *= 2;
		osc1.frequency *= 2;
		osc2.frequency *= 2;
		osc3.frequency *= 2;
		await sleep(1000/8);
		osc0.frequency *= 3;
		osc1.frequency *= 3;
		osc2.frequency *= 3;
		osc3.frequency *= 3;
		await sleep(1000/8);
		osc0.frequency *= 4;
		osc1.frequency *= 4;
		osc2.frequency *= 4;
		osc3.frequency *= 4;
		await sleep(1000/8);
	}
}

function majorChord() {
	frequencies[1] = frequencies[0] * Math.pow(2, 4/12);
	frequencies[2] = frequencies[0] * Math.pow(2, 7/12);
	frequencies[3] = frequencies[0] * 2;
}

function minorChord() {
	frequencies[1] = frequencies[0] * Math.pow(2, 3/12);
	frequencies[2] = frequencies[0] * Math.pow(2, 7/12);
	frequencies[3] = frequencies[0] * 2;
}

function dim7() {
	frequencies[1] = frequencies[0] * Math.pow(2, 3/12);
	frequencies[2] = frequencies[0] * Math.pow(2, 6/12);
	frequencies[3] = frequencies[0] * Math.pow(2, 10/12);
}

function jazz() {
	frequencies[1] = frequencies[0] * Math.pow(2, 4/12);
	frequencies[2] = frequencies[0] * Math.pow(2, 7/12);
	frequencies[3] = frequencies[0] * Math.pow(2, 10/12);
}

function distort(gain) {
	var distortion = new Pizzicato.Effects.Distortion({gain: gain});
	group.addEffect(distortion);
}


function delay(time) {
	var delay = new Pizzicato.Effects.Delay({
		feedback: 0.8,
		time: time,
		mix: 0.75
	});
	group.addEffect(delay);
}

function flanger(speed, depth) {
	var flanger = new Pizzicato.Effects.Flanger(
		{	time: 0.45,
			speed: speed,
			depth: depth,
			feedback: 0.1,
			mix: 0.5 });
	group.addEffect(flanger);
}

function lowPass(cutoff, resonance) {
	var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
		frequency: cutoff,
		peak: resonance
	});
	group.addEffect(lowPassFilter);
}

function tremolo(speed, depth) {
	var tremolo = new Pizzicato.Effects.Tremolo({
		speed: speed,
		depth: depth,
		mix: 1
	});

	group.addEffect(tremolo);
}

function reverb(time) {
	var reverb = new Pizzicato.Effects.Reverb({
		time: time,
		decay: 0.8,
		reverse: true,
		mix: 0.5
	});
	group.addEffect(reverb);
}

function ringmod(speed, depth) {
	var RingModulator = new Pizzicato.Effects.RingModulator({
		speed: speed,
		distortion: 4,
		mix: depth
	});

	group.addEffect(RingModulator);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
