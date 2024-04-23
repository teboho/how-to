import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => {
    return {
        'left-inner-flex': css`
            padding: 20px;
            margin: 0 auto;
        `,
        'right-inner-flex': css`
            margin: 0 auto;
        `,
        'font-large': css`
            font-size: 36px;
            color: #B64326;
        `
    }
});

export default useStyles;