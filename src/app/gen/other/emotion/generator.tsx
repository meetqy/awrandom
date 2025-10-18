"use client";

import { useCallback, useState } from "react";

import { sample, times } from "lodash-es";
import { Copy, Download, FileText, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCSV, exportToJSON } from "@/lib/export-table";

import { emotions } from "./data";

interface EmotionRecord {
  key: string;
  index: number;
  emotion: string;
  category: string;
  [key: string]: string | number;
}

const emotionCategories = [
  { value: "all", label: "All Categories" },
  { value: "happy", label: "Happy" },
  { value: "sad", label: "Sad" },
  { value: "angry", label: "Angry" },
  { value: "scared", label: "Scared" },
  { value: "confused", label: "Confused" },
];

const categoryColors = {
  happy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  sad: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  angry: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  scared: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  confused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

const generateSingleEmotion = (category = "all") => {
  const availableEmotions: { emotion: string; category: string }[] = [];

  if (category === "all") {
    // 从所有类别中选择
    Object.entries(emotions).forEach(([cat, emotionList]) => {
      emotionList.forEach((emotion) => {
        availableEmotions.push({ emotion, category: cat });
      });
    });
  } else {
    // 从指定类别中选择
    const emotionList = emotions[category as keyof typeof emotions];
    emotionList.forEach((emotion) => {
      availableEmotions.push({ emotion, category });
    });
  }

  return sample(availableEmotions) || { emotion: "Happy", category: "happy" };
};

export const Generator = () => {
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState("all");
  const [emotion, setEmotion] = useState(() => generateSingleEmotion().emotion);
  const [emotionCategory, setEmotionCategory] = useState(() => generateSingleEmotion().category);
  const [emotionList, setEmotionList] = useState<EmotionRecord[]>([]);
  const [, copy] = useCopyToClipboard();

  const generateEmotions = useCallback(() => {
    if (count === 1) {
      const generated = generateSingleEmotion(category);
      setEmotion(generated.emotion);
      setEmotionCategory(generated.category);
      setEmotionList([]);
    } else {
      const emotions = times(count, (index) => {
        const generated = generateSingleEmotion(category);
        return {
          key: `${index}`,
          index: index + 1,
          emotion: generated.emotion,
          category: generated.category,
        };
      });
      setEmotionList(emotions);
      setEmotion("");
    }
  }, [count, category]);

  const handleCopy = async (text: string) => {
    try {
      await copy(text);
      toast.success("Emotion copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy emotion");
    }
  };

  const copyAllEmotions = async () => {
    const allEmotions = emotionList.map((item) => item.emotion).join("\n");
    await handleCopy(allEmotions);
  };

  const exportEmotionsCsv = () => {
    try {
      exportToCSV(emotionList, {
        filename: "emotions.csv",
        headers: ["index", "emotion", "category"],
      });
      toast.success("Emotions exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export emotions");
    }
  };

  const exportEmotionsJson = () => {
    try {
      exportToJSON(emotionList, "emotions.json");
      toast.success("Emotions exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export emotions");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-2">
              <Label htmlFor="category">Category:</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emotionCategories.map((option) => (
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
            {emotionList.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={copyAllEmotions}>
                  <Copy className="size-4" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={exportEmotionsJson}>
                  <FileText className="size-4" />
                  JSON
                </Button>
                <Button variant="outline" size="sm" onClick={exportEmotionsCsv}>
                  <Download className="size-4" />
                  CSV
                </Button>
              </>
            )}
            {count === 1 && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(emotion)} disabled={!emotion}>
                <Copy className="size-4" />
                Copy
              </Button>
            )}
            <Button onClick={generateEmotions}>
              <RotateCcw className="size-4" />
              Generate
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {emotion && (
            <div className="space-y-3">
              <Button variant="outline" size="lg" className="h-20 w-full text-2xl font-bold" onClick={() => handleCopy(emotion)}>
                {emotion}
              </Button>
              <div className="flex justify-center">
                <Badge className={categoryColors[emotionCategory as keyof typeof categoryColors]}>
                  {emotionCategory.charAt(0).toUpperCase() + emotionCategory.slice(1)}
                </Badge>
              </div>
            </div>
          )}

          {emotionList.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>Emotion</TableHead>
                    <TableHead className="w-24">Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emotionList.map((record) => (
                    <TableRow key={record.key}>
                      <TableCell>{record.index}</TableCell>
                      <TableCell>
                        <Button variant="link" className="h-auto justify-start p-0 text-left text-lg font-bold" onClick={() => handleCopy(record.emotion)}>
                          {record.emotion}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[record.category as keyof typeof categoryColors]}>
                          {record.category.charAt(0).toUpperCase() + record.category.slice(1)}
                        </Badge>
                      </TableCell>
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
