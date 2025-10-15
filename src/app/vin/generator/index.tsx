"use client";

import { useCallback, useState } from "react";

import { CopyOutlined, ReloadOutlined, DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Space, Card, Typography, message, InputNumber, Table } from "antd";
import { sample, times } from "lodash-es";
import { useCopyToClipboard } from "usehooks-ts";

import { exportToCSV, exportToJSON } from "@/lib/export-table";

const { Text } = Typography;

interface VinRecord {
  key: string;
  index: number;
  vin: string;
  wmi: string;
  vds: string;
  vis: string;
  [key: string]: string | number;
}

const wmiCodes = ["1HG", "JHM", "2HG", "KMH", "WBA", "WBS", "4F2", "1FT", "1GC", "1GM", "2G1", "3G1", "YV1", "WDD", "WAU", "JN1"];

const generateRandomChar = () => {
  const chars = "0123456789ABCDEFGHJKLMNPRSTUVWXYZ"; // Excludes I, O, Q
  return sample(chars.split(""));
};

const generateSingleVIN = () => {
  // WMI (1-3): Random manufacturer code
  const wmi = sample(wmiCodes) || "1HG";

  // VDS (4-9): Vehicle descriptor section
  const vds = times(6, generateRandomChar).join("");

  // VIS (10-17): Vehicle identifier section
  const vis = times(8, generateRandomChar).join("");

  return wmi + vds + vis;
};

export const Generator = () => {
  const [count, setCount] = useState(1);
  const [vin, setVin] = useState(() => generateSingleVIN());
  const [vinList, setVinList] = useState<VinRecord[]>([]);
  const [, copy] = useCopyToClipboard();

  const generateVIN = useCallback(() => {
    if (count === 1) {
      const generatedVin = generateSingleVIN();
      setVin(generatedVin);
      setVinList([]);
    } else {
      const vins = times(count, (index) => {
        const generatedVin = generateSingleVIN();
        return {
          key: `${index}`,
          index: index + 1,
          vin: generatedVin,
          wmi: generatedVin.slice(0, 3),
          vds: generatedVin.slice(3, 9),
          vis: generatedVin.slice(9, 17),
        };
      });
      setVinList(vins);
      setVin("");
    }
  }, [count]);

  const handleCopy = async (text: string) => {
    try {
      await copy(text);
      message.success("VIN copied to clipboard");
    } catch (err) {
      console.error(err);
      message.error("Failed to copy VIN");
    }
  };

  const copyAllVins = async () => {
    const allVins = vinList.map((item) => item.vin).join("\n");
    await handleCopy(allVins);
  };

  const exportVinsCsv = () => {
    try {
      exportToCSV(vinList, {
        filename: "vins.csv",
        headers: ["index", "vin", "wmi", "vds", "vis"],
      });
      message.success("VINs exported successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to export VINs");
    }
  };

  const exportVinsJson = () => {
    try {
      exportToJSON(vinList, "vins.json");
      message.success("VINs exported successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to export VINs");
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
      title: "VIN",
      dataIndex: "vin",
      key: "vin",
      render: (text: string) => (
        <Button type="link" onClick={() => handleCopy(text)} style={{ padding: 0, fontFamily: "monospace", fontWeight: "bold" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "WMI",
      dataIndex: "wmi",
      key: "wmi",
    },
    {
      title: "VDS",
      dataIndex: "vds",
      key: "vds",
    },
    {
      title: "VIS",
      dataIndex: "vis",
      key: "vis",
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <Space>
            <Text>Count:</Text>
            <InputNumber min={1} max={100} value={count} onChange={(value) => setCount(value || 1)} style={{ width: 80 }} />
          </Space>
          <Space>
            {vinList.length > 0 && (
              <>
                <Button icon={<CopyOutlined />} onClick={copyAllVins}>
                  Copy All
                </Button>
                <Button icon={<FileTextOutlined />} onClick={exportVinsJson}>
                  Export JSON
                </Button>
                <Button icon={<DownloadOutlined />} onClick={exportVinsCsv}>
                  Export CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button icon={<CopyOutlined />} onClick={() => handleCopy(vin)} disabled={!vin}>
                Copy
              </Button>
            )}
            <Button type="primary" icon={<ReloadOutlined />} onClick={generateVIN}>
              Generate VIN{count > 1 ? "s" : ""}
            </Button>
          </Space>
        </div>

        {vin && (
          <div>
            <Button
              size="large"
              block
              onClick={() => handleCopy(vin)}
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                fontWeight: "bold",
                height: "60px",
              }}
            >
              {vin}
            </Button>
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
              <Text type="secondary">WMI: {vin.slice(0, 3)}</Text>
              <Text type="secondary">VDS: {vin.slice(3, 9)}</Text>
              <Text type="secondary">VIS: {vin.slice(9, 17)}</Text>
            </div>
          </div>
        )}

        {vinList.length > 0 && <Table columns={columns} dataSource={vinList} pagination={false} size="small" scroll={{ y: 400 }} />}
      </Space>
    </Card>
  );
};
