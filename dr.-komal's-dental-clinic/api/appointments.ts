export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      clinic: "Dr. Komal's Dental Clinic",
      location: 'Randesan, Gandhinagar',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      mobileNumber,
      service,
      preferredDate,
      preferredTime,
      notes,
      consent,
      botHoneypot,
    } = req.body || {};

    // 1. Anti-spam honeypot
    if (botHoneypot) {
      return res.status(400).json({ error: 'Invalid submission request.' });
    }

    // 2. Full name validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        error: 'Please enter your full name (minimum 2 characters).',
        field: 'fullName',
      });
    }

    // 3. Indian Mobile Number validation (10 digits starting with 6, 7, 8, or 9)
    const cleanedMobile = String(mobileNumber || '').replace(/[\s\-\(\)\+]/g, '').replace(/^(\+?91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210).',
        field: 'mobileNumber',
      });
    }

    // 4. Service validation
    const allowedServices = ['checkup', 'whitening', 'bonding', 'cosmetic', 'implants', 'crowns', 'other'];
    if (!service || !allowedServices.includes(String(service).toLowerCase())) {
      return res.status(400).json({
        error: 'Please select a valid treatment or consultation option.',
        field: 'service',
      });
    }

    // 5. Preferred date validation (no past dates)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateParts = String(preferredDate || '').split('-');
    if (dateParts.length !== 3) {
      return res.status(400).json({
        error: 'Please select a valid appointment date.',
        field: 'preferredDate',
      });
    }
    const targetDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    if (targetDate < today) {
      return res.status(400).json({
        error: 'Appointment date cannot be in the past.',
        field: 'preferredDate',
      });
    }

    // 6. Preferred time validation
    const allowedTimes = ['morning', 'afternoon', 'evening'];
    if (!preferredTime || !allowedTimes.includes(String(preferredTime).toLowerCase())) {
      return res.status(400).json({
        error: 'Please select a preferred consultation time slot.',
        field: 'preferredTime',
      });
    }

    // 7. Privacy consent
    if (consent !== true) {
      return res.status(400).json({
        error: 'Privacy consent is required to process your enquiry.',
        field: 'consent',
      });
    }

    const appointmentId = `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    return res.status(201).json({
      success: true,
      appointmentId,
      message:
        'Your appointment request has been received. The clinic team will contact you to confirm availability.',
      details: {
        fullName: fullName.trim(),
        service,
        preferredDate,
        preferredTime,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'An internal error occurred while recording your enquiry.',
    });
  }
}
