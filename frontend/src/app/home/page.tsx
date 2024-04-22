import { logger } from "@/../logger"; // importing the logger

export default function HomePage() {
    logger.info("Home Page called "); // calling our logger
    return (
        <div>
            <h3>Home Page</h3>
        </div>
    );
}