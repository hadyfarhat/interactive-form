const otherTitleFieldSelector = 'input#other-title';
const shirtColorFieldSelector = '#shirt-colors';


/**
 * Display 'other title' input field when 'other' option
 * is selected from the 'job role' select field. Hide it when it's not selected.
 */
function jobRoleOtherTitleFunctionality() {
    let jobRoleSelect = document.querySelector('select#title');
    jobRoleSelect.addEventListener('change', e => {
        if (e.target.value == 'other') {
            showFieldBySelector(otherTitleFieldSelector);
            setFocusOnElementBySelector(otherTitleFieldSelector);
        } else {
            hideFieldBySelector(otherTitleFieldSelector);
        }
    });
}


/**
 * Get element based on the passed selector and add 'is-hidden' class to it
 * @param {string} selector - class or id of an element
 */
function hideFieldBySelector(selector) {
    document.querySelector(selector).classList.add('is-hidden');
}


/**
 * Get element based on the passed selector and remove 'is-hidden' class from it
 * @param {string} selector - class or id of an element
 */
function showFieldBySelector(selector) {
    document.querySelector(selector).classList.remove('is-hidden');
}


/**
 * Get element based on the passed selector and set focus on it
 * @param {string} selector - class or id of an element
 */
function setFocusOnElementBySelector(selector) {
    document.querySelector(selector).focus();
}


/**
 * Hide, display and configure the options of the 'color' select field based on
 * the values of the 'design' select field
 */
function tShirtDesignFunctionality() {
    let tShirtDesignField = document.querySelector('select#design');
    tShirtDesignField.addEventListener('change', e => {
        if (e.target.value == 'select') {
            hideFieldBySelector(shirtColorFieldSelector);
        } else {
            showFieldBySelector(shirtColorFieldSelector);
            if (e.target.value == 'js puns') {
                toggleSelectField('color', ['cornflowerblue', 'darkslategrey', 'gold']);
            } else if (e.target.value == 'heart js') {
                toggleSelectField('color', ['tomato', 'steelblue', 'dimgrey']);
            }
        }
    });
}


/**
 * Display only the passed options of the stated select field. Hide the others
 */
function toggleSelectField(id, options) {
    let selectField = document.querySelector(`#${id}`);
    if (selectField) {
        for (let i = 0; i < selectField.options.length; ++i) {
            let option = selectField.options[i];
            if (options.includes(option.value)) {
                option.classList.remove('is-hidden');
            } else {
                option.classList.add('is-hidden');
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    hideFieldBySelector(otherTitleFieldSelector);
    hideFieldBySelector(shirtColorFieldSelector);
    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
});