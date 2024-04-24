import { createStyles } from 'antd-style';

const useStyles = createStyles(({css, token}) => {
    return {
        'h-full': css`
            height: 100%;
        `,
        'right-inner-flex': css`
            margin: 0 auto;
        `,
        title: css`
            color: white;
            font-size: 80px;
            text-align: center;
        `,
        button: css`
            width: fit-content;
            font-weight: bold;
            background: #E5E3D2;
        `,
        flex: css`
            height: 100%;
        `,
    }
});

export default useStyles;