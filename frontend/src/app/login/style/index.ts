import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
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
            color: #fff;
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
            padding: 20px 10px;
            background: #E5E3D2;
            border-radius: 20px;
            box-shadow: 2px 2px 10px grey;
        `,
        'form-item': css`
            font-size: 20px;
        `,
        'float-right': css`
            margin-right: 0;
            margin-left: auto;
        `
    }
});

export default useStyles;