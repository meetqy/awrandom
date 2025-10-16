import { notFound } from "next/navigation";

import { getNavMainItem } from "@/lib/sidebar";

import { Generator } from "./generator";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const item = getNavMainItem(`/gen/other/vin`);

  return {
    title: `Random ${item!.title} Generator`,
    description: `Generate random ${item!.title} for testing and development purposes.`,
  };
};

export default function Layout() {
  const item = getNavMainItem(`/gen/other/vin`);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-12 p-4">
      <article className="prose max-w-screen-lg">
        <h1>Random {item.title} Generator</h1>
        <p>
          Generate random Vehicle Identification Numbers (VIN) for testing and development purposes. VINs are unique 17-character strings used to identify
          vehicles in the automotive industry.
        </p>
      </article>
      <Generator />

      <article className="prose max-w-screen-lg">
        <h2>About VINs</h2>
        <p>
          VIN (Vehicle Identification Number) is a unique 17-character string assigned to every vehicle, consisting of numbers and letters, used to identify a
          specific automobile.
        </p>

        <h3>VIN Structure</h3>
        <p>A VIN consists of 17 characters divided into three main sections:</p>

        <div className="ml-5">
          <p>
            <strong>Positions 1-3: WMI (World Manufacturer Identifier)</strong>
            <br />
            Manufacturer identification (e.g., 1HG = Honda USA)
          </p>
          <p>
            <strong>Positions 4-9: VDS (Vehicle Descriptor Section)</strong>
            <br />
            Vehicle attributes (model, body type, engine type, etc.)
          </p>
          <p>
            <strong>Positions 10-17: VIS (Vehicle Identifier Section)</strong>
            <br />
            Vehicle serial number (production year, factory, sequence number, etc.)
          </p>
        </div>

        <h3>Random VIN Usage</h3>
        <p>Random VINs are not actual existing vehicles, but are used for:</p>

        <ul className="ml-5">
          <li>Testing and development purposes (automotive websites, vehicle databases, API testing)</li>
          <li>Demo or sample data (dummy data)</li>
          <li>Generating mock VINs to verify format correctness</li>
          <li>Software development and quality assurance</li>
        </ul>

        <h3>Example</h3>
        <p>A randomly generated VIN might look like this:</p>
        <p>
          <code className="text-base font-bold">1HGCM82633A123456</code>
        </p>
        <div className="ml-5">
          <p>
            <strong>1HG</strong> → Honda, USA
            <br />
            <strong>CM8263</strong> → Vehicle model and configuration codes
            <br />
            <strong>3A123456</strong> → Year and sequence number
          </p>
        </div>

        <h3>How to Use</h3>
        <p>
          <strong>Single VIN Generation:</strong>
        </p>
        <ol className="ml-5">
          <li>Keep the count at 1 (default)</li>
          <li>Click "Generate VIN" button</li>
          <li>Click the generated VIN button to copy it to clipboard</li>
        </ol>

        <p>
          <strong>Batch VIN Generation:</strong>
        </p>
        <ol className="ml-5">
          <li>Set the count to desired number (2-100)</li>
          <li>Click "Generate VINs" button</li>
          <li>View results in the table below</li>
          <li>Click any VIN in the table to copy it</li>
          <li>Use "Copy All" to copy all VINs as a list</li>
          <li>Use "Export CSV" to download as a CSV file</li>
        </ol>

        <p>
          <strong>Note:</strong> These are randomly generated VINs for testing purposes only and do not correspond to real vehicles.
        </p>
      </article>
    </div>
  );
}
