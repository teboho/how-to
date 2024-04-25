"use client";

import React, { useEffect } from "react";
import useStyles from "./style/style";
import { Button, Flex, Typography } from "antd";
import LeftSide from "@/components/leftSide";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useAuthState } from "@/providers/authProvider";
import { getRole } from "@/utils";

const { Title, Paragraph } = Typography;

export default function Home() {
  const { cx, styles } = useStyles();
  const { push } = useRouter();

  useEffect(() => {

    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const role = getRole({accessToken});
        push(`/home/${role}`);
      }
    }
  }, []);
  
  return (
    <Flex className={cx(styles["h-full"])}>
      <LeftSide />
      <div className={"half-box right"}>
        <Flex vertical className={cx(styles["right-inner-flex"])} align="center" justify="center">
          <Paragraph className={cx(styles.title)}>GREAT THINGS <br />ARE COMING</Paragraph>
          <Link href={"/login"}>
            <Button className={cx(styles.button)} size="large">Login</Button>
          </Link>
        </Flex>
      </div>
    </Flex>
  );
}
