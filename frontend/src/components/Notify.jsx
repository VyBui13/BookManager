import React from 'react';
import '../styles/Notify.css';

export function nofi(obj) {
    const main = document.getElementById('nofi');
    const icons = {
        success: 'fa-check',
        error: 'fa-info',
        warning: 'fa-exclamation',
    }
    if (main) {
        const el = document.createElement('div');
        el.classList.add('nofi');
        el.classList.add('nofi--' + obj.type);

        el.innerHTML = `
            <div class="nofi__icon">
                <i class="fa-solid ${icons[obj.type]}"></i>
            </div>
            <div class="nofi__content">
                <div class="nofi__content__title">
                    ${obj.type}
                </div>
                <div class="nofi__content__msg">
                    ${obj.msg}
                </div>
            </div>
            <div class="nofi__close">
                <i class="fa-solid fa-x"></i>
            </div>
        `;

        main.appendChild(el);
        setTimeout(() => {
            main.removeChild(main.firstElementChild);
        }, 3500);
    }
}

function Notify() {
    return (
        <div id="nofi"></div>
    )
}

export default Notify;