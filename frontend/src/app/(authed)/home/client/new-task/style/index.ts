import { createStyles } from "antd-style";

const useStyles = createStyles(({ css, token }) => {
    return {
        form: css`
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);        
        `,
        flex: css`
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 75%;
        `,
    }
});

export default useStyles;