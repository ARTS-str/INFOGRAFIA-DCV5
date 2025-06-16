let latamMap = document.getElementById('LATAM');
let uyPath = document.getElementById('UY');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 1
let maxScale = 10;
let timelineX, timelineY, timelineZ;

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPercent = round(window.scrollY / maxScroll * 100);

};

function setup(){
    timelineX = new Timeline();
    timelineX.addKeyframe(0.5, 200);
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 250));
    timelineY = new Timeline();
    timelineY.addKeyframe(0.5, 300);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 360));
    timelineZ = new Timeline();
    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 0.1));
}

function draw(){

    latamMap.setAttribute('viewBox', timelineX.valueAt(scrollPercent*10) +' '+ timelineY.valueAt(scrollPercent*10)  +' '+ 370 * timelineZ.valueAt(scrollPercent*10) + ' ' + 500 * timelineZ.valueAt(scrollPercent*10));

    uyPath.style.opacity = map(scrollPercent*2, 0, 100, 0, 1, true);
}