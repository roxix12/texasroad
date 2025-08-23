'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { Input, Button } from '@/components/ui'
import { isValidEmail } from '@/lib/format'
import { Mail, ExternalLink } from 'lucide-react'

// Note: Since this is a client component, we can't export metadata directly
// The metadata would need to be set in a parent server component or layout

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission (since this is just a demo)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <PageHero
          title="Thank You!"
          subtitle="We've received your message and will get back to you soon"
        />
        
        <div className="py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green/10 border border-green/20 rounded-lg p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="font-slab font-slab-bold text-2xl text-stone mb-4">
                Message Sent Successfully!
              </h2>
              
              <p className="text-stone/70 mb-6">
                Thank you for reaching out to us. We typically respond within 24-48 hours. 
                If your inquiry is urgent, please consider visiting the official Texas Roadhouse website.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)} variant="primary">
                  Send Another Message
                </Button>
                <a
                  href="https://www.texasroadhouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex items-center">
                    Official Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions, suggestions, or feedback? We'd love to hear from you!"
      />
      
      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-slab font-slab-bold text-2xl text-stone mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="bg-orange/10 border border-orange/20 rounded-lg p-6">
                  <h3 className="font-slab font-slab-bold text-lg text-stone mb-3">
                    Important Notice
                  </h3>
                  <p className="text-stone/70 text-sm">
                    Please note that we are not affiliated with Texas Roadhouse. 
                    For official restaurant inquiries, locations, reservations, or complaints, 
                    please contact Texas Roadhouse directly through their official website.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-slab font-slab-bold text-lg text-stone mb-3">
                    What we can help with:
                  </h3>
                  <ul className="space-y-2 text-stone/70">
                    <li>• Website feedback and suggestions</li>
                    <li>• Menu information updates</li>
                    <li>• Technical issues with our site</li>
                    <li>• General questions about our content</li>
                    <li>• Partnership inquiries</li>
                  </ul>
                </div>
                
                <div className="bg-sand/30 rounded-lg p-6">
                  <h3 className="font-slab font-slab-bold text-lg text-stone mb-3">
                    For Official Texas Roadhouse Information
                  </h3>
                  <p className="text-stone/70 mb-4">
                    Please visit the official Texas Roadhouse website for:
                  </p>
                  <ul className="space-y-1 text-stone/70 text-sm mb-4">
                    <li>• Restaurant locations and hours</li>
                    <li>• Online ordering and reservations</li>
                    <li>• Current promotions and deals</li>
                    <li>• Customer service and complaints</li>
                    <li>• Gift cards and loyalty programs</li>
                  </ul>
                  <a
                    href="https://www.texasroadhouse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange hover:text-orange/80 transition-colors duration-200"
                  >
                    Visit texasroadhouse.com
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                  />
                </div>
                
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                  required
                />
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone/20 rounded-lg bg-white/50 text-stone placeholder-stone/60 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all duration-200 resize-vertical"
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
