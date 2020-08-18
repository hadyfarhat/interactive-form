const otherTitleContainerElementSelector = 'div.other-title-container';
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
            showElementBySelector(otherTitleContainerElementSelector);
            setFocusOnElementBySelector(otherTitleElementSelector);
        } else {
            hideElementBySelector(otherTitleContainerElementSelector);
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
 * Change 12 hour format to 24 hour format.
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
 * @param {boolean} checked - determine whether to disable the activity or not
 * @param {input HTML element} activity - activity input checkbox element
 */
function activateOrDisableActivity(checked, activity) {
    if (checked) {
        activity.parentNode.classList.add('disabled');
        activity.setAttribute('disabled', true);
    } else {
        activity.parentNode.classList.remove('disabled');
        activity.removeAttribute('disabled');
    }
}


/**
 * Toggle other activities based on the state of the passed activity
 * @param {input HTML element} currentActivity - activity input checkbox element
 * @param {string} currentActivityDay - day of the passed activity
 * @param {boolean} checked - activity input element is checked or not
 */
function toggleActivitiesThatAreOnTheSameDay(currentActivity, currentActivityDay, checked) {
    let currentActivityTimeSlots = getTimeSlotsFromDayAndTime(currentActivity.dataset.dayAndTime);
    let activitiesOnSameDay = getAllActivitiesByDay(currentActivityDay);

    for (let i = 0; i < activitiesOnSameDay.length; ++i) {
        if (activitiesOnSameDay[i] == currentActivity) continue;

        let dayAndTime = activitiesOnSameDay[i].dataset.dayAndTime;
        let timeSlots = getTimeSlotsFromDayAndTime(dayAndTime);

        if (timeSlotsCollide(timeSlots, currentActivityTimeSlots)) {
            activateOrDisableActivity(checked, activitiesOnSameDay[i]);
        }
    }
}


/**
 * If the passed activity is checked, add it's cost to the total cost.
 * If it's not, subtract its cost from the total cost.
 * @param {int} currentActivityCost - cost of the passed activity
 * @param {boolean} checked - activity input element is checked or not
 */
function calculateActivitiesTotalCost(currentActivityCost, checked) {
    let totalCostElement = document.querySelector('#activities-total-cost');
    let totalCost = parseInt(totalCostElement.textContent);
    (checked) ? totalCost += currentActivityCost : totalCost -= currentActivityCost;
    totalCostElement.textContent = totalCost;
}


/**
 * Activate or Disable competing activities based on the checked activity
 * Caculate total cost of the activites
 */
function activityRegistrationFunctionality() {
    let activitiesElement = document.querySelector('fieldset.activities');
    activitiesElement.addEventListener('change', e => {
        if (e.target.tagName == 'INPUT') {
            let currentActivity = e.target;
            let checked = (currentActivity.checked) ? true : false;

            if (currentActivity.dataset.dayAndTime) {
                let currentActivityDay = getDayFromDayAndTimeStr(currentActivity.dataset.dayAndTime);
                toggleActivitiesThatAreOnTheSameDay(currentActivity, currentActivityDay, checked);
            }
            
            let currentActivityCost = parseInt(currentActivity.dataset.cost);
            calculateActivitiesTotalCost(currentActivityCost, checked);
        }
    });
}


/**
 * Returns payment option selected
 * @return {string} payment option selected
 */
function paymentOptionSelected() {
    const selectPayment = document.querySelector('#payment');
    return selectPayment.value;
}


/**
 * Hide all payment options except for the one stated below
 * @param {string} option - class name of the payment option to be used/selected
 */
function setPaymentOption(option) {
    const selectPayment = document.querySelector('#payment');
    for (let i = 0; i < selectPayment.options.length; ++i) {
        if (selectPayment.options[i].value == option) {
            selectPayment.options[i].selected = true;
            break;
        }
    }

    const paymentMethods = document.querySelectorAll('.payment-option');
    for (let i = 0; i < paymentMethods.length; ++i) {
        if (paymentMethods[i].id != option) {
            paymentMethods[i].classList.add('is-hidden');
        } else {
            paymentMethods[i].classList.remove('is-hidden');
        }
    }
}


/**
 * Add change event listener to the payment option drop down menu
 */
function paymentOptionFunctionality() {
    const selectPayment = document.querySelector('#payment');
    selectPayment.addEventListener('change', e => {
        setPaymentOption(e.target.value);
    });
}


/**
 * Checks if the given string has a length greater than 0
 * @param {string} str
 */
function strIsNotEmpty(str) {
    return str.trim().length > 0;
}


/**
 * Checks if the given string contains digits/numbers only
 * @param {string} str
 */
function strContainsNumbersOnly(str) {
    return /^\d+$/g.test(str.trim());
}


/**
 * Display the given error element with the given error message if
 * displayError is true. Otherwise, hide them.
 * @param {HTML element} errorElement - error element to be displayed if invalid
 * @param {string} message - error message that will be displayed
 * @param {boolean} displayError - display error message or hide it
 */
function toggleValidationErrorMessageForElement(errorElement, message, displayError) {
    if (displayError) {
        errorElement.firstElementChild.textContent = message;
        errorElement.classList.remove('is-hidden');
    } else {
        errorElement.firstElementChild.textContent = "";
        errorElement.classList.add('is-hidden');
    }
}


/**
 * Calls the given validation function. If it returns true, display the given
 * error element along with its error message. Otherwise, hide them.
 * @param {function} elementIsValid - validation function
 * @param {HTML element} element - error element to be displayed if invalid
 * @param {string} errorMessage - message to be displayed if validation fails
 */
function validateElemenet(elementIsValid, errorElement, errorMessage) {
    const valid = elementIsValid();
    if (!valid) {
        toggleValidationErrorMessageForElement(errorElement, errorMessage, true);
    } else {
        toggleValidationErrorMessageForElement(errorElement, '', false);
    }
}


/**
 * Adds change event listener to the given element. On change, the given
 * validation function will be called.
 * @param {HTML element} element - element that will be validated
 * @param {function} elementIsValid - element validation function
 * @param {HTML element} errorElement - error element to be displayed if invalid
 * @param {string} errorMessage - message to be displayed if validation fails
 */
function validateElemenetOnChange(element, elementIsValid, errorElement, errorMessage) {
    element.addEventListener('change', () => {
        validateElemenet(
            elementIsValid,
            errorElement,
            errorMessage
        )
    });
}


/**
 * Checks if the name Field is valid by checking the 
 * length of the name is greater than 0
 * @return {boolean} if it's valid or not
 */
function nameFieldIsValid() {
    const name = document.querySelector('input#name');
    return strIsNotEmpty(name.value.trim());
}


/**
 * Checks if the email field value matches the stated regex expression
 * @return {boolean} if email value matches regex
 */
function emailFieldIsValid() {
    const email = document.querySelector('input#mail');
    const regex = /^[^@.]+@[^@.]+\.[^@.]+$/;
    return regex.test(email.value.trim());
}


/**
 * If "Other" is selected in the Job Role, it checks if field is empty or not
 * @return {boolean} if field is empty
 */
function jobRoleIsValid() {
    const title = document.querySelector('#title');
    if (title.value == 'other') {
        const otherTitle = document.querySelector('#other-title');
        if (!strIsNotEmpty(otherTitle.value)) return false;
    }

    return true;
}


/**
 * Checks if at least one checkbox is checked
 * @return {boolean} if at least one checkbox is checked
 */
function activityRegistrationIsValid() {
    const activities = document.querySelector('fieldset.activities');
    const checkboxes = activities.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; ++i) {
        if (checkboxes[i].checked) return true;
    }

    return false;
}


/**
 * Checks if 'select' is not selected in tshirt design
 * @return {boolean} if 'select' is not selected
 */
function tShirtDesignIsValid() {
    const design = document.querySelector('select#design');
    return (design.value == 'select') ? false : true;
}


/**
 * Checks if payment drop down menu is not equal to 'Select Payment Method'
 * @return {boolean} if payment method is not equal to 'select method'
 */
function paymentMethodIsValid() {
    const payment = document.querySelector('select#payment');
    return (payment.value != 'select method');
}


/**
 * Checks if card number is 13-16 digits long
 * @return {boolean} if card number is within the correct range
 */
function cardNumberIsValid() {
    const cardNumber = document.querySelector('input#cc-num').value.trim();
    return (cardNumber.length >= 13 && cardNumber.length <= 16);
}


/**
 * Checks if card number is not empty
 * @return {boolean} is card number is not empty
 */
function cardNumberIsNotEmpty() {
    const cardNumber = document.querySelector('input#cc-num').value.trim();
    return strIsNotEmpty(cardNumber);
}


/**
 * Checks if zip code is 5 digits long
 * @return {boolean} if zip code is within the correct range
 */
function zipCodeIsValid() {
    const zipCode = document.querySelector('input#zip').value.trim();
    return zipCode.length == 5;
}


/**
 * Checks if cvv is 3 digits long
 * @return {boolean} if cvv is within the correct range
 */
function cvvIsValid() {
    const cvv = document.querySelector('input#cvv').value.trim();
    return cvv.length == 3;
}


const validations = {
    name: {
        html: document.querySelector('input#name'),
        errorElement: document.querySelector('div.name-error'),
        elementIsValid: nameFieldIsValid,
        errorMessage: 'Name should not be empty',
        isCreditCard: false
    }, 
    email: {
        html: document.querySelector('input#mail'),
        errorElement: document.querySelector('div.mail-error'),
        elementIsValid: emailFieldIsValid,
        errorMessage: 'Email should be in the format: test@example.com',
        isCreditCard: false
    },
    jobRoleOtherTitle: {
        html: document.querySelector('input#other-title'),
        errorElement: document.querySelector('div.other-title-error'),
        elementIsValid: jobRoleIsValid,
        errorMessage: 'Job Role field should not be empty',
        isCreditCard: false
    },
    tShirtDesign: {
        html: document.querySelector('select#design'),
        errorElement: document.querySelector('div.design-error'),
        elementIsValid: tShirtDesignIsValid,
        errorMessage: 'You should select a t-shirt design theme',
        isCreditCard: false
    },
    activityRegistration: {
        html: document.querySelector('.activities'),
        errorElement: document.querySelector('div.activities-error'),
        elementIsValid: activityRegistrationIsValid,
        errorMessage: 'At least one activity should be checked',
        isCreditCard: false
    },
    paymentMethod: {
        html: document.querySelector('select#payment'),
        errorElement: document.querySelector('div.payment-method-error'),
        elementIsValid: paymentMethodIsValid,
        errorMessage: 'Please select a payment method',
        isCreditCard: false
    },
    cardNumber: {
        html: document.querySelector('input#cc-num'),
        errorElement: document.querySelector('div.card-number-empty-error'),
        elementIsValid: cardNumberIsNotEmpty,
        errorMessage: 'Card number should not be empty',
        isCreditCard: true
    },
    cardNumber2: {
        html: document.querySelector('input#cc-num'),
        errorElement: document.querySelector('div.card-number-digits-error'),
        elementIsValid: cardNumberIsValid,
        errorMessage: 'Card number should be 13-16 digits long',
        isCreditCard: true
    },
    zipCode: {
        html: document.querySelector('input#zip'),
        errorElement: document.querySelector('div.zip-error'),
        elementIsValid: zipCodeIsValid,
        errorMessage: 'Zip Code field should be 5 digits long',
        isCreditCard: true
    },
    cvv: {
        html: document.querySelector('input#cvv'),
        errorElement: document.querySelector('div.cvv-error'),
        elementIsValid: cvvIsValid,
        errorMessage: 'CVV field should be 3 digits long',
        isCreditCard: true
    }
};


/**
 * Validate the form on submit
 */
function validateFormOnSubmit() {
    const form = document.querySelector('form');
    let formIsValid = true;

    form.addEventListener('submit', e => {
        formIsValid = true;
        for (let element in validations) {
            let validate = true;
            if (validations[element]['isCreditCard']) {
                validate = 
                    (paymentOptionSelected() == 'credit-card') ? true : false
            }
            if (validate) {
                if (!validations[element]['elementIsValid']()) {
                    formIsValid = false;
                    validateElemenet(
                        validations[element]['elementIsValid'],
                        validations[element]['errorElement'],
                        validations[element]['errorMessage']
                    )
                }
            }
        }

        if (!formIsValid) {
            e.preventDefault();
        }
    });
}


/**
 * Main method for validating the form
 */
function formValidationFunctionality() {
    for (let element in validations) {
        let validate = true;
        if (validations[element]['isCreditCard']) {
            validate = 
                (paymentOptionSelected() == 'credit-card') ? true : false
        }
        if (validate) {
            validateElemenetOnChange(
                validations[element]['html'],
                validations[element]['elementIsValid'],
                validations[element]['errorElement'],
                validations[element]['errorMessage']
            )
        }
    }
    
    validateFormOnSubmit();
}


document.addEventListener('DOMContentLoaded', () => {
    hideElementBySelector(otherTitleContainerElementSelector);
    hideElementBySelector(shirtColorElementSelector);
    setPaymentOption('credit-card');

    jobRoleOtherTitleFunctionality();
    tShirtDesignFunctionality();
    activityRegistrationFunctionality();
    formValidationFunctionality();
    paymentOptionFunctionality();
});