"use client";
import CsvDownloadButton from "react-json-to-csv";
import React from "react";

export default function CsvButton({ data }: any) {
  return <CsvDownloadButton data={data} />;
}
