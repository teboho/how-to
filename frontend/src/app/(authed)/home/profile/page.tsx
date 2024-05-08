'use client';
import { useProfileActions, useProfileState } from '@/providers/profileProvider';
import { Avatar, Card, Divider, Flex, Layout, Rate, Tag, Typography } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useStyles from './style';
import Image from 'next/image';

const { Sider, Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const portfolioImageCard = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt='example' height={200} style={{
                height: 200, objectFit: "cover", objectPosition: "0px 10%"
            }} src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
        >
            <Card.Meta title='Portfolio image' description='www.instagram.com' />
        </Card>
    )
};

const Page = () => {
    const searchParams = useSearchParams();
    const { profile } = useProfileState();
    const { getProfileByUsername, getProfile } = useProfileActions();
    const { cx, styles } = useStyles();

    const username = searchParams.get('username');
    const profileId = searchParams.get('profileId');

    useEffect(() => {
        console.log(searchParams.get('username'));
    }, [searchParams]);

    return (
        <Layout className={cx(styles.layout)}>
            <Sider className={cx(styles.sider)} theme='light' width={"65%"}>
                <Flex vertical={true} align='' justify=''>
                    <Avatar size={128} src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    <Title level={1}>User Name</Title>
                    <Rate disabled defaultValue={3} />
                    <Paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla ac justo efficitur tincidunt
                    </Paragraph>
                    <Divider>Portfolio</Divider>
                    <div style={{
                        overflow: 'auto',
                        height: '100%',
                        overflowY: 'scroll',
                    }}>
                        <Title level={3}>Pictures</Title>
                        <Flex wrap={true} align='center' justify='center' gap={20}>
                            {portfolioImageCard()}
                            {portfolioImageCard()}
                            {portfolioImageCard()}
                        </Flex>
                        {/* <Title level={3}>Documents</Title> */}
                    </div>
                </Flex>
            </Sider>
            <Sider className={cx(styles.sider)} theme='light' width={"34%"}>
                <Divider>Categories</Divider>
                <div>
                    <Tag color='blue'>Category 1</Tag>
                    <Tag color='blue'>Category 2</Tag>
                    <Tag color='blue'>Category 3</Tag>
                    <Tag color='blue'>Category 3</Tag>
                    <Tag color='blue'>Category 3</Tag>
                </div>
                <Divider>Previous Reviews</Divider>
                <div className='reviews'>
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                            title='User 1'
                            description='Review 1'
                        />
                    </Card>
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                            title='User 2'
                            description='I hired him for a job and he did it well. He was communicating well and he was on time. I would hire him again.'
                        />
                    </Card>
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                            title='User 3'
                            description='I hired him for a job and he did it well. He was communicating well and he was on time. I would hire him again.'
                        />
                    </Card>
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                            title='User 4'
                            description='I hired him for a job and he did it well. He was communicating well and he was on time. I would hire him again.'
                        />
                    </Card>
                </div>
            </Sider>
        </Layout>
    )
}

export default Page;