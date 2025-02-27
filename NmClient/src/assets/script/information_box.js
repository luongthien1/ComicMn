function info(el, content) {
    var info_box = document.getElementById('info-box');
    const y = el.offsetTop;
    const x = el.offsetLeft;
    const h = el.offsetHeight;
    
    const position = {
        top: y + h,
        left: x
    }
    info_box.style.top = position.top + 'px';
    info_box.style.left = position.left + 'px';
    info_box.style.display = 'block';
    info_content = document.getElementById('info-description');
    info_content.innerHTML = content;
}

function hideinfo() {
    document.getElementById('info-box').style.display = 'none';
}