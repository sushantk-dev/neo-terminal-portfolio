'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/utils';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your API Gateway endpoint URL
      const apiEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_ENDPOINT || '/api/contact';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          data.message || 'Message sent successfully! I\'ll get back to you soon.'
        );
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again or contact me directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-terminal-cyan text-sm font-semibold"
          >
            <span className="text-terminal-prompt mr-1">›</span>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full bg-terminal-bg border rounded px-4 py-3 text-terminal-text placeholder-terminal-textMuted focus:outline-none transition-colors ${
              errors.name
                ? 'border-terminal-error focus:border-terminal-error'
                : 'border-terminal-border focus:border-terminal-cyan'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-terminal-error text-sm flex items-center gap-1">
              <span>✕</span>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-terminal-cyan text-sm font-semibold"
          >
            <span className="text-terminal-prompt mr-1">›</span>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full bg-terminal-bg border rounded px-4 py-3 text-terminal-text placeholder-terminal-textMuted focus:outline-none transition-colors ${
              errors.email
                ? 'border-terminal-error focus:border-terminal-error'
                : 'border-terminal-border focus:border-terminal-cyan'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-terminal-error text-sm flex items-center gap-1">
              <span>✕</span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-terminal-cyan text-sm font-semibold"
          >
            <span className="text-terminal-prompt mr-1">›</span>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full bg-terminal-bg border rounded px-4 py-3 text-terminal-text placeholder-terminal-textMuted focus:outline-none transition-colors ${
              errors.subject
                ? 'border-terminal-error focus:border-terminal-error'
                : 'border-terminal-border focus:border-terminal-cyan'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-terminal-error text-sm flex items-center gap-1">
              <span>✕</span>
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-terminal-cyan text-sm font-semibold"
          >
            <span className="text-terminal-prompt mr-1">›</span>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={6}
            className={`w-full bg-terminal-bg border rounded px-4 py-3 text-terminal-text placeholder-terminal-textMuted focus:outline-none transition-colors resize-none ${
              errors.message
                ? 'border-terminal-error focus:border-terminal-error'
                : 'border-terminal-border focus:border-terminal-cyan'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="text-terminal-error text-sm flex items-center gap-1">
              <span>✕</span>
              {errors.message}
            </p>
          )}
          <p className="text-terminal-textMuted text-xs">
            {formData.message.length} / 1000 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="terminal-button w-full py-3 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <span className="text-terminal-prompt mr-2">¯</span>
              Send Message
            </>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="terminal-card bg-terminal-green/10 border-terminal-green animate-fade-in">
            <div className="flex items-start gap-2">
              <span className="text-terminal-green text-xl">✓</span>
              <div className="flex-1">
                <p className="text-terminal-green font-semibold mb-1">Success!</p>
                <p className="text-terminal-text text-sm">{submitMessage}</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="terminal-card bg-terminal-error/10 border-terminal-error animate-fade-in">
            <div className="flex items-start gap-2">
              <span className="text-terminal-error text-xl">✕</span>
              <div className="flex-1">
                <p className="text-terminal-error font-semibold mb-1">Error</p>
                <p className="text-terminal-text text-sm">{submitMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Output Style Feedback */}
        {isSubmitting && (
          <div className="terminal-card bg-terminal-bg animate-fade-in">
            <div className="space-y-1 font-mono text-xs">
              <p className="text-terminal-textMuted">
                <span className="text-terminal-prompt">¯</span> Sending message...
              </p>
              <p className="text-terminal-cyan pl-4">
                › Validating data...
              </p>
              <p className="text-terminal-cyan pl-4">
                › Connecting to server...
              </p>
              <p className="text-terminal-textMuted pl-4">
                › Please wait<span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}