import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
        section: css`
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        `,
        article: css`
            padding: 20px;
        `,
        border: css`
            border: 1px solid red;
        `,
        mainlayout: css`
            height: 100%;
            background: #E5E3D2;
        `,
        layout: css`
            height: fit-content;
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
            padding: 20px;
            margin: 0 5px;
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
        `,
                'h-full': css`
            height: 100%;
        `,
        'right-inner-flex': css`
            margin: 0 auto;
            width: 100%;
        `,
        'font-large': css`
            font-size: 36px;
            color: #B64326;
        `,
        para: css`
            color: #B64326;
            font-size: 26px;
        `,
        title: css`
            color: white;
            font-size: 80px;
            text-align: center;
        `,
        button: css`
            font-weight: bold;
            background: #B64326;
            color: white;
        `,
        form: css`
            width: 100%;
            max-width: 600px;
            padding: 20px 20px 0 20px;
            background: #E5E3D2;
            border-radius: 20px;
            box-shadow: 2px 2px 10px grey;
        `,
        'form-item': css`
            font-size: 20px;
        `,
        'box-shadow': css`
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        `
    }
});

export default useStyles;