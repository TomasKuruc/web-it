import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const showConfirmationAlert = (deleteCallBack: () => any): void => {
    const options = {
        title: 'Delete file',
        message: 'Are you sure to do this?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteCallBack()
            },
            {
                label: 'No',
                onClick: () => null
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options);
}