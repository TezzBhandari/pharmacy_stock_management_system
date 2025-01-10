import { z } from "zod";

const zodErrorFormatter = (err: z.ZodError) => {
    const errors: Array<Record<string, any>> = [];

    if (err instanceof z.ZodError) {
        err.issues.map((issue) => {
            const pathLength = issue.path.length;
            if (pathLength > 0) {
                errors.push({
                    property: issue.path[pathLength - 1],
                    message: issue.message,
                });
            }
        });
        return errors;
    }
    return errors;
};

export default zodErrorFormatter;
