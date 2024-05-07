"use client";

import LeftSide from "@/components/leftSide";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { useProfileActions } from "@/providers/profileProvider";
import { getRole } from "@/utils";
import { Button, Flex, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStyles from "./style";
import { log } from "console";

const { Paragraph } = Typography;

export default function Home() {
  const { cx, styles } = useStyles();
  const { push } = useRouter();
  const {loginObj}=useAuthState();
  const { getUser } = useAuthActions();
  const { getMyProfile } = useProfileActions();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const role = getRole({ accessToken });

        getUser();
        getMyProfile();

        push(`/home/${role}`);
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (loginObj) {
        let role = getRole(loginObj);

        getUser();
        getMyProfile();

        if (role === "admin") role = "support";

        push(`/home/${role}`);
      }
    }
  }, [loginObj]);
  
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
