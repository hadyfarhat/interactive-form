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


/**
 * Loops through all of the activities and returns an array of activites 
 * that have the same day as the day parameter
 * @param {string} day - string representation of a day
 * @return {string[]} an array of days
 */
function getAllActivitiesByDay(day) {
    let activitiesElement = document.querySelector('fieldset.activities');
    let activities = activitiesElement.querySelectorAll('input[type="checkbox"]');
    let foundActivities = [];
    for (let i = 0; i < activities.length; ++i) {
        let activity = activities[i];
        if (activity.dataset.dayAndTime) {
            let activityDay = getDayFromDayAndTimeStr(activity.dataset.dayAndTime);
            if (activityDay == day) foundActivities.push(activity);
        } 
    }

    return foundActivities;
}


/**
 * Calculates the time slots of the given time
 * @example
 * // returns ['11-12', '12-13', '13-14', '14-15']
 * getTimeSlotsFromDayAndTime('Tuesday 11am-3pm')
 * @param {string} dayAndTime - day and time string format
 * @return {string[]} array of time slots
 */
function getTimeSlotsFromDayAndTime(dayAndTime) {
    let day = getDayFromDayAndTimeStr(dayAndTime);
    let time = getTimeFromDayAndTimeStr(dayAndTime);
    let startTime = change12to24HourFormat(time[0]);
    let endTime = change12to24HourFormat(time[1]);
    let timeSlots = getTimeSlotsBetweenRange(startTime, endTime);

    return timeSlots;
}


/**
 * Checks if the two given time slots arrays have elements in common
 * @param {string[]} timeSlots1 
 * @param {string[]} timeSlots2 
 * @return {boolean} whether the two arrays have elements in common or not
 */
function timeSlotsCollide(timeSlots1, timeSlots2) {
    for (let i = 0; i < timeSlots1.length; ++i) {
        if (timeSlots2.includes(timeSlots1[i])) {
            return true;
        }
    }

    return false;
}


/**
 * Activate or disable the passed activity
 * @param {boolean} disable - determine whether to disable the activity or not
 * @param {input HTML element} activity - activity input checkbox element
 */
function activateOrDisableActivity(disable, activity) {
    if (disable) {
        activity.parentNode.classList.add('disabled');
        disable.setAttribute('disabled', true);
    } else {
        activity.parentNode.classList.remove('disabled');
        disable.removeAttribute('disabled');
    }
}


/**
 * Toggle other activities based on the state of the passed activity
 * @param {input HTML element} currentActivity - activity input checkbox element
 * @param {string} currentActivityDay - day of the passed activity
 * @param {boolean} disable - determine whether to disable the activity or not
 */
function toggleActivitiesThatAreOnTheSameDay(currentActivity, currentActivityDay, disable) {
    let currentActivityTimeSlots = getTimeSlotsFromDayAndTime(currentActivity.dataset.dayAndTime);
    let activitiesOnSameDay = getAllActivitiesByDay(currentActivityDay);

    for (let i = 0; i < activitiesOnSameDay.length; ++i) {
        if (activitiesOnSameDay[i] == currentActivity) continue;

        let dayAndTime = activitiesOnSameDay[i].dataset.dayAndTime;
        let timeSlots = getTimeSlotsFromDayAndTime(dayAndTime);

        if (timeSlotsCollide(timeSlots, currentActivityTimeSlots)) {
            activateOrDisableActivity(disable, activitiesOnSameDay[i]);
        }
    }
}


/**
 * Activate or Disable competing activities based on the checked activity
 */
function activityRegistrationFunctionality() {
    let activitiesElement = document.querySelector('fieldset.activities');
    activitiesElement.addEventListener('change', e => {
        if (e.target.tagName == 'INPUT' && e.target.dataset.dayAndTime) {
            let currentActivity = e.target;
            let currentActivityDay = getDayFromDayAndTimeStr(currentActivity.dataset.dayAndTime);
            let disable = (currentActivity.checked) ? true : false;
            toggleActivitiesThatAreOnTheSameDay(currentActivity, currentActivityDay, disable);
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    hideElementBySelector(otherTitleElementSelector);
    hideElementBySelector(shirtColorElementSelector);

    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
    activityRegistrationFunctionality();
});