const banner = document.querySelector('.banner');
const list = banner.querySelector('ul');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const btnPlay = document.querySelector('.play');
const btnPause = document.querySelector('.pause');
const showNum = 3;
const speed = 500;
const interval = 3000;
const len = list.children.length;
let enableClick = true;
let current_num = 0;
let timer = null;

init();

setTimeout(startRolling, interval);

btnNext.addEventListener('click', () => {
	next();
	stopRolling();
});

btnPrev.addEventListener('click', () => {
	prev();
	stopRolling();
});

btnPlay.addEventListener('click', startRolling);
btnPause.addEventListener('click', stopRolling);

function init() {
	list.style.left = -100 / showNum + '%';
	list.prepend(list.lastElementChild);
}

function next() {
	if (!enableClick) return;
	enableClick = false;
	let next_num = null;
	current_num !== len - 1 ? (next_num = current_num + 1) : (next_num = 0);
	current_num = next_num;

	new Anime(list, {
		prop: 'left',
		value: (-100 / showNum) * 2 + '%',
		duration: speed,
		callback: () => {
			list.append(list.firstElementChild);
			list.style.left = -100 / showNum + '%';
			enableClick = true;
		},
	});
}

function prev() {
	if (!enableClick) return;
	enableClick = false;
	let prev_num = null;
	current_num !== 0 ? (prev_num = current_num - 1) : (prev_num = len - 1);
	current_num = prev_num;

	new Anime(list, {
		prop: 'left',
		value: (-100 / showNum) * 0 + '%',
		duration: speed,
		callback: () => {
			list.prepend(list.lastElementChild);
			list.style.left = -100 / showNum + '%';
			enableClick = true;
		},
	});
}

function startRolling() {
	next();
	timer = setInterval(next, interval);
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
}

function stopRolling() {
	clearInterval(timer);
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
}
