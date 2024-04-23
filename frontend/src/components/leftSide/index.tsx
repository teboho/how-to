import { Flex, Typography } from "antd";
import useStyles from './style';

const { Paragraph } = Typography;

const LeftSide = () => {
    const { styles, cx } = useStyles();
    return (
        <div className="half-box left">
            <Flex vertical className={cx(styles["left-inner-flex"])} align="center" justify="center">
                <img src={"/logo-inv.svg"} alt="logo" />
                <Paragraph className={cx(styles["font-large"])}>
                    How to do anything in the world.
                </Paragraph>
            </Flex>
        </div>
    );
}

export default LeftSide;