"use client";

import { useState } from "react";
import { Plus, Check, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Company } from "../types/companyTypes";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (company: Omit<Company, "id">) => void;
}

interface FormState {
  name: string;
  category: string;
  emails: string[];
}

const categories = ["Retail", "Real Estate", "Consulting", "Technology", "Healthcare", "Education", "Hospitality", "Other"];

export function CreateCompanyModal({ isOpen, onClose, onConfirm }: CreateCompanyModalProps) {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    category: "",
    emails: [""],
  });

  const resetForm = () => {
    setStep(0);
    setFormState({ name: "", category: "", emails: [""] });
    onClose();
  };

  const handleConfirm = () => {
    onConfirm({
      name: formState.name,
      role: "Administrator",
      category: formState.category,
      members: formState.emails.filter((email) => email.trim() !== "").length + 1,
    });
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetForm()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 0 ? "Create New Company" : step === 1 ? "Select Category" : "Invite Team"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-2 pb-4">
          <div className="relative">
            <div className="flex justify-around mb-3">
              {[0, 1, 2].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s + 1}
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-gray-100 absolute top-10 left-0 right-0 -translate-y-1/2 rounded-full z-0">
              <div
                className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${step * 50}%`, marginLeft: "4%", maxWidth: "92%" }}
              ></div>
            </div>
          </div>
        </div>
        {step === 0 && (
          <Step1
            name={formState.name}
            setName={(name) => setFormState((prev) => ({ ...prev, name }))}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <Step2
            category={formState.category}
            setCategory={(category) => setFormState((prev) => ({ ...prev, category }))}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step3
            emails={formState.emails}
            setEmails={(emails) => setFormState((prev) => ({ ...prev, emails }))}
            onBack={() => setStep(1)}
            onConfirm={handleConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

// Step 1: Company Name
interface Step1Props {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}

function Step1({ name, setName, onNext }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Company name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your company name"
          autoFocus
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!name.trim()} className="btn-primary">
          Continue
        </Button>
      </div>
    </div>
  );
}

// Step 2: Category Selection
interface Step2Props {
  category: string;
  setCategory: (category: string) => void;
  onBack: () => void;
  onNext: () => void;
}

function Step2({ category, setCategory, onBack, onNext }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`p-4 text-left rounded-lg border transition-all ${
              category === cat ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <span className="text-sm font-medium text-gray-900">{cat}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!category} className="btn-primary">
          Continue
        </Button>
      </div>
    </div>
  );
}

// Step 3: Invite Team
interface Step3Props {
  emails: string[];
  setEmails: (emails: string[]) => void;
  onBack: () => void;
  onConfirm: () => void;
}

function Step3({ emails, setEmails, onBack, onConfirm }: Step3Props) {
    console.log("hmida")
  const handleAddEmail = () => setEmails([...emails, ""]);
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="team.member@email.com"
              autoFocus={index === 0}
            />
          </div>
        ))}
        <button
          onClick={handleAddEmail}
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add another member
        </button>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm} className="btn-primary">
          <Check className="w-4 h-4 mr-2" />
          Create Company
        </Button>
      </div>
    </div>
  );
}