// custom.d.ts or types.d.ts (make sure to import express)


declare global {
    namespace Express {
        interface Request {
            user?: any; // Add any properties you need, such as 'id', 'role', etc.
        }
    }
}

