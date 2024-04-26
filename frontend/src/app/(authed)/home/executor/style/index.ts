import { createStyles } from 'antd-style';
import { RenderRowProps } from 'react-data-grid';
import { Row } from 'react-table';

const useStyles = createStyles(({css, token}) => {
    return {
        box: css`
            border: 1px solid #B64326;
            border-radius: 20px;
            height: fit-content;
            padding: 10px;
            margin: 10px;
        `,
        flex: css`
            height: 100%;
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
        `,
        'total-money': css`
            font-size: 40px;
        `, 
        light: css`
            background: #E5E3D2;
        `, 
        row: css`
            background: #E5E3D2;
            color: #000000;
        `,
        segmented: css`
            background: #E5E3D2;
        `,
    }
});

export default useStyles;