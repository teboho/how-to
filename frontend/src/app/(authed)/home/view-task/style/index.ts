import { createStyles } from "antd-style";

const useStyles = createStyles(({ css, token }) => {
    return {
        form: css`
            border: 1px solid #B64326;
            border-radius: 20px;
            padding: 20px;
        `,
        flex: css`
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 75%;
        `,
        border: css`
            border: 1px solid #B64326;
            border-radius: 20px;
            padding: 20px;
        `,
    }
});

export default useStyles;