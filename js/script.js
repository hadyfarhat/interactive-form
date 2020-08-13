const otherTitleFieldSelector = 'input#other-title';
const shirtColorFieldSelector = '#shirt-colors';
const colorSelectFieldSelector = '#color';

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
                toggleSelectField(colorSelectFieldSelector, ['cornflowerblue', 'darkslategrey', 'gold']);
            } else if (e.target.value == 'heart js') {
                toggleSelectField(colorSelectFieldSelector, ['tomato', 'steelblue', 'dimgrey']);
            }
        }
    });
}


/**
 * Display only the passed options of the stated select field. Hide the others
 * @param {string} selector - attribute of the select element
 * @param {string[]} options - values of the options that shouldn't be hidden
 */
function toggleSelectField(selector, options) {
    let selectField = document.querySelector(selector);
    if (selectField) {
        let selectedIndices = [];
        for (let i = 0; i < selectField.options.length; ++i) {
            let option = selectField.options[i];
            if (options.includes(option.value)) {
                option.classList.remove('is-hidden');
                selectedIndices.push(i);
            } else {
                option.classList.add('is-hidden');
            }
        }

        // Mark the first non-hidden option as selected
        selectField.selectedIndex = selectedIndices[0];
    }
}


document.addEventListener('DOMContentLoaded', () => {
    hideFieldBySelector(otherTitleFieldSelector);
    hideFieldBySelector(shirtColorFieldSelector);
    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
});