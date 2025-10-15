"use client";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
import { notFound } from "next/navigation";

import { GeneratorUUID, uuidVersions } from "../generator";

export function Core({ slug }: { slug: string }) {
  const version = uuidVersions.find((v) => v.value === slug);
  if (!version) {
    return notFound();
  }

  return (
    <section className="space-y-8">
      <Typography>
        <Title>Random {version.name} Generator</Title>
        <Paragraph>
          Generate random Universally Unique Identifiers (UUID {version.value}) for testing and development purposes. UUIDs are unique 36-character strings used
          to identify information in computer systems.
        </Paragraph>
      </Typography>

      <GeneratorUUID defaultVersion={version.value} />
    </section>
  );
}
