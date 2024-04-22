"use client";
import stylesheets from './style/style.module.css';
import useStyles from './style/style';

const Page = (): React.ReactNode => {
    const { cx, styles } = useStyles();
    return (
        <div className={stylesheets['bg-blue']}>
            <h1 className={cx(styles.border)}>Client Home {`:)`}</h1>
            <p>This is a paragraph in the client page</p>
        </div>
    );
}

export default Page;