const banner = document.querySelector('.banner');
const list = banner.querySelector('ul');
const tits = document.querySelectorAll('.tits h2');
const bgFrame = document.querySelector('.bgs');
const paging = document.querySelector('.paging');
const mask = document.querySelector('.mask');
const [btnPrev, btnNext] = document.querySelector('.btns').children;
const [btnPlay, btnPause] = document.querySelector('.auto').children;
const [counter, total] = paging.children;
const vidData = ['vid1.mp4', 'vid2.mp4', 'vid3.mp4', 'vid4.mp4', 'vid5.mp4'];
const showNum = 3;
const speed = 500;
const interval = 3000;
const len = list.children.length;
let enableClick = true;
let current_num = 0;
let timer = null;
let vids = null;
let vid_count = 0;

init();
createVid();
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

function createVid() {
	let tags = '';
	vidData.forEach((vid) => (tags += `<video src='vids/${vid}' loop muted autoplay></video>`));
	bgFrame.innerHTML = tags;

	vids = bgFrame.querySelectorAll('video');
	vids.forEach((vid) => {
		vid.onloadeddata = () => {
			vid_count++;
			console.log(vid_count);

			if (vid_count === vidData.length) {
				new Anime(mask, {
					prop: 'opacity',
					value: 0,
					duration: 1000,
					callback: () => mask.remove(),
				});
			}
		};
	});

	vids[0].classList.add('on');
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
