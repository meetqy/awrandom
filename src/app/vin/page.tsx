"use client";
import { Typography } from "antd";

import dynamic from "next/dynamic";

const { Title, Paragraph, Text } = Typography;

const Generator = dynamic(() => import("./generator").then((mod) => mod.Generator), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return (
    <section className="space-y-12">
      <Typography>
        <Title>Random VIN Generator</Title>
        <Paragraph>
          Generate random Vehicle Identification Numbers (VIN) for testing and development purposes. VINs are unique 17-character codes used to identify
          vehicles.
        </Paragraph>
      </Typography>

      <Generator />

      <Typography className="mt-12">
        <Title level={2}>About VINs</Title>
        <Paragraph>
          VIN (Vehicle Identification Number) is a unique 17-character string assigned to every vehicle, consisting of numbers and letters, used to identify a
          specific automobile.
        </Paragraph>

        <Title level={3}>VIN Structure</Title>
        <Paragraph>A VIN consists of 17 characters divided into three main sections:</Paragraph>

        <div style={{ marginLeft: 20 }}>
          <Paragraph>
            <Text strong>Positions 1-3: WMI (World Manufacturer Identifier)</Text>
            <br />
            Manufacturer identification (e.g., 1HG = Honda USA)
          </Paragraph>
          <Paragraph>
            <Text strong>Positions 4-9: VDS (Vehicle Descriptor Section)</Text>
            <br />
            Vehicle attributes (model, body type, engine type, etc.)
          </Paragraph>
          <Paragraph>
            <Text strong>Positions 10-17: VIS (Vehicle Identifier Section)</Text>
            <br />
            Vehicle serial number (production year, factory, sequence number, etc.)
          </Paragraph>
        </div>

        <Title level={3}>Random VIN Usage</Title>
        <Paragraph>Random VINs are not actual existing vehicles, but are used for:</Paragraph>

        <ul style={{ marginLeft: 20 }}>
          <li>Testing and development purposes (automotive websites, vehicle databases, API testing)</li>
          <li>Demo or sample data (dummy data)</li>
          <li>Generating mock VINs to verify format correctness</li>
          <li>Software development and quality assurance</li>
        </ul>

        <Title level={3}>Example</Title>
        <Paragraph>A randomly generated VIN might look like this:</Paragraph>
        <Paragraph>
          <Text code style={{ fontSize: "16px", fontWeight: "bold" }}>
            1HGCM82633A123456
          </Text>
        </Paragraph>
        <div style={{ marginLeft: 20 }}>
          <Paragraph>
            <Text strong>1HG</Text> → Honda, USA
            <br />
            <Text strong>CM8263</Text> → Vehicle model and configuration codes
            <br />
            <Text strong>3A123456</Text> → Year and sequence number
          </Paragraph>
        </div>

        <Title level={3}>How to Use</Title>
        <Paragraph>
          <Text strong>Single VIN Generation:</Text>
        </Paragraph>
        <ol style={{ marginLeft: 20 }}>
          <li>Keep the count at 1 (default)</li>
          <li>
            Click {'"'}Generate VIN{'"'} button
          </li>
          <li>Click the generated VIN button to copy it to clipboard</li>
        </ol>

        <Paragraph>
          <Text strong>Batch VIN Generation:</Text>
        </Paragraph>
        <ol style={{ marginLeft: 20 }}>
          <li>Set the count to desired number (2-100)</li>
          <li>
            Click {'"'}Generate VINs{'"'} button
          </li>
          <li>View results in the table below</li>
          <li>Click any VIN in the table to copy it</li>
          <li>
            Use {'"'}Copy All{'"'} to copy all VINs as a list
          </li>
          <li>
            Use {'"'}Export CSV{'"'} to download as a CSV file
          </li>
        </ol>

        <Paragraph>
          <Text type="warning">
            <Text strong>Note:</Text> These are randomly generated VINs for testing purposes only and do not correspond to real vehicles.
          </Text>
        </Paragraph>
      </Typography>
    </section>
  );
}
