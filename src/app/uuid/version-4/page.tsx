"use client";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
import { Generator } from "./generator";

export default function Home() {
  return (
    <section className="space-y-8">
      <Typography>
        <Title>Random UUID 4 Generator</Title>
        <Paragraph>
          Generate random Universally Unique Identifiers (UUIDs) for testing and development purposes. UUIDs are unique 36-character strings used to identify
          information in computer systems.
        </Paragraph>
      </Typography>

      <Generator defaultVersion="v4" />
    </section>
  );
}
