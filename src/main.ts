import { web } from "./application/web";
const PORT = process.env.PORT || 4000;

const startApp = (): void => {
    try {
        web.listen(PORT, (): void => {
            console.log(`Server listen on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
startApp();
