const validateTeamSchema = {
    name: {
        in: ['body'],
        isString: true,
        errorMessage: "Name is required and should be a string"
    },
    description: {
        in: ['body'],
        isString: true,
        errorMessage: "Description is required and should be a string"
    }
};
export default validateTeamSchema;