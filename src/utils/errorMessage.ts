export const requiredMsg = (field: string) => {
    return `${field} is required`;
};

export const minCharacterMsg = (field: string, min: number) => {
    return `${field} should be at least ${min} character long`;
};

export const invalidUsernameFormatMsg = () => {
    return `Username can only contain letters, numbers, and underscores`;
};

export const maxCharacterMsg = (field: string, max: number) => {
    return `${field} should not be more than ${max} character long`;
};

export const invalidPasswordFormatMsg = () => {
    return `password must be at least with one uppercase letter, one lowercase letter, one number, and one special character`;
};
