import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
        border: css`
            border: 1px solid red;
        `,
        layout: css`
            height: 100%;
            background: #E5E3D2;
        `,
        sider: css`
            height: 100%;
            background: #E5E3D2;
            border: 1px solid #B64326;
        `,
        menu: css`
            border: 1px solid #B64326;
        `,
        content: css`
            height: 100%;
            background: #E5E3D2;
            border-top: 1px solid #B64326;
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