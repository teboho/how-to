import { Button, type GetProp, Upload, UploadFile, type UploadProps, Typography, Input } from "antd";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { Title } = Typography;

const FileUploader = ({
    taskId
}: {
    taskId: string
}) => {
    const [file, setFile] = useState<UploadFile>();

    const profilePicUploadProps: UploadProps = {
        onRemove: () => {
            setFile(undefined);
        },
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
        fileList: file ? [file] : []
    }
    return (
        <Upload
            {...profilePicUploadProps}
        >
            <Title level={3}>Upload Supporting Files</Title>
            <p>To give the executor more context</p>
            <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
    );
}

export default FileUploader;