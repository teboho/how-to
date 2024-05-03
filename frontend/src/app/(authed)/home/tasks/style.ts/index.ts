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
            padding-top: 0;
            padding-bottom: 20px;
            overflow: auto;
            overflow-x: hidden;
            overflow-y: scroll;
        `,
        sider: css`
            height: 100%;
            background: #E5E3D2;
            border: 1px solid #B64326;
            border-radius: 20px;
            padding: 0 20px;
            margin: 0 1px;
        `,
        menu: css`
            border: 1px solid #B64326;
            background: #E5E3D2;
        `,
        content: css`
            height: 100%;
            padding: 10px;
            margin: 0;
            min-height: 280px;
            border: 1px solid #B64326;
            border-radius: 20px;
            overflow: auto;
        `,
        header: css`
            background: ${token.colorBgContainer};
            padding: 0 20px 20px 40px;
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
        `
    }
});

export default useStyles;