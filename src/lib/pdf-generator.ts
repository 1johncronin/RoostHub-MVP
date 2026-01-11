import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateCertifiedHistory(machine: any, logs: any[]) {
  const doc = new jsPDF() as any;

  // Header
  doc.setFillColor(124, 58, 237); // Primary Purple
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bolditalic');
  doc.text('ROOSTHUB CERTIFIED HISTORY', 15, 25);
  
  doc.setFontSize(10);
  doc.text(`REPORT ID: ${machine.id.slice(0, 8).toUpperCase()}`, 15, 32);

  // Machine Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text(`${machine.year} ${machine.make} ${machine.model}`, 15, 55);
  
  doc.setFontSize(10);
  doc.text(`VIN: ${machine.vin || 'NOT VERIFIED'}`, 15, 62);
  doc.text(`Current Hours: ${machine.hours || 0}`, 15, 67);

  // Logs Table
  const tableData = logs.map(log => [
    new Date(log.performed_at).toLocaleDateString(),
    log.service_type,
    `${log.hours || 0} hrs`,
    log.notes || '-'
  ]);

  doc.autoTable({
    startY: 75,
    head: [['Date', 'Service Type', 'Hours', 'Notes']],
    body: tableData,
    headStyles: { fillStyle: [124, 58, 237] },
    alternateRowStyles: { fillStyle: [245, 243, 255] },
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('This document is a certified record of maintenance from the RoostHub Garage.', 15, 285);
  }

  doc.save(`${machine.make}-${machine.model}-history.pdf`);
}
