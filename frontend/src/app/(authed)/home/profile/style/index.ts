import { createStyles } from 'antd-style';

const useStyles = createStyles(({css}) => {
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
            margin-top: 20px;
            padding: 20px;
            background: #E5E3D2;
            border-radius: 20px;
            box-shadow: 2px 2px 10px grey;
        `,
        'form-item': css`
            font-size: 20px;
        `,
        'profile-pic': css`
            width: 300px;
            height: auto;
        `,
        "text-input": css`
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        `,
        "select": css`
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        `,
        label: css`
            margin-right: 20px;
        `
    }
});

export default useStyles;