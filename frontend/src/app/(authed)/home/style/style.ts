import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
        border: css`
            border: 1px solid red;
        `,
        mainlayout: css`
            height: 100%;
            background: #E5E3D2;
        `,
        layout: css`
            height: 100%;
            background: #E5E3D2;
            overflow: auto;
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
            margin: 0 0 24px 0;
            padding: 20px;
            overflow: auto;
        `,
        header: css`
            background: ${token.colorBgContainer};
            padding: 0 10px;
            margin: 0 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        `,
        toggle: css`
            font-size: 16px;
            width: 64px;
            height: 64px;
        `,
        logout: css`
            display: float;
            bottom: 0;
        `,
        offsetUp: css`
            padding-bottom: 100px;
            margin: 0;
        `
    }
});

export default useStyles;