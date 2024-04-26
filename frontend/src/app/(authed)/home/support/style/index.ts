import { createStyles } from 'antd-style';

const useStyles = createStyles(({css}) => {
    return {
        border: css`
            border: 1px solid red;
        `
    }
});

export default useStyles;