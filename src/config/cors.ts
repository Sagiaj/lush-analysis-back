const whitelist = process.env.ALLOWED_DOMAINS;
console.log('CHECK ALLOWED DOMAINS:', process.env.ALLOWED_DOMAINS);
export const corsOptions = {
    origin: (origin: string, callback: CallableFunction) => {
        if (whitelist.split(',').indexOf(origin) !== -1) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    }
};
