/**
 * Display 'other title' input field when 'other' option
 * is selected from the 'job role' select field. Hide it when it's not selected.
 */
function jobRoleOtherTitleFunctionality() {
    let jobRoleSelect = document.querySelector('select#title');
    jobRoleSelect.addEventListener('change', e => {
        if (e.target.value == 'other') {
            displayOtherTitleField();
            setFocusOnOtherTitleField();
        } else {
            hideOtherTitleField();
        }
    });
}


/**
 * Remove hidden class from 'other-title' input field
 */
function displayOtherTitleField() {
    document.querySelector('input#other-title').classList.remove('is-hidden');
}


/**
 * Add hidden class to the 'other-title' input field
 */
function hideOtherTitleField() {
    document.querySelector('input#other-title').classList.add('is-hidden');
}


/**
 * Sets focus on the 'other title' input field
 */
function setFocusOnOtherTitleField() {
    document.querySelector('input#other-title').focus();
}


document.addEventListener('DOMContentLoaded', () => {
    hideOtherTitleField();
    jobRoleOtherTitleFunctionality();
});