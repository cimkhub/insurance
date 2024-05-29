import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { UploadIcon, PlayIcon } from './Icons';

const Header = ({ handleFileUpload, handleRunAnalysis }) => (
  <div className="flex items-center gap-4">
    <h1 className="font-semibold text-2xl">Insurance Data Analysis</h1>
    <div className="ml-auto flex gap-2">
      <Button size="sm" variant="outline" onClick={() => document.getElementById('file-upload').click()}>
        <UploadIcon className="h-4 w-4 mr-2" />
        Upload Data
      </Button>
      <FormControl accept=".csv, .xlsx" className="hidden" id="file-upload" type="file" onChange={handleFileUpload} />
      <Button size="sm" onClick={handleRunAnalysis}>
        <PlayIcon className="h-4 w-4 mr-2" />
        Run Analysis
      </Button>
    </div>
  </div>
);

export default Header;
