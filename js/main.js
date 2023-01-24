const banner = document.querySelector('.banner');
const list = banner.querySelector('ul');
const showNum = 3;

init();

function init() {
	list.style.left = -100 / showNum + '%';
	list.prepend(list.lastElementChild);
}
