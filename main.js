var group;
var osc0, osc1, osc2, osc3;
var volumes = [1, 1, 1, 1];
var shapes = ["sine", "sine", "sine", "sine"];
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
	group.release = 5;
	switch (desc) {
		case "wavy":
		tremolo(Math.random() * 5 + 1, Math.random() * 0.5 + 0.5);
		flanger();
		break;
		case "scratchy":
		ringmod(Math.random() * 30 + 30, 0.75);
		break;


		case "calm":
		
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
	console.log("played");
	group.stop();
}

async function arp(freq) {
	while(true) {
		osc0.frequency = freq;
		await sleep(1000/2);
		osc0.frequency = freq * 2;
		await sleep(1000/2);
		osc0.frequency = freq * 3;
		await sleep(1000/2);
		osc0.frequency = freq * 4;
		await sleep(1000/2);
	}
}

async function vibrato(freq, amp) {
	while(true) {
		osc0.frequency = freq;
		osc0.frequency = freq * 2;
		osc0.frequency = freq * 3;
		osc0.frequency = freq * 4;
	}
}

function majorChord() {
	osc1.frequency = frequencies[0] * Math.pow(2, 4/12);
	osc2.frequency = frequencies[0] * Math.pow(2, 7/12);
	osc3.frequency = frequencies[0] * 2;
}

function minorChord() {
	osc1.frequency = frequencies[0] * Math.pow(2, 3/12);
	osc2.frequency = frequencies[0] * Math.pow(2, 7/12);
	osc3.frequency = frequencies[0] * 2;
}

function jazz() {
	osc1.frequency = frequencies[0] * Math.pow(2, 4/12);
	osc2.frequency = frequencies[0] * Math.pow(2, 7/12);
	osc2.frequency = frequencies[0] * Math.pow(2, 10/12);
}

function distort(gain) {
	var distortion = new Pizzicato.Effects.Distortion({gain: gain});
	group.addEffect(distortion);
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
