"use client";
import React, { useState,useCallback,useRef,useEffect } from 'react';
import ReactCrop, { Crop,centerCrop, PixelCrop,makeAspectCrop, centerAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Alert from "@/components/ui/alert/Alert";
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon } from '../../../icons';
import {authHeader } from '@/helpers/auth.helper';
import { countryOptions } from "@/utils/country-codes";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import FileInput from "../../form/input/FileInput";
import { useRouter } from 'next/navigation';
import Radio from "../input/Radio";
import { toast } from 'react-toastify';

function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'low';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // Draw the image
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();
}


type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string; 
  phone: string;
  country: string; 
  city_state: string;
  postal_code: string;
  tax_id: string;
  bio: string;
  facebook_profile: string;
  x_com_profile: string;
  linkedin_profile: string;
  instagram_profile: string;
  role: 'user' | 'admin';
  avatar: File | null;
};

 const initialFormData:FormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '', 
  phone: '',
  country: '', 
  city_state: '',
  postal_code: '',
  tax_id: '',
  bio: '',
  facebook_profile: '',
  x_com_profile: '',
  linkedin_profile: '',
  instagram_profile: '',
  role: 'user',
  avatar: null as File | null,
};

type FormErrors = Partial<Record<keyof FormData, string>>;


export default function AddUserForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = React.useState(initialFormData);
  // Crop-related states
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const cropTimeoutRef = useRef<NodeJS.Timeout>(); 
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.first_name.trim()) {
    errors.first_name = 'Please enter your first name.';
  }
  if (!data.last_name.trim()) {
    errors.last_name = 'Please enter your last name.';
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  const password = data.password.trim();
  if (password.length === 0) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }
  // Add more validation rules here for other fields if needed

  return errors;
};



  function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
        aspect: 2/3,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };
  const handleRadioChange = (value: 'user' | 'admin') => {
  setFormData(prev => ({ ...prev, role: value }));
};

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxFileSize = 4 * 1024 * 1024;

    setFileError(null);

    if (file) {
      if (!file.type.startsWith("image/")) {
        setFileError("Only image files are allowed.");
        e.target.value = "";
        setPreview(null);
        return;
      }

      if (file.size > maxFileSize) {
        setFileError("File size must be less than 4MB.");
        e.target.value = "";
        setPreview(null);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }, []);

  // Debounced crop update to prevent performance issues
  const onCropChange = useCallback((crop: Crop) => {
    setCrop(crop);
    
    // Clear any existing timeout
    if (cropTimeoutRef.current) {
      clearTimeout(cropTimeoutRef.current);
    }
    
    // Only update completed crop after a delay (debounce)
    cropTimeoutRef.current = setTimeout(() => {
      if (imgRef.current && previewCanvasRef.current && crop && crop.width > 0 && crop.height > 0) {
        const pixelCrop = crop as PixelCrop;
        setCompletedCrop(pixelCrop);
      }
    }, 100);
  }, []);

  const handleCropComplete = useCallback(async () => {
    if (imgRef.current && previewCanvasRef.current && completedCrop) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      
      previewCanvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
          setFormData(prev => ({
            ...prev,
            avatar: file,
          }));
          setPreview(URL.createObjectURL(blob));
          setCropModalOpen(false);
          setImgSrc('');
        }
      }, 'image/jpeg', 0.9);
    }
  }, [completedCrop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
          // Validate all fields before attempting submission
        const errors = validateForm(formData);
        setClientErrors(errors);

        // Mark all fields as touched to display validation errors
        setTouched({
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          // Add other fields here...
        });
        if (Object.keys(errors).length > 0) {
          
          return;
        }
        
    const formDataWithFile = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formDataWithFile.append(key, value);
      } else if (value !== null) {
        formDataWithFile.append(key, value.toString());
      }
    });
    const api= process.env.NEXT_PUBLIC_API
    const API_URL = `${api}/user/adduser`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: authHeader(),
        body: formDataWithFile,
      });

      if (!response.ok) {
        const errorResponse = await response.json(); 
      const serverErrorMessage = errorResponse.message || `Server error: ${response.status}`;
      setServerError(serverErrorMessage); // Set the server error message
      return; 
      }

      const result = await response.json();
      console.log('User successfully added:', result);
      
       toast.success('User added successfully!', {
      position: "top-right",
      autoClose: 2000, // Closes after 5 seconds
    });
      // Reset form
      setFormData(initialFormData);
      setPreview(null);
      setClientErrors({});
      setTouched({});
        setServerError(null);
        router.push('/admin/allusers');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
const clientErrorMessages = Object.values(clientErrors).filter(Boolean);
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
  setPreview(null);
  setCropModalOpen(false);
  setImgSrc('');
};

  return (
      <div className="space-y-6">
        

      <form onSubmit={handleSubmit}>

    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="border-b border-gray-200 pb-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">Personal Information</h2>
     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* First Name */}
        <div className="sm:col-span-3">
          <Label>
            First name <span className="text-error-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="first_name"
              name="first_name"
              error={!!(touched.first_name && clientErrors.first_name)}
               hint={touched.first_name && clientErrors.first_name ? clientErrors.first_name : ""}
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              required
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="sm:col-span-3">
          <Label>
            Last name <span className="text-error-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="last_name"
              name="last_name"
              error={!!(touched.last_name && clientErrors.last_name)}
              value={formData.last_name}
              hint={touched.last_name && clientErrors.last_name ? clientErrors.last_name : ""}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="sm:col-span-3">
          <Label>
            Email address <span className="text-error-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="email"
              name="email"
              error={!!(touched.email && clientErrors.email)}
              hint={touched.email && clientErrors.email ? clientErrors.email : ""}
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="sm:col-span-3">
          <Label>
            Password <span className="text-error-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              type="password"
              id="password"
              name="password"
              error={!!(touched.password && clientErrors.password)}
              hint={touched.password && clientErrors.password ? clientErrors.password : ""}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a password"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="sm:col-span-3">
          <Label>
            Phone number
          </Label>
          <div className="mt-2">
            <Input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Bio - Spans full width */}
        <div className="sm:col-span-3">
          <Label>
            Bio
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="bio"
              name="bio"
              autoComplete="tel"
              
              placeholder="Enter your  bio"
            />
          </div>
        </div>

        {/* Country */}
        <div className="sm:col-span-3">
          <Label>Country</Label>
          <div className="mt-2 relative">
            <Select
              id="country"
              name="country"
              options={countryOptions}
              value={formData.country}
              onChange={handleSelectChange}
              placeholder="Select a country"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>

        {/* City / State */}
        <div className="sm:col-span-3">
          <Label>
            City / State
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="city_state"
              name="city_state"
              autoComplete="address-level2"
              value={formData.city_state}
              onChange={handleInputChange}
              placeholder="Enter your city or state"
            />
          </div>
        </div>

        {/* Postal Code */}
        <div className="sm:col-span-3">
          <Label>
            ZIP / Postal code
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="postal_code"
              name="postal_code"
              autoComplete="postal-code"
              value={formData.postal_code}
              onChange={handleInputChange}
              placeholder="Enter your postal code"
            />
          </div>
        </div>

        {/* Tax ID */}
        <div className="sm:col-span-3">
          <Label>
            Tax ID
          </Label>
          <div className="mt-2">
            <Input
              type="text"
              id="tax_id"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleInputChange}
              placeholder="Enter your tax ID"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
        <div className="border-b border-gray-900/10 pb-12 mt-8">
          <h2 className="border-b border-gray-200 pb-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">Social Links</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Facebook */}
            <div className="sm:col-span-3">
              <Label>Facebook</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="e.g., https://facebook.com/your-profile"
                />
              </div>
            </div>
            {/* X.com */}
            <div className="sm:col-span-3">
              <Label>X.com (formerly Twitter)</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="x"
                  name="x"
                  value={formData.x}
                  onChange={handleInputChange}
                  placeholder="e.g., https://x.com/your-handle"
                />
              </div>
            </div>
            {/* LinkedIn */}
            <div className="sm:col-span-3">
              <Label>LinkedIn</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="e.g., https://linkedin.com/in/your-profile"
                />
              </div>
            </div>
            {/* Instagram */}
            <div className="sm:col-span-3">
              <Label>Instagram</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="e.g., https://instagram.com/your-username"
                />
              </div>
            </div>
          </div>
        </div>


        {/* avtar upload */}
         <div className="border-b border-gray-900/10 pb-12 mt-8">
          <h2 className="border-b border-gray-200 pb-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">Upload avtar</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <Label>Profile Picture</Label>
                <div className="mt-2 flex items-center gap-4">
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Avatar preview"
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData(prev => ({ ...prev, avatar: null }));
                        }}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={onSelectFile}
                      className="hidden"
                    />
                    <FileInput name="avatar" onChange={onSelectFile} />
                    
                    {fileError && (
                      <p className="mt-1 text-sm text-error-500">{fileError}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <Label>User Role</Label>
                    <Radio
                      id="user-role"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleRadioChange}
                      label="User"
                    />
                    <Radio
                      id="admin-role"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleRadioChange}
                      label="Admin"
                    />
                  </div>
              </div>
          </div>
        </div>
        {/* Server error message */}
        {hasErrors && (
              
              <Alert 
                variant='error'
                title='Error Message'
                message={errorMessageString}
               />
            )}
      
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
                >
                  Save
                </Button>
          </div>
</form>
{/* Crop Modal */}
      <Modal isOpen={cropModalOpen} onClose={() => setCropModalOpen(false)} className="max-w-[600px] m-4">
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Crop Your Image
          </h4>
          
          {imgSrc && (
            <div className="flex flex-col items-center">
              <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
                className="max-h-[400px]"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  style={{ maxHeight: '70vh' }}
                />
              </ReactCrop>
              
              <div className="mt-4">
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    display: 'none',
                    width: completedCrop?.width,
                    height: completedCrop?.height,
                  }}
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCropModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleCropComplete}
                  disabled={!completedCrop}
                >
                  Apply Crop
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      </div>
  );
}
