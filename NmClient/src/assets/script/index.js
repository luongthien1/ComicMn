window.addEventListener('DOMContentLoaded', () => {    
    const elements = document.querySelectorAll('[subinfo]');
    elements.forEach(el => {
        el.addEventListener('mouseover', function() {
            subinfo = el.getAttribute('subinfo');
            console.log(subinfo)
            if (subinfo != undefined) {
                if (subinfo == '' || subinfo == 'null') {
                    content = 'No information available';
                }
                else content = subinfo;
                info(el, content);
            }
        });
        el.addEventListener('mouseout', function() {
            hideinfo();
        });
    });
});