"use client";

import { useCallback, useState } from "react";

import { CopyOutlined, ReloadOutlined, DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Space, Card, Typography, message, InputNumber, Table, Select } from "antd";
import { times } from "lodash-es";
import { useCopyToClipboard } from "usehooks-ts";
import * as uuid from "uuid";

import { exportToCSV, exportToJSON } from "@/lib/export-table";

const { Text } = Typography;

interface UuidRecord {
  key: string;
  index: number;
  uuid: string;
  version: string;
  [key: string]: string | number;
}

const uuidVersions = [
  { value: "v1", label: "UUID v1 (timestamp + MAC)", generator: () => uuid.v1() },
  { value: "v3", label: "UUID v3 (namespace + name MD5)", generator: () => uuid.v3("example", uuid.v3.DNS) },
  { value: "v4", label: "UUID v4 (random)", generator: () => uuid.v4() },
  { value: "v5", label: "UUID v5 (namespace + name SHA-1)", generator: () => uuid.v5("example", uuid.v5.DNS) },
  { value: "v6", label: "UUID v6 (timestamp + MAC)", generator: () => uuid.v6() },
  { value: "v7", label: "UUID v7 (timestamp + random)", generator: () => uuid.v7() },
];

const generateSingleUUID = (version: string) => {
  const versionConfig = uuidVersions.find((v) => v.value === version);
  if (!versionConfig) return uuid.v4();

  try {
    return versionConfig.generator();
  } catch (error) {
    console.error(`Error generating UUID ${version}:`, error);
    return uuid.v4(); // fallback to v4
  }
};

type UuidVersionValue = (typeof uuidVersions)[number]["value"];

type Props = {
  defaultVersion?: UuidVersionValue;
};

export function Generator({ defaultVersion }: Props) {
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState(defaultVersion || "v4");
  const [singleUuid, setSingleUuid] = useState(() => generateSingleUUID("v4"));
  const [uuidList, setUuidList] = useState<UuidRecord[]>([]);
  const [, copy] = useCopyToClipboard();

  const generateUUID = useCallback(() => {
    if (count === 1) {
      const generatedUuid = generateSingleUUID(version);
      setSingleUuid(generatedUuid);
      setUuidList([]);
    } else {
      const uuids = times(count, (index) => {
        const generatedUuid = generateSingleUUID(version);
        return {
          key: `${index}`,
          index: index + 1,
          uuid: generatedUuid,
          version: version,
        };
      });
      setUuidList(uuids);
      setSingleUuid("");
    }
  }, [count, version]);

  const handleCopy = async (text: string) => {
    try {
      await copy(text);
      message.success("UUID copied to clipboard");
    } catch (err) {
      console.error(err);
      message.error("Failed to copy UUID");
    }
  };

  const copyAllUuids = async () => {
    const allUuids = uuidList.map((item) => item.uuid).join("\n");
    await handleCopy(allUuids);
  };

  const exportUuidsCsv = () => {
    try {
      exportToCSV(uuidList, {
        filename: "uuids.csv",
        headers: ["index", "uuid", "version"],
      });
      message.success("UUIDs exported successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to export UUIDs");
    }
  };

  const exportUuidsJson = () => {
    try {
      exportToJSON(uuidList, "uuids.json");
      message.success("UUIDs exported successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to export UUIDs");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
    },
    {
      title: "UUID",
      dataIndex: "uuid",
      key: "uuid",
      render: (text: string) => (
        <Button type="link" onClick={() => handleCopy(text)} style={{ padding: 0, fontFamily: "monospace", fontWeight: "bold" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 80,
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="flex items-center justify-between">
          <Space>
            <Text>Version:</Text>
            <Select value={version} onChange={setVersion} style={{ width: 280 }} options={uuidVersions} />
            <Text>Count:</Text>
            <InputNumber min={1} max={100} value={count} onChange={(value) => setCount(value || 1)} style={{ width: 80 }} />
          </Space>
          <Space>
            {uuidList.length > 0 && (
              <>
                <Button icon={<CopyOutlined />} onClick={copyAllUuids}>
                  Copy All
                </Button>
                <Button icon={<FileTextOutlined />} onClick={exportUuidsJson}>
                  Export JSON
                </Button>
                <Button icon={<DownloadOutlined />} onClick={exportUuidsCsv}>
                  Export CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button icon={<CopyOutlined />} onClick={() => handleCopy(singleUuid)} disabled={!singleUuid}>
                Copy
              </Button>
            )}
            <Button type="primary" icon={<ReloadOutlined />} onClick={generateUUID}>
              Generate UUID{count > 1 ? "s" : ""}
            </Button>
          </Space>
        </div>

        {singleUuid && (
          <div>
            <Button
              size="large"
              block
              onClick={() => handleCopy(singleUuid)}
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                fontWeight: "bold",
                height: "60px",
              }}
            >
              {singleUuid}
            </Button>
            <div style={{ marginTop: "8px", textAlign: "center" }}>
              <Text type="secondary">Version: {version}</Text>
            </div>
          </div>
        )}

        {uuidList.length > 0 && <Table columns={columns} dataSource={uuidList} pagination={false} size="small" scroll={{ y: 400 }} />}
      </Space>
    </Card>
  );
}
