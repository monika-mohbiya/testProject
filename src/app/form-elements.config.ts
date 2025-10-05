export const formElements = [
    { type: 'text', label: 'Text Input', placeholder: 'Name', controlName: 'Name', pattern: '^[A-Za-z]+( [A-Za-z]+)*$', minLength: 3, maxLength: 30, required: true, requiredPattern: /^[A-Za-z]+( [A-Za-z]+)*$/, errorKey: 'nottxt', txttype: 'word' },
    {
        type: 'email', label: 'Email Input', placeholder: 'Email', controlName: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', minLength: null, maxLength: null, required: true, requiredPattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        errorKey: 'notEmail'
    },
    {
        type: 'text', label: 'Number Input', placeholder: 'Number', controlName: 'Number', pattern: '^[0-9]+$', minLength: 10, maxLength: 10, required: true, txttype: 'number', requiredPattern: /^[0-9]+$/,
        errorKey: 'notNumber'
    },
    { type: 'date', label: 'Date Input', placeholder: 'Date', controlName: 'Date', pattern: '', minLength: null, maxLength: null, required: true },
    { type: 'select', label: 'Country', placeholder: 'Country', controlName: 'Country', options: ['India', 'USA', 'UK'], pattern: '', minLength: null, maxLength: null, required: true },
    { type: 'checkbox', label: 'Accept Terms', placeholder: 'Terms', controlName: 'Terms', pattern: '', minLength: null, maxLength: null, required: true }
];