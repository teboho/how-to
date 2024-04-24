import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
        border: css`
            border: 1px solid red;
        `,
        flex: css`
            height: 100%;
        `,
        header: css`
            background: ${token.colorBgContainer};
            padding: 0;

        `,
        toggle: css`
            font-size: 16px;
            width: 64px;
            height: 64px;
        `,
        content: css`
            margin: 24px 16px;
            padding: 24px;
            min-height: 280px;
            background: ${token.colorBgContainer}
        `,
        logout: css`
            display: float;
            bottom: 0;
        `
    }
});

export default useStyles;