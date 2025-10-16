"use client";

import { useCallback, useState } from "react";

import { times } from "lodash-es";
import { Copy, Download, FileText, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import * as uuid from "uuid";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCSV, exportToJSON } from "@/lib/export-table";

interface UuidRecord {
  key: string;
  index: number;
  uuid: string;
  version: string;
  [key: string]: string | number;
}

export const uuidVersions = [
  { value: "v1", name: "Version 1 UUID", label: "UUID v1 (timestamp + MAC)", generator: () => uuid.v1() },
  {
    value: "v3",
    name: "Version 3 UUID",
    label: "UUID v3 (namespace + name MD5)",
    generator: () => uuid.v3(`https://awrandom.com/${Date.now() - Math.random()}`, uuid.v3.URL),
  },
  { value: "v4", name: "Version 4 UUID", label: "UUID v4 (random)", generator: () => uuid.v4() },
  {
    value: "v5",
    name: "Version 5 UUID",
    label: "UUID v5 (namespace + name SHA-1)",
    generator: () => uuid.v5(`https://awrandom.com/${Date.now() - Math.random()}`, uuid.v5.URL),
  },
  { value: "v6", name: "Version 6 UUID", label: "UUID v6 (timestamp + MAC)", generator: () => uuid.v6() },
  { value: "v7", name: "Version 7 UUID", label: "UUID v7 (timestamp + random)", generator: () => uuid.v7() },
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

export function GeneratorUUID({ defaultVersion }: Props) {
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
      toast.success("UUID copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy UUID");
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
      toast.success("UUIDs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export UUIDs");
    }
  };

  const exportUuidsJson = () => {
    try {
      exportToJSON(uuidList, "uuids.json");
      toast.success("UUIDs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export UUIDs");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-2">
              <Label htmlFor="version">Version:</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {uuidVersions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="count">Count:</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onBlur={() => {
                  setCount(Math.max(1, Math.min(100, count)));
                }}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {uuidList.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={copyAllUuids}>
                  <Copy className="size-4" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={exportUuidsJson}>
                  <FileText className="size-4" />
                  JSON
                </Button>
                <Button variant="outline" size="sm" onClick={exportUuidsCsv}>
                  <Download className="size-4" />
                  CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(singleUuid)} disabled={!singleUuid}>
                <Copy className="size-4" />
                Copy
              </Button>
            )}
            <Button onClick={generateUUID}>
              <RotateCcw className="size-4" />
              Generate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {singleUuid && (
            <div className="space-y-2">
              <Button variant="outline" size="lg" className="h-15 w-full font-mono text-lg font-bold" onClick={() => handleCopy(singleUuid)}>
                {singleUuid}
              </Button>
              <div className="text-center">
                <span className="text-muted-foreground text-sm">Version: {version}</span>
              </div>
            </div>
          )}

          {uuidList.length > 0 && (
            <ScrollArea className="max-h-96 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>UUID</TableHead>
                    <TableHead className="w-20">Version</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uuidList.map((record) => (
                    <TableRow key={record.key}>
                      <TableCell>{record.index}</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0" onClick={() => handleCopy(record.uuid)}>
                          {record.uuid}
                        </Button>
                      </TableCell>
                      <TableCell>{record.version}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
