const vidData = ['vid1.mp4', 'vid2.mp4', 'vid3.mp4', 'vid5.mp4'];
const frame = document.querySelector('main');
const mask = document.querySelector('.mask');
let tags = '';

const imgs = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'];
const vids = ['vid1.mp4', 'vid2.mp4', 'vid3.mp4', 'vid4.mp4', 'vid5.mp4'];

createDOM();
endLoading();

function createDOM() {
	imgs.forEach((src) => (tags += `<img src='vids/${src}' /> `));
	vids.forEach((src) => (tags += `<video src='vids/${src}' loop autoplay muted></video>`));
	frame.innerHTML = tags;
}

//이미지 로딩완료 체크 함수
function loadImg() {
	return new Promise((res, rej) => {
		let countImg = 0;
		const imgDOM = frame.querySelectorAll('img');

		imgDOM.forEach((img) => {
			img.onload = () => {
				countImg++;
				console.log('img loaded', countImg);
				if (countImg === imgs.length) res(true);
			};
		});
	});
}
//동영상 로딩완료 체크 함수
function loadVid() {
	return new Promise((res, rej) => {
		let countVid = 0;
		const vidDOM = frame.querySelectorAll('video');

		vidDOM.forEach((vid) => {
			vid.onloadeddata = () => {
				countVid++;
				console.log('vid loaded', countVid);
				if (countVid === vids.length) res(true);
			};
		});
	});
}

//캐싱 완료후 마스크 화면 제거 함수
async function endLoading() {
	console.log('endLoading');
	const [loadedImg, loadedVid] = await Promise.all([loadImg(), loadVid()]);
	console.log(loadedVid, loadedVid);

	if (loadedImg && loadedVid) {
		new Anime(mask, {
			prop: 'opacity',
			value: 0,
			duration: 1000,
			callback: () => mask.remove(),
		});
	}
}
