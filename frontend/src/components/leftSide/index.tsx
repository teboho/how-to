import { Flex, Typography } from "antd";
import useStyles from './style';
import Image from "next/image";

const { Paragraph } = Typography;

const LeftSide = () => {
    const { styles, cx } = useStyles();
    return (
        <div className="half-box left">
            <Flex vertical className={cx(styles["left-inner-flex"])} align="center" justify="center">
                <img width={292} height={94} src={"/logo-inv.svg"} alt="logo" />
                <Paragraph className={cx(styles["font-large"])}>
                    How to do anything in the world.
                </Paragraph>
            </Flex>
        </div>
    );
}

export default LeftSide;