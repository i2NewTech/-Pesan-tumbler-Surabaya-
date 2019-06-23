import * as mm from '../src/index';

const metronome =
    new mm.Metronome({click: onClick, quarter: onQuarter, bar: onBar});
const output = document.getElementById('output') as HTMLElement;

document.getElementById('btn').addEventListener('click', (event) => {
  const btn = event.target as HTMLButtonElement;
  if (metronome.isTicking()) {
    metronome.stop();
    btn.textContent = 'start';
    document.getElementById('controls').removeAttribute('disabled');
  } else {
    btn.textContent = 'stop';
    document.getElementById('output').innerHTML = '';
    document.getElementById('controls').setAttribute('disabled', 'true')