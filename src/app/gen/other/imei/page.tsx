import { notFound } from "next/navigation";

import { getNavMainItem } from "@/lib/sidebar";

import { Generator } from "./generator";

const item = getNavMainItem(`/gen/other/imei`);

export const metadata = {
  title: `Random ${item ? item.title : "IMEI Number"} Generator`,
  description: `Generate random ${item ? item.title : "IMEI Number"} for testing and development purposes.`,
};

export default function Page() {
  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-12 p-4">
      <article className="prose max-w-screen-lg">
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </article>
      <section className="max-w-screen-lg">
        <Generator />
      </section>
      <article className="prose max-w-screen-lg">
        <h2>About IMEI</h2>
        <p>
          IMEI (International Mobile Equipment Identity) is a unique 15-digit identifier assigned to mobile devices such as smartphones and tablets. It serves
          as a "digital fingerprint" for each device, similar to a serial number.
        </p>

        <h3>IMEI Structure</h3>
        <p>A standard IMEI consists of 15 digits divided into four main sections:</p>

        <div className="ml-5">
          <p>
            <strong>Positions 1-8: TAC (Type Allocation Code)</strong>
            <br />
            Identifies the device model and manufacturer (e.g., Apple iPhone, Samsung Galaxy)
          </p>
          <p>
            <strong>Positions 9-10: FAC (Final Assembly Code)</strong>
            <br />
            Indicates the manufacturing facility where the device was assembled
          </p>
          <p>
            <strong>Positions 11-14: SNR (Serial Number)</strong>
            <br />
            Unique serial number assigned by the manufacturer
          </p>
          <p>
            <strong>Position 15: CD (Check Digit)</strong>
            <br />
            Calculated using the Luhn algorithm to validate the IMEI format
          </p>
        </div>

        <h3>Random IMEI Usage</h3>
        <p>Random IMEI generators create format-compliant but fictional IMEI numbers for:</p>

        <ul className="ml-5">
          <li>Mobile app development and testing</li>
          <li>System integration testing for telecom applications</li>
          <li>Educational purposes and demonstrations</li>
          <li>API testing and mock data generation</li>
          <li>Software quality assurance and validation</li>
        </ul>

        <h3>Example</h3>
        <p>A randomly generated IMEI might look like this:</p>
        <p>
          <code className="text-base font-bold">356938035643809</code>
        </p>
        <div className="ml-5">
          <p>
            <strong>35693803</strong> → Device Type (TAC)
            <br />
            <strong>56</strong> → Assembly Code (FAC)
            <br />
            <strong>4380</strong> → Serial Number (SNR)
            <br />
            <strong>9</strong> → Check Digit (CD)
          </p>
        </div>

        <h3>How to Use</h3>
        <p>
          <strong>Single IMEI Generation:</strong>
        </p>
        <ol className="ml-5">
          <li>Keep the count at 1 (default)</li>
          <li>Click "Generate" button</li>
          <li>Click the generated IMEI button to copy it to clipboard</li>
          <li>View the breakdown of TAC, FAC, SNR, and Check Digit below</li>
        </ol>

        <p>
          <strong>Batch IMEI Generation:</strong>
        </p>
        <ol className="ml-5">
          <li>Set the count to desired number (2-100)</li>
          <li>Click "Generate" button</li>
          <li>View results in the table with detailed breakdown</li>
          <li>Click any IMEI in the table to copy it</li>
          <li>Use "Copy All" to copy all IMEIs as a list</li>
          <li>Use "Export CSV" or "Export JSON" to download the data</li>
        </ol>

        <h3>Important Notes</h3>
        <p className="text-amber-600">
          <strong>⚠️ Legal Notice:</strong> These randomly generated IMEIs are for testing and development purposes only. They do not correspond to real devices
          and should never be used to impersonate or falsify actual device information. Misuse of IMEI numbers may violate local laws and regulations.
        </p>

        <div className="my-6 border-l-4 border-blue-400 bg-blue-50 p-4">
          <p className="text-blue-800">
            <strong>✅ Legitimate Uses:</strong> Software testing, app development, educational purposes, system demonstrations, API testing with mock data.
          </p>
        </div>

        <div className="my-6 border-l-4 border-red-400 bg-red-50 p-4">
          <p className="text-red-800">
            <strong>❌ Prohibited Uses:</strong> Device cloning, fraud, bypassing security systems, impersonating real devices, or any illegal activities.
          </p>
        </div>
      </article>
    </div>
  );
}
