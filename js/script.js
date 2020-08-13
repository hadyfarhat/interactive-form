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


/**
 * Hide, display and configure the options of the 'color' select field based on
 * the values of the 'design' select field
 */
function tShirtDesignFunctionality() {
    let tShirtDesignField = document.querySelector('select#design');
    tShirtDesignField.addEventListener('change', e => {
        if (e.target.value == 'select') {
            hideShirtColorsField();
        } else {
            displayShirtColorsField();
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


/**
 * Remove hidden class from the 'shirt-colors' field
 */
function displayShirtColorsField() {
    document.querySelector('div#shirt-colors').classList.remove('is-hidden');
}


/**
 * Add hidden class to the 'shirt-colors' field
 */
function hideShirtColorsField() {
    document.querySelector('div#shirt-colors').classList.add('is-hidden');
}


document.addEventListener('DOMContentLoaded', () => {
    hideOtherTitleField();
    // hideShirtColorsField();
    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
});