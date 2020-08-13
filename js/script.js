const otherTitleElementSelector = 'input#other-title';
const shirtColorElementSelector = '#shirt-colors';
const colorSelectElementSelector = '#color';

/**
 * Get element based on the passed selector and add 'is-hidden' class to it
 * @param {string} selector - class or id of an element
 */
function hideElementBySelector(selector) {
    document.querySelector(selector).classList.add('is-hidden');
}


/**
 * Get element based on the passed selector and remove 'is-hidden' class from it
 * @param {string} selector - class or id of an element
 */
function showElementBySelector(selector) {
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
 * Display 'other title' input element when 'other' option
 * is selected from the 'job role' select element. Hide it when it's not selected.
 */
function jobRoleOtherTitleFunctionality() {
    let jobRoleSelect = document.querySelector('select#title');
    jobRoleSelect.addEventListener('change', e => {
        if (e.target.value == 'other') {
            showElementBySelector(otherTitleElementSelector);
            setFocusOnElementBySelector(otherTitleElementSelector);
        } else {
            hideElementBySelector(otherTitleElementSelector);
        }
    });
}


/**
 * Hide, display and configure the options of the 'color' select element based on
 * the values of the 'design' select element
 */
function tShirtDesignFunctionality() {
    let tShirtDesignElement = document.querySelector('select#design');
    tShirtDesignElement.addEventListener('change', e => {
        if (e.target.value == 'select') {
            hideElementBySelector(shirtColorElementSelector);
        } else {
            showElementBySelector(shirtColorElementSelector);
            if (e.target.value == 'js puns') {
                toggleSelectElement(colorSelectElementSelector, ['cornflowerblue', 'darkslategrey', 'gold']);
            } else if (e.target.value == 'heart js') {
                toggleSelectElement(colorSelectElementSelector, ['tomato', 'steelblue', 'dimgrey']);
            }
        }
    });
}


/**
 * Display only the passed options of the stated select element. Hide the others
 * @param {string} selector - attribute of the select element
 * @param {string[]} options - values of the options that shouldn't be hidden
 */
function toggleSelectElement(selector, options) {
    let selectElement = document.querySelector(selector);
    if (selectElement) {
        let selectedIndices = [];
        for (let i = 0; i < selectElement.options.length; ++i) {
            let option = selectElement.options[i];
            if (options.includes(option.value)) {
                option.classList.remove('is-hidden');
                selectedIndices.push(i);
            } else {
                option.classList.add('is-hidden');
            }
        }

        // Mark the first non-hidden option as selected
        selectElement.selectedIndex = selectedIndices[0];
    }
}


document.addEventListener('DOMContentLoaded', () => {
    hideElementBySelector(otherTitleElementSelector);
    hideElementBySelector(shirtColorElementSelector);
    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
});