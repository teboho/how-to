"use client";
import { usePortfolioState } from "@/providers/portfolioProvider";
import { IPortfolioWithStoredFile } from "@/providers/portfolioProvider/context";
import { Col, Row } from "antd";
import useStyles from "./style";

const imageUrlPre = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;

const Portfolios = ({
    props: { portfoliosWithStoredFiles }
}: {
    props: { portfoliosWithStoredFiles?: IPortfolioWithStoredFile[] }
}) => {
    const { isSuccess: portfolioSuccess } = usePortfolioState();
    const { styles } = useStyles();

    return (
        <Row gutter={18}>
            {portfolioSuccess && portfoliosWithStoredFiles?.map((portfolio: IPortfolioWithStoredFile, index: number) => (
                portfolio.storedFileModel.fileType.startsWith("image") && (
                    <Col key={index} span={6}>
                        <img className={styles['demo-pic']} alt="demo-pic" src={`${imageUrlPre}${portfolio.storedFileId}`} />
                    </Col>
                )
            ))}
        </Row>
    );
};

export default Portfolios;