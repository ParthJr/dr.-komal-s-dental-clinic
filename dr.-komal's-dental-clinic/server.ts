import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

interface AppointmentSubmission {
  id: string;
  fullName: string;
  mobileNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  consent: boolean;
  submittedAt: string;
  ip?: string;
}

// In-memory appointments list for persistent enquiry logging during runtime
const appointmentStore: AppointmentSubmission[] = [];

// Helper: Validate Indian Mobile Number (10 digits, starts with 6, 7, 8, or 9)
function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Might have leading 91 or 0
  const digits = cleaned.replace(/^(\+?91|0)/, '');
  return /^[6-9]\d{9}$/.test(digits);
}

// Helper: Ensure date is not in the past (comparison based on YYYY-MM-DD local time)
function isFutureOrToday(dateStr: string): boolean {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return false;
  const target = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return target >= today;
}

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    clinic: "Dr. Komal's Dental Clinic",
    location: 'Randesan, Gandhinagar',
    time: new Date().toISOString(),
  });
});

// Appointment Booking Endpoint
app.post('/api/appointments', (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      service,
      preferredDate,
      preferredTime,
      notes,
      consent,
      botHoneypot, // Anti-spam honeypot field
    } = req.body;

    // 1. Anti-spam honeypot
    if (botHoneypot) {
      // Silently reject bot submissions
      return res.status(400).json({ error: 'Invalid submission request.' });
    }

    // 2. Required fields validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        error: 'Please enter your full name (minimum 2 characters).',
        field: 'fullName',
      });
    }

    if (!mobileNumber || typeof mobileNumber !== 'string') {
      return res.status(400).json({
        error: 'Please provide a valid contact mobile number.',
        field: 'mobileNumber',
      });
    }

    // 3. Indian Mobile Number validation
    if (!isValidIndianMobile(mobileNumber)) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210).',
        field: 'mobileNumber',
      });
    }

    // 4. Service validation
    const allowedServices = [
      'checkup',
      'whitening',
      'bonding',
      'cosmetic',
      'implants',
      'crowns',
      'other',
    ];
    if (!service || !allowedServices.includes(service.toLowerCase())) {
      return res.status(400).json({
        error: 'Please select a valid treatment or consultation option.',
        field: 'service',
      });
    }

    // 5. Date validation (no past dates)
    if (!preferredDate || !isFutureOrToday(preferredDate)) {
      return res.status(400).json({
        error: 'Please select a valid upcoming appointment date (today or future).',
        field: 'preferredDate',
      });
    }

    // 6. Time validation
    const allowedTimes = ['morning', 'afternoon', 'evening'];
    if (!preferredTime || !allowedTimes.includes(preferredTime.toLowerCase())) {
      return res.status(400).json({
        error: 'Please select a preferred consultation time slot.',
        field: 'preferredTime',
      });
    }

    // 7. Privacy consent
    if (consent !== true) {
      return res.status(400).json({
        error: 'Privacy consent is required to contact you regarding the enquiry.',
        field: 'consent',
      });
    }

    // 8. Prevent duplicate submissions within 5 minutes for the same phone & date
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const isDuplicate = appointmentStore.some(
      (item) =>
        item.mobileNumber.replace(/\D/g, '') === mobileNumber.replace(/\D/g, '') &&
        item.preferredDate === preferredDate &&
        new Date(item.submittedAt).getTime() > fiveMinutesAgo
    );

    if (isDuplicate) {
      return res.status(429).json({
        error:
          'A recent enquiry has already been submitted for this number and date. Our clinic team will reach out to you shortly.',
      });
    }

    // Generate enquiry record
    const newEnquiry: AppointmentSubmission = {
      id: `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      service,
      preferredDate,
      preferredTime,
      notes: notes ? String(notes).trim().slice(0, 500) : undefined,
      consent: true,
      submittedAt: new Date().toISOString(),
      ip: req.ip,
    };

    appointmentStore.push(newEnquiry);

    // Return the exact required patient notification
    return res.status(201).json({
      success: true,
      appointmentId: newEnquiry.id,
      message:
        'Your appointment request has been received. The clinic team will contact you to confirm availability.',
      details: {
        fullName: newEnquiry.fullName,
        service: newEnquiry.service,
        preferredDate: newEnquiry.preferredDate,
        preferredTime: newEnquiry.preferredTime,
      },
    });
  } catch (error: any) {
    console.error('Error processing appointment submission:', error);
    return res.status(500).json({
      error: 'An unexpected server error occurred while recording your enquiry. Please try again.',
    });
  }
});

// Production vs Development static and Vite middleware handling
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // In production, serve the built Vite output from /dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev, attach Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} (mode: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
