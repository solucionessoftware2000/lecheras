import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, Loader2 } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { useNavigate } from 'react-router-dom';
export function AdminPage() {
  const navigate = useNavigate();
  const {
    addListing
  } = useListings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    description: '',
    location: '',
    milkProduction: ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    addListing({
      name: formData.name,
      breed: formData.breed,
      age: Number(formData.age),
      price: Number(formData.price),
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop'],
      description: formData.description,
      seller: {
        name: 'Current User',
        location: formData.location
      },
      milkProduction: formData.milkProduction
    });
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <div className="min-h-screen bg-[#171717] pb-20 pt-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">List a New Cow</h1>
          <p className="mt-2 text-neutral-400">
            Fill in the details below to add a new listing to the marketplace.
          </p>
        </div>

        <motion.form initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} onSubmit={handleSubmit} className="space-y-8 rounded-2xl bg-[#1F1F1F] p-8 shadow-xl border border-white/5">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/5 pb-2">
              Basic Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Name
                </label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="e.g. Bella" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Breed
                </label>
                <select required name="breed" value={formData.breed} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all">
                  <option value="">Select Breed</option>
                  <option value="Holstein">Holstein</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Brown Swiss">Brown Swiss</option>
                  <option value="Ayrshire">Ayrshire</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Age (years)
                </label>
                <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Price ($)
                </label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="2500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Milk (L/day)
                </label>
                <input name="milkProduction" value={formData.milkProduction} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="35" />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/5 pb-2">
              Details
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Description
              </label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="Describe the cow's temperament, health history, and production stats..." />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Location
              </label>
              <input required name="location" value={formData.location} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" placeholder="City, State" />
            </div>
          </div>

          {/* Image Upload Placeholder */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/5 pb-2">
              Photos
            </h2>
            <div className="flex justify-center rounded-xl border-2 border-dashed border-white/10 bg-[#171717] px-6 py-10 transition-colors hover:border-white/20">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-neutral-500" />
                <div className="mt-4 flex text-sm leading-6 text-neutral-400">
                  <label className="relative cursor-pointer rounded-md font-semibold text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-red-400">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-neutral-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" disabled={isSubmitting || showSuccess} className={`flex w-full items-center justify-center rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all ${showSuccess ? 'bg-green-600' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20'}`}>
              {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : showSuccess ? <motion.div initial={{
              scale: 0.5,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} className="flex items-center gap-2">
                  <Check className="h-6 w-6" />
                  <span>Listing Created!</span>
                </motion.div> : 'Create Listing'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>;
}