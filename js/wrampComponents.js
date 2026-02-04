window.changeSegment = (id, segment, value) => {
	let display = document.getElementById(id);
	let segmentClass = "display-no-" + segment;
	if (value == 1)
	{
		display.classList.add(segmentClass);
	}
	else
	{
		display.classList.remove(segmentClass);
	}
}

window.changeLED = (id, value) => {
	let LED = document.getElementById(id);
	if (value == 1)
	{
		LED.style.backgroundColor = "red";
	}
	else
	{
		LED.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--bs-body-color');
	}
}

window.changeSwitch = (id, value) => {
	let switchElement = document.getElementById(id);
	if (value == 1)
	{
		switchElement.checked = true;
	}
	else
	{
		switchElement.checked = false;
	}
}