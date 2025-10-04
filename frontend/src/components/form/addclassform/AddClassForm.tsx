"use client";
import React, { useState,useRef } from 'react';
import Alert from "@/components/ui/alert/Alert";
import Label from '../Label';
import Input from '../input/InputField';
import { authHeader } from '@/helpers/auth.helper';
import Button from "../../ui/button/Button";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ReactQuill from '@/components/ReactQuillEditor/ReactQuillEditor';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import SelectInputs from '@/components/form/form-elements/SelectInputs';
import { useProfile } from '@/context/ProfileContext';

type FormData = {
  class_name: string;
  noofstudents: string;
  class_description: string;
};

const initialFormData: FormData = {
  class_name: '',
  noofstudents: '',
  class_description: '',
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function AddClassForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const dropzoneRef = useRef<any>(null);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { profile, loading: profileLoading } = useProfile();

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!data.class_name) errors.class_name = "Class name is required.";
    if (!data.noofstudents) errors.noofstudents = "Number of students is required.";
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, class_description: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectedFiles.length > 0) {
      setServerError("please remove the rejetced files");
      return;
    }

    const errors = validateForm(formData);
    setClientErrors(errors);
    setTouched({ class_name: true, noofstudents: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

    const userId = profile?.user?.id;
    if (!userId) {
    setServerError("User not authenticated. Please log in.");
    return;
  }

    setIsSaving(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

      formDataToSend.append('updated_by', userId);

    if (files.length > 0) {
      files.forEach((file) => {
        formDataToSend.append('files', file); 
      });
    }
    

    const api = process.env.NEXT_PUBLIC_API;
    const API_URL = `${api}/classmanagement/add`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const serverErrorMessage = errorResponse.message || `Server error: ${response.status}`;
        setServerError(serverErrorMessage);
        return;
      }

      const result = await response.json();
      console.log('class successfully added:', result);
      toast.success('class  added successfully!', {
        position: "top-right",
        autoClose: 2000,
      });


      setFormData(initialFormData);
      setFiles([]);
      setClientErrors({});
      setTouched({});
      setServerError(null);
       setResetKey(prev => prev + 1);
      if (dropzoneRef.current) {
        dropzoneRef.current.clearFiles();
      }
      router.push('/classmanagement');
    } catch (error) {
      console.error('Submission failed:', error);
      setServerError("An unexpected error occurred.");
    }finally {
    
    setIsSaving(false);
  }
  };

  const clientErrorMessages = Object.values(clientErrors).filter(Boolean);
  const fileErrorMessages = rejectedFiles.flatMap(rejection => 
    rejection.errors.map((error: any) => `${rejection.file.name}: ${error.message}`)
  );
  const allErrorMessages = [...clientErrorMessages];
  if (serverError) {
    allErrorMessages.unshift(serverError);
  }
  const hasErrors = allErrorMessages.length > 0;
  const errorMessageString = allErrorMessages.join('\n');
  const handleCancel = () => {
    setFormData(initialFormData);
    setClientErrors({});
    setTouched({});
    setServerError(null);
    setRejectedFiles([]);
    setResetKey(prev => prev + 1);
    if (dropzoneRef.current) {
      dropzoneRef.current.clearFiles();
    }
    router.push('/classmanagement');
    
  };

  return (
    <div className="space-y-6" key={resetKey}>
      <form onSubmit={handleSubmit}>
        <div className="">
         
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* First Name */}
            <div className="sm:col-span-3">
              <Label>
                Class name <span className="text-error-500">*</span>
              </Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="class_name"
                  name="class_name"
                  error={!!(touched.class_name && clientErrors.class_name)}
                  hint={touched.class_name && clientErrors.class_name ? clientErrors.class_name : ""}
                  value={formData.class_name}
                  onChange={handleInputChange}
                  onBlur={() => setTouched({ ...touched, class_name: false })}
                  placeholder="Enter your Class name"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="sm:col-span-3">
              <Label>
                No of students <span className="text-error-500">*</span>
              </Label>
              <div className="mt-2">
                
                <Input
                  type="number"
                  id="noofstudents"
                  name="noofstudents"
                  error={!!(touched.noofstudents && clientErrors.noofstudents)}
                  hint={touched.noofstudents && clientErrors.noofstudents ? clientErrors.noofstudents : ""}
                  value={formData.noofstudents}
                  onChange={handleInputChange}
                  onBlur={() => setTouched({ ...touched, noofstudents: false })}
                  placeholder="Enter your No of Students"
                  required
                />
              </div>
             
            </div>
            
            {/* Class Description Text Editor */}
            <div className="sm:col-span-6">
              <Label>
                Class description
              </Label>
              <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={formData.class_description}
                  onChange={handleDescriptionChange}
                  onBlur={() => setTouched({ ...touched, class_description: true })}
                  placeholder="Enter the class description"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <Label>
                Upload Students images
              </Label>
              <div className="mt-2">
              <DropzoneComponent  
                 setFiles={setFiles} 
                 ref={dropzoneRef}
               />
              </div>
            </div>
            


            {/* Server error message */}
            {hasErrors && (
              <div className="sm:col-span-6">
                <Alert
                  variant='error'
                  title='Error Message'
                  message={errorMessageString}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
             disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
