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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCSV, exportToJSON } from "@/lib/export-table";

interface ImeiRecord {
  key: string;
  index: number;
  imei: string;
  tac: string;
  fac: string;
  snr: string;
  cd: string;
  [key: string]: string | number;
}

// Common TAC codes (Type Allocation Code) for different manufacturers
const tacCodes = [
  "35328406", // Apple iPhone
  "35209006", // Samsung Galaxy
  "35875505", // Google Pixel
  "35328805", // Apple iPhone
  "35404906", // LG
  "35875405", // Google Pixel
  "35328306", // Apple iPhone
  "35875305", // Google Pixel
  "35404806", // LG
  "35209106", // Samsung Galaxy
];

const generateRandomDigits = (length: number) => {
  return times(length, () => Math.floor(Math.random() * 10)).join("");
};

const calculateCheckDigit = (imei14: string) => {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(imei14[i]!);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }
    sum += digit;
  }
  return ((10 - (sum % 10)) % 10).toString();
};

const generateSingleIMEI = () => {
  // TAC (8 digits): Type Allocation Code
  const tac = sample(tacCodes) || "35328406";

  // FAC (2 digits): Final Assembly Code (manufacturer specific)
  const fac = generateRandomDigits(2);

  // SNR (6 digits): Serial Number
  const snr = generateRandomDigits(6);

  // Calculate check digit using Luhn algorithm
  const imei14 = tac + fac + snr;
  const checkDigit = calculateCheckDigit(imei14);

  return {
    imei: imei14 + checkDigit,
    tac,
    fac,
    snr,
    cd: checkDigit,
  };
};

export const Generator = () => {
  const [count, setCount] = useState(1);
  const [imei, setImei] = useState(() => generateSingleIMEI().imei);
  const [imeiList, setImeiList] = useState<ImeiRecord[]>([]);
  const [, copy] = useCopyToClipboard();

  const generateIMEI = useCallback(() => {
    if (count === 1) {
      const generated = generateSingleIMEI();
      setImei(generated.imei);
      setImeiList([]);
    } else {
      const imeis = times(count, (index) => {
        const generated = generateSingleIMEI();
        return {
          key: `${index}`,
          index: index + 1,
          imei: generated.imei,
          tac: generated.tac,
          fac: generated.fac,
          snr: generated.snr,
          cd: generated.cd,
        };
      });
      setImeiList(imeis);
      setImei("");
    }
  }, [count]);

  const handleCopy = async (text: string) => {
    try {
      await copy(text);
      toast.success("IMEI copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy IMEI");
    }
  };

  const copyAllImeis = async () => {
    const allImeis = imeiList.map((item) => item.imei).join("\n");
    await handleCopy(allImeis);
  };

  const exportImeisCsv = () => {
    try {
      exportToCSV(imeiList, {
        filename: "imeis.csv",
        headers: ["index", "imei", "tac", "fac", "snr", "cd"],
      });
      toast.success("IMEIs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export IMEIs");
    }
  };

  const exportImeisJson = () => {
    try {
      exportToJSON(imeiList, "imeis.json");
      toast.success("IMEIs exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export IMEIs");
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
            {imeiList.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={copyAllImeis}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={exportImeisJson}>
                  <FileText className="mr-2 h-4 w-4" />
                  JSON
                </Button>
                <Button variant="outline" size="sm" onClick={exportImeisCsv}>
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(imei)} disabled={!imei}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            )}
            <Button onClick={generateIMEI}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {imei && (
            <div className="space-y-2">
              <Button variant="outline" size="lg" className="h-15 w-full font-mono text-lg font-bold" onClick={() => handleCopy(imei)}>
                {imei}
              </Button>
              <div className="text-muted-foreground flex justify-between text-sm">
                <span>TAC: {imei.slice(0, 8)}</span>
                <span>FAC: {imei.slice(8, 10)}</span>
                <span>SNR: {imei.slice(10, 14)}</span>
                <span>CD: {imei.slice(14, 15)}</span>
              </div>
            </div>
          )}

          {imeiList.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>IMEI</TableHead>
                    <TableHead className="w-24">TAC</TableHead>
                    <TableHead className="w-16">FAC</TableHead>
                    <TableHead className="w-20">SNR</TableHead>
                    <TableHead className="w-12">CD</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {imeiList.map((record) => (
                    <TableRow key={record.key}>
                      <TableCell>{record.index}</TableCell>
                      <TableCell>
                        <Button variant="link" className="h-auto justify-start p-0 text-left font-mono font-bold" onClick={() => handleCopy(record.imei)}>
                          {record.imei}
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono">{record.tac}</TableCell>
                      <TableCell className="font-mono">{record.fac}</TableCell>
                      <TableCell className="font-mono">{record.snr}</TableCell>
                      <TableCell className="font-mono">{record.cd}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
