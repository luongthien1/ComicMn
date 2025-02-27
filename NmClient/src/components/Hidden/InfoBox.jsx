import React from "react";

export default class InfoBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    static info(el, content) {
        var info_box = document.getElementById('info-box');
        const rect = el.getBoundingClientRect()
        info_box.style.top = rect.bottom + 'px';
        info_box.style.left = rect.left + 'px';
        info_box.style.display = 'block';
        document.getElementById('info-description').innerHTML = content;
    }
    
    static hideinfo(el, mouseX, mouseY, force = false) {
        if (force) {
            document.getElementById('info-box').style.display = 'none';
            return;
        }
        const info_box = document.getElementById('info-box');
        const result = [el, info_box].map((el) => {
            const rect = el.getBoundingClientRect();
            return !(mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom)
        })
        if (result.includes(false)) return;
        else document.getElementById('info-box').style.display = 'none';
    }

    render() {
        return (
        <div id="info-box"
            onMouseLeave={(event) => {
                InfoBox.hideinfo(event.target, event.clientX, event.clientY);
            }}>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="info">
                        <div class="info-content">
                            <div id="info-description"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}