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
 * Change 12 hour format to 24 hour format. ex 1pm changes to 13
 * @example
 * // returns 13
 * change12to24HourFormat('1pm')
 * @example
 * // returns 9
 * change12to24HourFormat('9am')
 * @param {string} time - 12 hour format time
 * @return {int} 24 hour format time
 */
function change12to24HourFormat(time) {
    let hour = parseInt(time.match(/^(\d+)/g)[0]);
    let ampm = time.match(/\w\w$/g)[0];
    
    if (ampm == 'am') {
        return (hour == 12) ? 0 : hour;
    }

    return (hour == 12) ? 12 : hour + 12;
}


/**
 * Accepts two 24 hour format time parameters and returns their 1 hour
 * time slots range. 
 * @example
 * // returns ['11-12', '12-13', '13-14', '14-15']
 * getTimeSlotsBetweenRange(11, 15)
 * @param {int} start - start of time range
 * @param {int} end - end of time range
 * @return {string[]} time slots range
 */
function getTimeSlotsBetweenRange(start, end) {
    let timeSlots = [];
    for (let i = start; i < end; ++i) {
        timeSlots.push(`${i}-${i+1}`);
    }

    return timeSlots;
}


/**
 * Extracts the day from day and time format
 * @example
 * // returns 'Tuesday'
 * getDayFromDayAndTimeStr('Tuesday 9am-12pm')
 * @param {string} dayAndTime - day and time string format
 * @return {string} returns the day from the date and time string
 */
function getDayFromDayAndTimeStr(dayAndTime) {
    return dayAndTime.match(/^\w+/)[0];
}


/**
 * Extracts the time from day and time string format
 * @example 
 * // returns ['9am', '12pm']
 * getTimeFromDayAndTimeStr('Tuesday 9am-12pm')
 * @param {string} dayAndTime - day and time string format
 * @return {string[]} returns an array of the two 12 hour format times
 */
function getTimeFromDayAndTimeStr(dayAndTime) {
    let timeSlot = /(\d+\w\w)-(\d+\w\w)$/.exec(dayAndTime);
    return (timeSlot) ? [timeSlot[1], timeSlot[2]] : [];
}


document.addEventListener('DOMContentLoaded', () => {
    hideElementBySelector(otherTitleElementSelector);
    hideElementBySelector(shirtColorElementSelector);

    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
    activityRegistrationFunctionality();
});