"use client";

import { useCallback, useState } from "react";

import { sample, times } from "lodash-es";
import { Copy, Download, FileText, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCSV, exportToJSON } from "@/lib/export-table";

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
      toast.success("VIN copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy VIN");
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
      toast.success("VINs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export VINs");
    }
  };

  const exportVinsJson = () => {
    try {
      exportToJSON(vinList, "vins.json");
      toast.success("VINs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export VINs");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

          <div className="flex flex-wrap items-center gap-2">
            {vinList.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={copyAllVins}>
                  <Copy className="size-4" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={exportVinsJson}>
                  <FileText className="size-4" />
                  JSON
                </Button>
                <Button variant="outline" size="sm" onClick={exportVinsCsv}>
                  <Download className="size-4" />
                  CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(vin)} disabled={!vin}>
                <Copy className="size-4" />
                Copy
              </Button>
            )}
            <Button onClick={generateVIN}>
              <RotateCcw className="size-4" />
              Generate
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {vin && (
            <div className="space-y-2">
              <Button variant="outline" size="lg" className="h-15 w-full font-mono text-lg font-bold" onClick={() => handleCopy(vin)}>
                {vin}
              </Button>
              <div className="text-muted-foreground flex justify-between text-sm">
                <span>WMI: {vin.slice(0, 3)}</span>
                <span>VDS: {vin.slice(3, 9)}</span>
                <span>VIS: {vin.slice(9, 17)}</span>
              </div>
            </div>
          )}

          {vinList.length > 0 && (
            <ScrollArea className="h-96 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>VIN</TableHead>
                    <TableHead className="w-20">WMI</TableHead>
                    <TableHead className="w-24">VDS</TableHead>
                    <TableHead className="w-24">VIS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vinList.map((record) => (
                    <TableRow key={record.key}>
                      <TableCell>{record.index}</TableCell>
                      <TableCell>
                        <Button variant="link" className="h-auto justify-start p-0 text-left font-mono font-bold" onClick={() => handleCopy(record.vin)}>
                          {record.vin}
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono">{record.wmi}</TableCell>
                      <TableCell className="font-mono">{record.vds}</TableCell>
                      <TableCell className="font-mono">{record.vis}</TableCell>
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
};
