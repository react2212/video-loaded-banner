const banner = document.querySelector('.banner');
const list = banner.querySelector('ul');
const tits = document.querySelectorAll('.tits h2');
const vids = document.querySelectorAll('.bgs video');
const paging = document.querySelector('.paging');
const [btnPrev, btnNext] = document.querySelector('.btns').children;
const [btnPlay, btnPause] = document.querySelector('.auto').children;
const [counter, total] = paging.children;
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
	total.innerText = len < 10 ? '0' + len : len;
}

function next() {
	if (!enableClick) return;
	enableClick = false;
	let next_num = null;
	current_num !== len - 1 ? (next_num = current_num + 1) : (next_num = 0);
	current_num = next_num;
	activation(current_num);
	setCounter(current_num);

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
	activation(current_num);
	setCounter(current_num);

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

function activation(index) {
	for (const el of tits) el.classList.remove('on');
	for (const el of vids) el.classList.remove('on');
	tits[index].classList.add('on');
	vids[index].classList.add('on');
}

function setCounter(num) {
	counter.innerText = '0' + (num + 1);
}
