module.exports = {
    /**
     *  Must include at least one number, one special character,
     * one lowercase letter, one uppercase letter,
     * and be at least 8 characters long and
     * the string should not start or end with space
     */
    PASSWORD_REGEX: /^(?=.*[0-9])(?=.*[!@#$%^&*()-=_+`~{}[\]:;<>,.?/\\|])(?=.*[a-z])(?=.*[A-Z])\S.{7,}\S$/,
    USER_ROLES: {
        EMPLOYEE: 'employee',
        ADMIN: 'admin',
    },

    SERVER_STATUSES: {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
    },

    ALLOWED_IMAGES_FORMAT: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    allowedOrigins: ['http://localhost:5173', undefined],
}