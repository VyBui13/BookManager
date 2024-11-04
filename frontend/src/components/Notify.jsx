import React from 'react';
import '../styles/Notify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from './NotificationContext';

function Error({ obj }) {
    console.log(obj);
    return (
        <div className="nofi nofi--error">
            <div class="nofi__icon">
                <FontAwesomeIcon icon={faInfo} className='icon__nofi' />

            </div>
            <div class="nofi__content">
                <div class="nofi__content__title">
                    {obj.type}
                </div>
                <div class="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div class="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Success({ obj }) {
    return (
        <div className="nofi nofi--success">
            <div class="nofi__icon">
                <FontAwesomeIcon icon={faCheck} className='icon__nofi' />
            </div>
            <div class="nofi__content">
                <div class="nofi__content__title">
                    {obj.type}
                </div>
                <div class="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div class="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Warning({ obj }) {
    return (
        <div className="nofi nofi--warning">
            <div class="nofi__icon">
                <FontAwesomeIcon icon={faExclamation} className='icon__nofi' />
            </div>
            <div class="nofi__content">
                <div class="nofi__content__title">
                    {obj.type}
                </div>
                <div class="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div class="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

// export function nofi(obj) {
//     const main = document.getElementById('nofi');
//     const icons = {
//         success: 'fa-check',
//         error: 'fa-info',
//         warning: 'fa-exclamation',
//     }
//     if (main) {
//         const el = document.createElement('div');
//         el.classList.add('nofi');
//         el.classList.add('nofi--' + obj.type);

//         el.innerHTML = `
//             <div class="nofi__icon">
//                 <i class="fa-solid ${icons[obj.type]}"></i>
//             </div>
//             <div class="nofi__content">
//                 <div class="nofi__content__title">
//                     ${obj.type}
//                 </div>
//                 <div class="nofi__content__msg">
//                     ${obj.msg}
//                 </div>
//             </div>
//             <div class="nofi__close">
//                 <i class="fa-solid fa-x"></i>
//             </div>
//         `;

//         main.appendChild(el);
//         setTimeout(() => {
//             main.removeChild(main.firstElementChild);
//         }, 3500);
//     }
// }

function Notify() {
    const { notification } = useNotification();

    return (
        <div id="nofi">
            {notification && notification.type === 'error' && <Error obj={notification} />}
            {notification && notification.type === 'success' && <Success obj={notification} />}
            {notification && notification.type === 'warning' && <Warning obj={notification} />}
        </div>
    )
}

export default Notify;