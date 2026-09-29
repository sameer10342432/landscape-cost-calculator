import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Trash2, Printer, Download, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../data/pricingData';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export const EstimateTemplateView: React.FC = () => {
  const [contractorName, setContractorName] = useState('GreenScape Professional Services LLC');
  const [contractorPhone, setContractorPhone] = useState('(555) 234-5678');
  const [contractorEmail, setContractorEmail] = useState('bids@greenscapepro.com');
  const [clientName, setClientName] = useState('Robert & Sarah Miller');
  const [projectAddress, setProjectAddress] = useState('742 Evergreen Terrace, Springfield, IL');
  const [estimateNumber, setEstimateNumber] = useState('EST-2026-084');
  const [estimateDate, setEstimateDate] = useState('2026-09-28');
  const [validDays, setValidDays] = useState(30);

  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Excavation & sub-base grading for new paver patio (400 sq ft)', quantity: 400, unit: 'sq ft', unitPrice: 2.50 },
    { id: '2', description: 'Interlocking concrete pavers, crushed stone base, bedding sand & polymeric sand', quantity: 400, unit: 'sq ft', unitPrice: 16.50 },
    { id: '3', description: 'Segmental retaining seat wall with curved cap stones (24 lin ft x 2 ft high)', quantity: 48, unit: 'face sq ft', unitPrice: 32.00 },
    { id: '4', description: 'Premium shredded hardwood bark mulch spreading (3" depth in garden beds)', quantity: 8, unit: 'cu yd', unitPrice: 85.00 },
    { id: '5', description: 'Assorted 3-gallon perennial shrubs and ornamental flowering grasses', quantity: 18, unit: 'plant', unitPrice: 38.00 },
    { id: '6', description: 'Debris disposal & commercial jobsite cleanup', quantity: 1, unit: 'job', unitPrice: 280.00 },
  ]);

  const [taxPercent, setTaxPercent] = useState<number>(6.5);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [notes, setNotes] = useState(
    '1. 50% deposit due upon contract execution; 50% due upon project completion.\n2. Estimate valid for 30 calendar days.\n3. Utility line markings (811 Dig) will be called prior to mechanical excavation.'
  );

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: 'New service item or material',
        quantity: 1,
        unit: 'item',
        unitPrice: 100,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, val: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal - discountAmount) * (taxPercent / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + taxAmount);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    let csv = `Estimate Number,${estimateNumber}\nClient,${clientName}\nDate,${estimateDate}\n\n`;
    csv += 'Description,Quantity,Unit,Unit Price,Total\n';
    items.forEach((item) => {
      csv += `"${item.description}",${item.quantity},${item.unit},${item.unitPrice},${item.quantity * item.unitPrice}\n`;
    });
    csv += `\nSubtotal,,,,,${subtotal}\n`;
    csv += `Discount,,,,,${discountAmount}\n`;
    csv += `Tax (${taxPercent}%),,,,,${taxAmount.toFixed(2)}\n`;
    csv += `Grand Total,,,,,${grandTotal.toFixed(2)}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `landscaping-estimate-${estimateNumber}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Print Controls */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Interactive Business Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-stone-900 mt-1">
            Landscaping Estimate Template Generator
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Edit the fields below directly to customize line items, client information, and payment terms. Click Print to export a clean PDF quote or download as CSV.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={addItem}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>CSV Export</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-stone-900 hover:bg-black text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Invoice / Estimate Sheet */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md print-sheet max-w-4xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pb-8 border-b-2 border-stone-200">
          <div>
            <input
              type="text"
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              className="text-xl sm:text-2xl font-heading font-extrabold text-stone-900 focus:outline-none focus:border-b border-emerald-600 w-full"
              placeholder="Your Business / Landscaping Company Name"
            />
            <div className="mt-2 space-y-1 text-xs text-stone-600">
              <input
                type="text"
                value={contractorPhone}
                onChange={(e) => setContractorPhone(e.target.value)}
                className="focus:outline-none block w-full"
                placeholder="Phone: (555) 000-0000"
              />
              <input
                type="text"
                value={contractorEmail}
                onChange={(e) => setContractorEmail(e.target.value)}
                className="focus:outline-none block w-full"
                placeholder="Email: contact@company.com"
              />
            </div>
          </div>

          <div className="sm:text-right space-y-1 text-xs">
            <span className="text-xl sm:text-2xl font-heading font-black text-emerald-800 tracking-wider uppercase block">
              Landscaping Estimate
            </span>
            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-stone-500">Estimate #:</span>
              <input
                type="text"
                value={estimateNumber}
                onChange={(e) => setEstimateNumber(e.target.value)}
                className="font-bold text-stone-900 sm:text-right focus:outline-none w-28"
              />
            </div>
            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-stone-500">Date:</span>
              <input
                type="date"
                value={estimateDate}
                onChange={(e) => setEstimateDate(e.target.value)}
                className="font-medium text-stone-700 sm:text-right focus:outline-none"
              />
            </div>
            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-stone-500">Valid For:</span>
              <span className="font-medium text-stone-700">{validDays} Days</span>
            </div>
          </div>
        </div>

        {/* Client & Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-stone-50 border border-stone-100 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Estimate Prepared For:
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="font-bold text-sm text-stone-900 focus:outline-none w-full bg-transparent"
              placeholder="Client Name / Property Owner"
            />
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Project Location / Jobsite:
            </span>
            <input
              type="text"
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
              className="text-stone-800 focus:outline-none w-full bg-transparent"
              placeholder="Street Address, City, State ZIP"
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Scope of Work & Materials</th>
                <th className="pb-3 font-semibold text-center w-20">Qty</th>
                <th className="pb-3 font-semibold text-center w-20">Unit</th>
                <th className="pb-3 font-semibold text-right w-24">Unit Price</th>
                <th className="pb-3 font-semibold text-right w-24">Total</th>
                <th className="pb-3 w-8 no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {items.map((item) => {
                const lineTotal = item.quantity * item.unitPrice;
                return (
                  <tr key={item.id} className="group hover:bg-stone-50/50">
                    <td className="py-2.5 pr-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full font-medium text-stone-900 focus:outline-none focus:bg-stone-100 p-1 rounded"
                      />
                    </td>
                    <td className="py-2.5 text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-16 text-center font-semibold text-stone-800 focus:outline-none focus:bg-stone-100 p-1 rounded"
                      />
                    </td>
                    <td className="py-2.5 text-center">
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                        className="w-16 text-center text-stone-600 focus:outline-none focus:bg-stone-100 p-1 rounded"
                      />
                    </td>
                    <td className="py-2.5 text-right font-medium text-stone-800">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-20 text-right font-semibold text-stone-800 focus:outline-none focus:bg-stone-100 p-1 rounded"
                      />
                    </td>
                    <td className="py-2.5 text-right font-bold text-stone-900">
                      {formatCurrency(lineTotal)}
                    </td>
                    <td className="py-2.5 text-right no-print">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-300 hover:text-rose-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t-2 border-stone-200">
          <div className="sm:max-w-md text-xs space-y-2">
            <span className="font-bold text-stone-700 block">Terms & Conditions / Scope Notes:</span>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 border border-stone-200 rounded-xl text-stone-600 text-xs focus:outline-none leading-relaxed"
            />
          </div>

          <div className="sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Discount ($):</span>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                className="w-20 text-right border border-stone-200 rounded p-1"
              />
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Estimated Tax ({taxPercent}%):</span>
              <span className="font-semibold text-stone-900">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="pt-2 border-t border-stone-300 flex justify-between items-center font-bold text-base text-stone-900">
              <span>Grand Total:</span>
              <span className="text-emerald-800 text-xl font-extrabold">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 gap-8 text-xs text-stone-500">
          <div>
            <div className="border-b border-stone-300 h-8 mb-2"></div>
            <span>Authorized Contractor Signature & Date</span>
          </div>
          <div>
            <div className="border-b border-stone-300 h-8 mb-2"></div>
            <span>Client Acceptance Signature & Date</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-4 border-t border-stone-100 text-[10px] text-stone-400 text-center">
          Generated via LandscapeCostCalculator.online estimate template engine. For preliminary planning and bid management.
        </div>
      </div>
    </div>
  );
};
