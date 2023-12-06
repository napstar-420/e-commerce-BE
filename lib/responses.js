module.exports = {
    /**
     * Validation responses
     * */
    EMAIL_IS_REQUIRED: 'Email is required',
    EMAIL_LENGTH_ERROR: 'Email length should be less than or equal to 100',
    INVALID_EMAIL: 'Invalid Email',
    EMAIL_OCCUPIED: 'An account with this email already exists',

    USERNAME_IS_REQUIRED: 'Username is required',
    USERNAME_LENGTH_ERROR: 'Username length should be less than or equal to 100',
    USERNAME_OCCUPIED: 'Username taken',

    INCORRECT_PASSWORD: 'Incorrect Password',
    INVALID_PASSWORD: 'Password must include at least one number, one special character, one lowercase letter, one uppercase letter, and between 8 to 16 characters long and the string should not start or end with space',
    PASSWORD_IS_REQUIRED: 'Password is required',

    NAME_IS_REQUIRED: 'Name is required',
    NAME_LENGTH_ERROR: 'Name length should be less than or equal to 100',

    INVALID_ROLE: 'Role must be employee or admin',

    BRAND_NAME_IS_REQUIRED: 'Brand name is required',
    BRAND_NAME_LENGTH_ERROR: 'Brand name length should be less than or equal to 100',
    INVALID_BRAND_NAME: 'Brand with same name already exists',
    BRAND_DESC_LENGTH_ERROR: 'Brand description length should be less than or equal to 255',
    BRAND_CREATED: 'Brand created',

    // User responses
    USER_NOT_FOUND: 'User not found',
    USER_CREATED: 'User created',

    // General responses
    SOMETHING_WENT_WRONG: 'Something went wrong',
}