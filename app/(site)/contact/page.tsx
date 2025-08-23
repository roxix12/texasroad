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
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    if (submitError) {
      setSubmitError(null)
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
    setSubmitError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        console.log('✅ Contact form submitted successfully')
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('❌ Error submitting contact form:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again later.'
      )
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

            {/* Beautiful Contact Form - Premium Style */}
            <div className="relative bg-gradient-to-br from-white via-sand/5 to-orange/5 rounded-xl shadow-2xl border border-orange/20 overflow-hidden backdrop-blur-sm">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Form Header - Luxury Western Style */}
              <div className="relative bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 px-8 py-6 shadow-lg overflow-hidden">
                {/* Header Pattern - Simple Dots */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 rounded-full"></div>
                  <div className="absolute top-4 left-8 w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="absolute top-8 left-4 w-1 h-1 bg-white/25 rounded-full"></div>
                  <div className="absolute top-2 right-8 w-1 h-1 bg-white/30 rounded-full"></div>
                  <div className="absolute top-6 right-4 w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-6 w-1 h-1 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-4 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="relative flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                    <Mail className="w-7 h-7 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="font-slab font-slab-bold text-2xl text-white drop-shadow-sm">Howdy, Partner!</h3>
                    <p className="text-white/90 text-base font-medium">Saddle up and send us a message</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="relative p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="group">
                      <label className="block text-sm font-slab font-slab-bold text-stone-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-200">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 border-2 border-stone/20 rounded-xl bg-gradient-to-r from-white to-sand/10 text-stone-900 placeholder-stone/50 focus:ring-4 focus:ring-orange/20 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                          placeholder="What's your name, partner?"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange/5 to-amber/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
                          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">!</span>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-slab font-slab-bold text-stone-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-200">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 border-2 border-stone/20 rounded-xl bg-gradient-to-r from-white to-sand/10 text-stone-900 placeholder-stone/50 focus:ring-4 focus:ring-orange/20 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                          placeholder="your.email@example.com"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange/5 to-amber/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
                          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">!</span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-slab font-slab-bold text-stone-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-200">
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-stone/20 rounded-xl bg-gradient-to-r from-white to-sand/10 text-stone-900 placeholder-stone/50 focus:ring-4 focus:ring-orange/20 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                        placeholder="What's this all about?"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange/5 to-amber/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">!</span>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-slab font-slab-bold text-stone-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-200">
                      Your Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-stone/20 rounded-xl bg-gradient-to-r from-white to-sand/10 text-stone-900 placeholder-stone/50 focus:ring-4 focus:ring-orange/20 focus:border-orange-500 outline-none transition-all duration-300 resize-vertical shadow-sm hover:shadow-md font-medium"
                        placeholder="Tell us what's on your mind, partner... We're all ears!"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange/5 to-amber/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">!</span>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Display submission error */}
                  {submitError && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <p className="text-red-700 font-medium" role="alert">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:via-amber-700 hover:to-orange-800 text-white font-slab font-slab-bold text-lg py-5 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Rustling Up Your Message...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Form Footer */}
                  <div className="text-center pt-6 border-t border-stone/20">
                    <div className="flex items-center justify-center space-x-2 text-stone/60">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-sm font-medium">
                        Your information is secure and will never be shared
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
