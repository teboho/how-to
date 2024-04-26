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
            background: #E5E3D2;
        `,
        content: css`
            height: 100%;
            margin: 24px 16px;
            padding: 20px;
            min-height: 280px;
        `,
        header: css`
            background: ${token.colorBgContainer};
            padding: 20px;
            margin: 0 16px;
        `,
        toggle: css`
            font-size: 16px;
            width: 64px;
            height: 64px;
        `,
        logout: css`
            display: float;
            bottom: 0;
        `
    }
});

export default useStyles;