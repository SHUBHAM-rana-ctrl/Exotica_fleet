import React, { useState } from 'react';
import { X, Copy, Check, Database, Server } from 'lucide-react';
import { ExoticaDatabase } from '../services/storage';

interface SchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaModal: React.FC<SchemaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const sql = ExoticaDatabase.getMySQLSchemaScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-luxury text-base font-bold text-white">
                EXOTICA Relational Database Architecture (MySQL DDL)
              </h3>
              <p className="text-[11px] text-neutral-400">
                10 Normalized Relational Tables with Foreign Key Constraints & Indexes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-md transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SQL' : 'Copy DDL Script'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SQL Code View */}
        <div className="overflow-y-auto flex-1 p-6 bg-[#090A0E]">
          <pre className="font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap selection:bg-[#D4AF37]/30">
            {sql}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#08090C] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Target Engine: InnoDB · UTF8MB4 Unicode Support</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-neutral-300 hover:text-white bg-white/5 rounded border border-white/10 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
